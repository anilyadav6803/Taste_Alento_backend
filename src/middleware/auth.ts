import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user";
// Add more logging here to see if the algorithm or other details might be wrong
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256", // Ensure this matches the token's signing algorithm
});


// Extend the Express Request interface to include auth0Id and userId
declare global {
  namespace Express {
    interface Request {
      auth0Id?: string;
      userId?: string;
    }
  }
}

export const jwtParse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.error("Authorization header missing or malformed:", req.headers);
    res.status(401).json({ message: "Authorization token missing or malformed" });
    return;
  }

  const token = authorization.split(" ")[1];
  console.log("Extracted Token:", token); // Debug: Log token

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload | null;
    console.log("Decoded Token:", decoded); // Debug: Log decoded payload

    if (!decoded || !decoded.sub) {
      console.error("Invalid token payload:", decoded);
      res.status(401).json({ message: "Invalid token payload" });
      return;
    }

    // Attach auth0Id and userId to req for further use
    req.auth0Id = decoded.sub;
    req.userId = decoded.sub; // Replace if you map `sub` to a userId in DB
    next();
  } catch (error) {
    console.error("JWT Parsing Error:", error);
    res.status(401).json({ message: "Token decoding failed" });
  }
};