const mysql = require('mysql')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')


const app = new Koa()

app.use(bodyParser())

//mysql config
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'coo123',
  database : 'coo_meeting'
})
 
connection.connect()

const addSql = 'INSERT INTO user_info(username,wxid,sex,groupid) VALUES(?,?,?,?)';



app.use(async(ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
      let html = 'aa'
      ctx.body = html
  } else if (ctx.url === '/' && ctx.method === 'POST') {
    let postData = ctx.request.body
    let addSqlParams = []

    //follow the sql orde 
    addSqlParams.push(postData.name)
    addSqlParams.push(postData.wxId)
    addSqlParams.push(postData.sex)
    addSqlParams.push(postData.groupid)


    connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }
      console.log(result)        
      console.log('--------------------------INSERT SUCCESS-------------------------'); 
    });

    console.log(postData)
    ctx.body = postData
  } else {
      ctx.body = '<h2>404</h2>'
  }
})

app.listen(8888)
 
connection.query('SELECT * from user_info', function (error, results, fields) {
  if (error) throw error
})
