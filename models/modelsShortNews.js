const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: {
    type: 'String',
    required: true,
  },
  text: {
    type: 'String',
    required: true,
  },
  img: {
    type: 'String',
    required: true,
  },
});

const schemasShort = mongoose.model('news', schema);

module.exports = schemasShort;
