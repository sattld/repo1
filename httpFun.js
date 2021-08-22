const Mysql = require('./tools/methods');
var multer = require('multer');
const path = require('path');
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');

function login(req, res){
    let body = req.body;
    let resObj = {
        code:'',
        text:''
    }

    Mysql.sqlQuery('SELECT * from user WHERE phone='+body.phone).then(function(data){//查询是否已经注册过
        if(data.length!=0){
            if(data[0].password == body.password){
                resObj.code='200';
                resObj.text = '登录成功';
                res.send(JSON.stringify(resObj))
            }else{
                resObj.code='300';
                resObj.text = '密码错误';
                res.send(JSON.stringify(resObj));
            }
            
        }else{//已经注册过
            resObj.code='302';
            resObj.text = '该手机号还未注册';
            res.send(JSON.stringify(resObj))
        }
    }).catch(err=>{
        console.log(err);
        resObj.code='400';
        resObj.text = '登录失败，请稍后再试';
        res.send(JSON.stringify(resObj))
    })
}
function register(req, res){
    let body = req.body;
    let resObj = {
        code:'',
        text:''
    }
    Mysql.sqlQuery('SELECT * from user WHERE phone='+body.phone).then(function(data){//查询是否已经注册过
        if(data.length==0){
            Mysql.sqlQuery('INSERT INTO USER(phone,password) VALUES('+body.phone+','+body.password+')').then(()=>{//没有注册过
                resObj.code='200';
                resObj.text = '注册成功';
                res.send(JSON.stringify(resObj))
            }).catch((err)=>{
                console.log(err);
                resObj.code='400';
                resObj.text = '注册失败，请稍后再试';
                res.send(JSON.stringify(resObj))
            });
        }else{//已经注册过
            resObj.code='302';
            resObj.text = '该手机号已注册过';
            res.send(JSON.stringify(resObj))
        }
    }).catch(err=>{
        console.log(err);
        resObj.code='400';
        resObj.text = '注册失败，请稍后再试';
        res.send(JSON.stringify(resObj))
    })
}
function uploadFun(req, res){
    let file = req.file;
    fs.renameSync(file.path,`uploads/${file.originalname}`);
    res.send(`uploads/${file.originalname}`);
}
module.exports = {
    login,
    register,
    uploadFun
}