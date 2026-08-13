function isValidAmount(amount) {
  const num = Number(amount);
  return !isNaN(num) && num > 0;
}

function isValidPhone(phone) {
  return typeof phone === 'string' && /^\d{8,15}$/.test(phone);
}

module.exports = { isValidAmount, isValidPhone };
