const errorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "development";
  const status = err?.isTruested && err?.status ? err?.status : 500;
  const message = err?.isTruested || "Something went wrong";
  const stack = err?.stack && isDev ? err.stack : undefined;

  if (isDev || status >= 500) console.error(err);
  res.status(status).json({ error: { message, stack } });
};
