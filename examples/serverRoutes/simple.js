const router = require('express').Router();

router.get('/simple/get',(req,res)=>{
  res.json({
    success:true,
    msg:"Hello Typescript"
  })
});

module.exports = router;