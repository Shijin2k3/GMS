import { PrismaClient } from '@prisma/client';
import { seedUser } from './seeds';
const prisma = new PrismaClient();

async function main() {
  await seedUser(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
