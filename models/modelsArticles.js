const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: 'String',
    required: true,
  },
  img: {
    type: 'String',
    required: true,
  },
  text: {
    type: 'String',
    required: true,
  },
  active: 'Boolean',
});

const schemas = mongoose.model('articles', schema);

module.exports = schemas;
