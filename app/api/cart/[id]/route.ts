import prisma from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ message: 'Cart token not found' });

    const cartItem = prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) return NextResponse.json({ message: 'Cart item not found' });

    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: body.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: '[CART_PATCH] Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ message: 'Cart token not found' });

    const cartItem = prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });

    if (!cartItem) return NextResponse.json({ message: 'Cart item not found' });

    await prisma.cartItem.delete({
      where: {
        id: Number(id),
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.error('[CART_DELETE] Server error', error);
    return NextResponse.json({ message: '[CART_DELETE] Server error' }, { status: 500 });
  }
}
