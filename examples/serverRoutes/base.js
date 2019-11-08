const router = require('express').Router();

// 响应post请求
router.post('/base/post', function(req, res) {
  res.json(req.body)
});

// 响应buffer数据流
router.post('/base/buffer', function(req, res) {
  let msg=[];
  req.on("data",chunk=>{
    msg.push(chunk);
  });
  req.on("end",()=>{
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON());
  });
})

module.exports = router;