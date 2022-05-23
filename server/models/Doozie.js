const { Schema, model } = require('mongoose');

const doozieSchema = new Schema(
  {
    doozieText: {
      type: String,
      required: 'Please add a to-do!'
    },
    username: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  }
);

const Doozie = model('Doozie', doozieSchema);

module.exports = Doozie;
