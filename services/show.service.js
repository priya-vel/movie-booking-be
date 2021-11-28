const { ShowModel } = require("../models/show")
const { BookingService } = require("./booking.service")




const ShowService = {
    async createShow(data) {
        return new ShowModel(data).save()
    },
    async updateShow(filter, data) {
        return ShowModel.updateOne(filter, {
            $set: data
        })
    },
    async getShows(filter) {
        let sort = {createdAt: -1}
        return ShowModel.find(filter).sort(sort)
    },
    async getOne(_id) {
        return ShowModel.findOne({_id})
    }
}


module.exports = {
    ShowService
}
