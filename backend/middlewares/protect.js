import jwt from "jsonwebtoken";

const protect = () => {
  const token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
};

export { protect };
