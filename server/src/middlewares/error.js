module.exports = (err, req, res, next) => {
  console.error('Erro global:', err.message);
  res.status(500).send('Erro server.');
};