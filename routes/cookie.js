const express = require('express');
const router = express.Router();


router.get("/setCookie", (req, res) => {
    res.cookie("editableToken", "acdkfghor456sf");
    res.cookie("secureToken", "acdkfghor456sjldjf", { signed: true });
    res.json({
        success: true
    });
});

router.get("/getCookie", (req, res) => {
    console.log("unsigned cookies: ", req.cookies);
    console.log("signed cookies: ", req.signedCookies);

    res.json({
        success: true,
        cookies: req.cookies
    });
});

module.exports = router;