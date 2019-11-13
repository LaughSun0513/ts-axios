const router = require('express').Router();

router.post('/transform', function(req, res) {
    res.json(req.body);
})

module.exports = router;