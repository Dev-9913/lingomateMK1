import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("PostgreSQL Connected via Prisma");
  } catch (error) {
    console.log("Error in connecting to PostgreSQL", error);
    process.exit(1);
  }
};

export default prisma;
