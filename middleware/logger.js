const logger = (req, res, next) => {
  // console.log(req)
  console.log(
    new Date(),
    req.method,
    req.url,
    req.user ? req.user.name : "anonymous"
  );
  next();
};

export default logger;
