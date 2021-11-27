const { TheaterModel } = require("../models/theater");
const bcrypt = require("bcryptjs");

const TheaterService = {
  async createOne(data) {
    return new TheaterModel(data).save();
  },
  async addShow(filter, show) {
    return TheaterModel.updateOne(filter, {
      $pull: {
        shows: show,
      }
    })
  },
  async getOne(filter) {
    return UserModel.findOne(filter).exec();
  },
  async getMany(filter) {
    return UserModel.find(filter);
  },
  async updateOne(filter, data) {
    return UserModel.updateOne(filter, { $set: data });
  },
  async deleteOne(id) {
    return UserModel.deleteOne({ _id: id });
  },
};

module.exports = {
  TheaterService,
};
