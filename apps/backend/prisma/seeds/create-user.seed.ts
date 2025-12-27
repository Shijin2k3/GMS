import { Gender, PrismaClient, UserStatus } from '@prisma/client';
import { hashPassword, verifyPassword } from '../../src/helper/utils/auth-helper.utils';

export const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'admin@123',
    gender: Gender.MALE,
    status: UserStatus.ACTIVE,
  },
];

export const seedUser = async (prisma: PrismaClient) => {
  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await hashPassword(user.password);
      const createdUser = await prisma.users.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          password: hashedPassword,
        },
      });
      return createdUser;
    }),
  );
};
