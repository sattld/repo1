var mysql = require('mysql');

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456li',
    database : 'myapp'
  });

function sqlQuery(sql){
    return new Promise((resolve,reject)=>{
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('和mysql数据库建立连接失败');
            } else {
                console.log('和mysql数据库连接成功');
                // conn.query('SELECT * from user WHERE phone='+phone, function (error, results) {
                conn.query(sql, function (error, results) {
                    if (error) {
                        console.log('查询数据库失败');
                        reject(error);
                        return;
                    } else {
                        conn.release();
                        resolve(results)
                    }
                })
            }
        });
    })
}



module.exports = {
    sqlQuery
}