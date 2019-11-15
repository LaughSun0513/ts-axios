const router = require('express').Router();

router.get('/withCredentials', function(req, res) {
    res.json(req.cookies);
})

module.exports = router;