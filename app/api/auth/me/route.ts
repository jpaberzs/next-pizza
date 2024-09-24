import prisma from '@/prisma/prisma-client';
import { authOptions } from '@/shared/constants/auth-options';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextApiRequest | (IncomingMessage & { cookies: NextApiRequestCookies }) | AuthOptions,
  res: ServerResponse<IncomingMessage> | NextApiResponse | AuthOptions,
) {
  try {
    const user = await getServerSession(req as NextApiRequest, res as NextApiResponse, authOptions);

    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 });
  }
}
