export const notFoundMiddleware = (err, req, res, next) => {
  if (err.status === 404) {
    console.log(err);
    res.status(404).send({ successful: false, message: err.message });
  } else {
    next(err);
  }
};

export const badRequestMiddleware = (err, req, res, next) => {
  if (err.status === 400) {
    console.log(err);
    res.status(400).send(err.errorsList);
  } else {
    next(err);
  }
};

export const unacceptableRequest = (err, req, res, next) => {
  if (err.status === 406) {
    console.log(err);
    res.status(406).send(err.errorsList);
  } else {
    next(err);
  }
};

export const catchErrorMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).send('Generic Server Error');
  next();
};
