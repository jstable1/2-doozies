const { Schema, model } = require('mongoose');

const doozieSchema = new Schema(
  {
    title: {
      type: String,
      required: 'You need to have a title!'
    },
    description: {
      type: String
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
