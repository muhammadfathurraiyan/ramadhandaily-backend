import jwt from "jsonwebtoken";

export function jwtVerify(req, res, next) {
  const secretToken = process.env.SECRET_TOKEN;
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Bad request!" });
  }

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res
        .sendStatus(500)
        .json({ success: false, message: "Server error!" });
    }

    req.user = decoded;
    next();
  });
}
