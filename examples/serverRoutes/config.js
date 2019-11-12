const router = require('express').Router();

router.post('/config/post', function(req, res) {
    res.json(req.body);
})

module.exports = router;