const { BookingsModel } = require("../models/bookings");

const BookingService = {
  async createBookingsForShow(showId, theaterId, userId) {
    const rows = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
    const showsList = [];
    let index = 0;
    for (let i = 0; i < rows.length; i++) {
      for (let j = 1; j <= 20; j++) {
        let type = "normal";
        if (!(rows.indexOf("K") > i)) {
          type = "VIP";
        }
        let show = {
          type,
          show: showId,
          theater: theaterId,
          status: "open",
          bookingId: theaterId + "-" + showId,
          seat: `${rows[i]}${j}`,
          user: userId,
          index,
        };
        index++;
        showsList.push(show);
      }
    }
    return BookingsModel.insertMany(showsList)
  },
  async bookings(filter) {
    return BookingsModel.find(filter).lean().exec()
  },
  async getOne(filter) {
    return BookingsModel.findOne(filter)
  },
};
