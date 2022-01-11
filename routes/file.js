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

        const artworkUrl = `${req.protocol}://${req.get('host')}/static/uploads/${artwork[0].filename}`;
        const trackUrl = `${req.protocol}://${req.get('host')}/static/uploads/${track[0].filename}`;

        if (artwork && track) {
            return res.status(200).json({
                artworkUrl,
                trackUrl
            })
        }
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

module.exports = router;