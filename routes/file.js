const express = require('express');
const upload = require('../middlewares/fileUpload');
const router = express.Router();

const uploadMiddleware = upload.fields([
    {
        name: "artwork",
        maxCount: 1
    },
    {
        name: "track",
        maxCount: 1
    }
])

router.post("/", uploadMiddleware, (req, res) => {
    try {
        const artwork = req.files["artwork"];
        const track = req.files["track"];

        if (artwork && track) {
            return res.status(200).json({
                artwork,
                track
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

module.exports = router;