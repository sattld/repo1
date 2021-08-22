const express = require('express')
const app = express()
const port = 3000
// const Mysql = require('./tools/methods');
const httpFun = require('./httpFun');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
//允许跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// app.use(upload.single('myImg'))
app.post('/login',httpFun.login);

app.post('/register',httpFun.register);
app.post('/upload',upload.single('myImg'),httpFun.uploadFun);

  
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})