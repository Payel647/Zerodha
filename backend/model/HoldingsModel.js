const {model, default: mongoose} = require("mongoose")

const {HoldingSchema} = require("../schemas/HoldingSchema")


const HoldingsModel = mongoose.model("holding", HoldingSchema)

module.exports = {HoldingsModel}