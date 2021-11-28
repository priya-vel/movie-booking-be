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
    return TheaterModel.findOne(filter)
  },
  async getMany(filter) {
    return TheaterModel.find(filter);
  },
  async updateOne(filter, data) {
    return TheaterModel.updateOne(filter, {
      $set: data
    });
  },
  async deleteOne(id) {
    
  },
};

module.exports = {
  TheaterService,
};
