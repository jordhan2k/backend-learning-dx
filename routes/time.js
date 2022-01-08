const express = require('express');
const { route } = require('./file');
const router = express.Router();
const moment = require('moment');

router.get("/currentTime", (req, res) => {

    res.json({
        locale: moment.locale(),
        currentTime: moment().format(),
        dayOfWeek: moment().format("dddd"), 
        dayOfMonth: moment().format("Do"),
        month: moment().format("MMMM"),
        year: moment().format("YYYY"),
        timeOfDay: moment().format("hh:mm A"),
        timeZoneOffset: moment().format("Z"),
        daysInMonth: moment().daysInMonth(),
        isLeapYear: moment().isLeapYear(),
        startOfDay: moment().startOf("day").fromNow(),
        endOfDay: moment().endOf("day").fromNow()
    });

});

router.post("/formatTime", (req, res) => {
    const {timeString, format} = req.body;

    res.send({
        time: moment(timeString, format).format(),
        fromNow:  moment(timeString, format).fromNow(),
    });
});

module.exports = router;