const router = require('express').Router();

router.get('/cancel', function(req, res) {
  setTimeout(()=>{
    res.json('hello cancel');
  },2000)
});
router.post('/cancel', function(req, res) {
  setTimeout(()=>{
    res.json(req.body);
  },2000)
});
module.exports = router;