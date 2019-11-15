const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

const router = express.Router();

const cors = {
  'Access-Control-Allow-Origin': 'http://localhost:8202',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
// 1 post请求前 先嗅探是否有这个接口
router.options('/more/server2',(req,res)=>{
  res.set(cors);
  res.end();
});
// 2
router.post('/more/server2',(req,res)=>{
  res.set(cors);
  res.json(req.cookies)
});

app.use(router);

const port = 8288
module.exports = app.listen(port)