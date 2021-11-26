const { UserModel } = require("../models/user");
const bcrypt = require("bcryptjs");

const UserService = {
  async createOne(data) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    return new UserModel(data).save();
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
    return UserModel.deleteOne({"_id": id});
  },
};

module.exports = {
  UserService,
};
