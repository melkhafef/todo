const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt=require('express-jwt-session');
const cors = require('cors');
const mysqlStore = require('express-mysql-session')(session);
const app = express();
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Me.0124901516',
    database: 'todos'
};
var sessionStore = new mysqlStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
let conection = mysql.createConnection(options);
conection.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/src'));
app.use(cors());
app.post('/login',function(req,res){
    let sql =`select * from user where name='${req.body.name}' AND password=${req.body.password}`
    conection.query(sql,(err,respons)=>{
        if(err) throw err ;
        if(respons.length != 0){
            console.log(respons);
            const secret ='ssshhh';
            let token = jwt.signToken({ name: req.body.name, password: req.body.password}, secret, 150);
            console.log(token);
            res.status(200).json({ token: token });
            res.end();
        }
        else{
            console.log('invalid');
            res.send('invalid username or password');
        }
    })
});
app.get('/todos:id',function(req,res){
    console.log('read');
    let sql = `select * from todo where user_id=${parseInt(req.params.id)})`
    conection.query(sql,(err,result)=>{
        if(err) throw err;
        res.json(result);
    })
})
app.put('/todos/:id', function (req, res) {
    let sess = req.session;
    let sql = `update todo SET title=${req.body.title} where id=${req.params.id}`
    conection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result.affectedRows);
    })
})
app.delete('/todos/:id', function (req, res) {
    let sess = req.session;
    let sql = `DELETE FROM todo WHERE id=${req.params.id}`;
    conection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result.affectedRows);
    })
})
app.post('/todos/:id', function (req, res) {
    let sql = `insert into todo (title,description,duedate,isdone,user_id) values ('${req.body.title}',
        '${req.body.description}','${req.body.duedate}',${false},${parseInt(req.params.id)}) `
    conection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.status(201);
    })
})
app.listen(3000);