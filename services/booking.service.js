const { BookingsModel } = require("../models/bookings");

const BookingService = {
  async createBookingsForShow(showId, theaterId) {
    const rows = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    const showsList = [];
    let index = 0;
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 15; j++) {
        let type = "normal";
        if (!(rows.indexOf("K") > i)) {
          type = "VIP";
        }
        let show = {
          type,
          show: showId,
          theater: theaterId,
          status: "open",
          bookingId: theaterId + "-" + showId + `-${rows[i]}${j}`,
          seat: `${rows[i]}${j}`,
          user: "",
          index,
        };
        index++;
        showsList.push(show);
      }
    }
    return BookingsModel.insertMany(showsList);
  },
  async getManyBookings(filter) {
    return BookingsModel.find(filter).lean().exec();
  },
  async getOne(filter) {
    return BookingsModel.findOne(filter);
  },
  async bookShow(_id, userId) {
    return BookingsModel.updateOne(
      { _id },
      {
        $set: {
          user: userId,
          status: "booked",
        },
      }
    );
  },
  async getUserBookings(filter) {
    return BookingsModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "theaters",
          localField: "theater",
          foreignField: "_id",
          as: "theater",
        },
      },
      {
        $lookup: {
          from: "shows",
          localField: "show",
          foreignField: "_id",
          as: "show",
        },
      },
    ]);
  },
};

module.exports = {
  BookingService,
};
