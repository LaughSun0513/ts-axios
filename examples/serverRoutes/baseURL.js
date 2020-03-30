const router = require('express').Router();

router.get('/baseURL', function(req, res) {
    res.json('baseURL');
});
module.exports = router;