const { BookingsModel } = require("../models/bookings");
const CronJob = require('cron').CronJob;
const { ShowService } = require("./show.service")
const { UserService } = require("./user.service")
const moment = require("moment")
const util = require("./../utils/mailer");


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
  async bookShow(_id, userId, userEmail) {
    return BookingsModel.updateOne(
      { _id },
      {
        $set: {
          user: userId,
          status: "booked",
        },
      }
    ).then(async res => {
      const bookingData = await this.getOne({ _id })
      const showData = await ShowService.getOne({ _id: bookingData.show })
      util.sendMaill(userEmail, "Show Booked", `Your have booked ${showData.name} show`).catch(err => {})
      console.log();
      let time = moment(showData.time)
      let date = time.add(300, "minutes");
      console.log(date);
      // date.setSeconds(date.getSeconds()+2);
      const job = new CronJob(date, () => {
        const d = new Date();
        util.sendMaill(userEmail, "Show Reminder", `Your show ${showData.name} will start in 30min`)
        .catch((err) => {
          console.error(err)
        })
        console.log('Specific date:', date, ', onTick at:', d);
      });
      console.log('After job instantiation');
      job.start();
      return res
    }).catch(err => {
      console.log(err);
      return Promise.reject(err);
    });
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
