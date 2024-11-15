export const errorHandler = async (err, req, res, next) => {
  let status = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "objectId") {
    status = 400;
    message = "Resource not found";
  }

  res.status(status).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};

export const notFound = (req, res, next) => {
  res.status(404);
  throw new Error("endpoint not found");
};

export const customError = (res, message, status) => {
  if (!status) status = 500;

  res.status(status);
  throw new Error(message);
};
