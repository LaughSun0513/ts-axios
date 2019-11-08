const router = require('express').Router();

router.get('/interceptor/get',(req,res)=>{
  res.end('hello interceptor');
})

module.exports = router;