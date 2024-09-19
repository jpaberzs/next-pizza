import prisma from '@/prisma/prisma-client';
import { findOrCreateCart } from '@/shared/lib';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { CreateCartItemValues } from '@/shared/store/cart';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ totalAmount: 0, items: [] });

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.error('[CART_GET] Server error', error);
    return NextResponse.json({ message: '[CART_GET] Error to fetch the cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: { every: { id: { in: data.ingredients } } },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const respone = NextResponse.json(updatedUserCart);

    respone.cookies.set('cartToken', token, {
      maxAge: 60 * 60 * 24 * 7,
    });

    return respone;
  } catch (error) {
    console.error('[CART_POST] Server error', error);
    return NextResponse.json({ message: '[CART_POST] Error to create cart' }, { status: 500 });
  }
}
