const { AuthenticationError } = require("apollo-server-express");
const { User, Doozie } = require("../models");
const { signToken } = require("../utils/auth");
const schedule = require("node-schedule");

let today = new Date();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("doozies")

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find().select("-__v -password").populate("doozies");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("doozies");
    },
    doozies: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Doozie.find(params);
    },
    doozie: async (parent, { _id }) => {
      return Doozie.findOne({ _id });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    addDoozie: async (parent, args, context) => {
      if (context.user) {
        const doozie = await Doozie.create({
          ...args,
          username: context.user.username,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { doozies: doozie._id } },
          { new: true }
        );

        return doozie;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    deleteDoozie: async (parent, args, context) => {
      if (context.user) {
        const doozie = await Doozie.findOneAndRemove({ _id: args.id });

        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { doozies: args.id } },
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError("You need to be logged in!");
    },
    completeDoozie: async (parent, args, context) => {
      if (context.user) {
        const currentDoozie = await Doozie.findById({ _id: args.id });
        if (currentDoozie.completed) {
          const doozie = await Doozie.findOneAndUpdate(
            { _id: args.id },
            {
              completed: false,
            },
            { new: true }
          );

          return doozie;
        } else {
          const doozie = await Doozie.findOneAndUpdate(
            { _id: args.id },
            {
              completed: true,
            },
            { new: true }
          );

          return doozie;
        }
      }

      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

// auto delete logic for midnight
schedule.scheduleJob("0 0 * * *", () => {
  deleteCompleted(time);
});

// auto delete logic for every minute
// schedule.scheduleJob("*/1 * * * *", () => {
//   deleteCompleted();
// });

const deleteCompleted = async () => {
  try {
   await Doozie.deleteMany({ "completed": true })
 
  } catch (err) {
   console.error(err)
  }
};

module.exports = resolvers;
