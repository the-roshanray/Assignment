const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  house: { type: String, required: true },
  apartment: { type: String, required: true },
  landmark: { type: String, required: true },
  saveAs: { type: String, required: false },
});

const Address = mongoose.models.Address || mongoose.model('Address', addressSchema);

module.exports = Address;
