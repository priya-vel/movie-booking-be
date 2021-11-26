const { UserModel } = require("../models/user");
const bcrypt = require("bcryptjs");

const UserService = {
  async createOne(data) {
    let newUser = {
      email: data.email,
      name: data.name,
      password: "",
      type: "user",
    };
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    newUser.password = hash;
    return new UserModel(newUser).save();
  },
  async getOne(filter) {
    return UserModel.findOne(filter).exec();
  },
  async getMany() {
    return UserModel.find({});
  },
  async updateOne(filter, data) {
    return UserModel.updateOne(filter, { $set: data });
  },
  async deleteOne(id) {
    return UserModel.deleteOne({ _id: id });
  },
};

module.exports = {
  UserService,
};
