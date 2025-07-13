module.exports = (err, req, res, next) => {
  console.error('Error global:', err.message);
  res.status(500).send('Error server.');
};