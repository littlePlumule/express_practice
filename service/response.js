module.exports = {
  success(res, data) {
    res.send({
      status: 'success',
      data,
    }).end();
  },
  fail(res, message) {
    res.status(400).send({
      status: 'fail',
      message
    }).end();
  },
};
