import jwt from "jsonwebtoken";

export function jwtSign(req, res, next) {
  const user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const secretToken = process.env.SECRET_TOKEN;
  const newToken = jwt.sign(user, secretToken, { expiresIn: 86400 });
  
  req.token = newToken;
  next();
}

export function jwtVerify(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const secretToken = process.env.SECRET_TOKEN;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Bad request!",
    });
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
