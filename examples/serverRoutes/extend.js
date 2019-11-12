const router = require('express').Router();

router.get('/extend/get',(req,res)=>{
  res.json({
    msg:"extend/get"
  })
});
router.options('/extend/options',(req,res)=>{
  res.json({
    msg:"extend/options"
  })
});
router.delete('/extend/delete',(req,res)=>{
  res.json({
    msg:"extend/delete"
  })
});
router.head('/extend/head',(req,res)=>{
  res.json({
    msg:"extend/head"
  })
});
router.post('/extend/post',(req,res)=>{
  res.json({
    msg:"extend/post"
  })
});
router.put('/extend/put',(req,res)=>{
  res.json({
    msg:"extend/put"
  })
});
router.patch('/extend/patch',(req,res)=>{
  res.json({
    msg:"extend/patch"
  })
});
router.get('/extend/fanxing',(req,res)=>{
  res.json({
    code:0,
    message:'ok',
    result:{
      name:'jack',
      age:18
    }
  })
});

module.exports = router;