const router = require('express').Router();

router.post('/create', function(req, res) {
    res.json(req.body);
})

module.exports = router;