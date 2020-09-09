const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  firstName: {
    type: 'String',
    required: true,
  },
  lastName: {
    type: 'String',
    required: true,
  },
  profession: {
    type: 'String',
    required: true,
  },
  gender: {
    type: 'String',
    required: true,
  },
  email: {
    type: 'String',
    required: true,
  },
  pwd: {
    type: 'String',
    required: true,
  },
  img: {
    type: 'String',
    required: true,
  },
});

const schemasUsers = mongoose.model('users', schema);

module.exports = schemasUsers;
