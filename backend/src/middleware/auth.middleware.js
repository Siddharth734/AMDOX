import { verifyAccessToken } from "../utils/jwt.js";
import { UnauthorisedError } from "../utils/errors.js";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorisedError("No token provided");
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new UnauthorisedError("Invalid or expired token"));
  }
};

export default authMiddleware;