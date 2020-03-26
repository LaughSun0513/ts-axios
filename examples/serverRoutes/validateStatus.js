const router = require('express').Router();

router.get('/304', function(req, res) {
    res.status(304)
    res.json({
        status:'3044444'
    })
    res.end()
})

module.exports = router;