const router = require('express').Router();

router.get('/xsrf',(req,res)=>{
  res.json(req.cookies);
});

module.exports = router;