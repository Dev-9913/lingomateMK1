import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized-no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized-invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        friends: true,
        friendOf: true,
      },
    });

    if (user) {
      delete user.password; // still hide the password before sending the response
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized-user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
