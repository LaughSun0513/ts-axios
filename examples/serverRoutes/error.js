const router = require('express').Router();

// 响应错误
router.get('/error/get', function(req, res) {
  if(Math.random()>0.5){
    res.json({
      msg:"Good!! get data!! Not error!!"
    })
  }else{
    res.status(500);
    res.end();
  }
});
// 响应超时错误
router.get('/error/timeout', function(req, res) {
  setTimeout(()=>{
    res.json({
      msg:"Oops!! Time Out!!"
    })
  },3000)
});


module.exports = router;