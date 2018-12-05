const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
const register=require('./Controllers/register');
const signin=require('./Controllers/signin');
const verify=require('./Controllers/verify');
const mail=require('./Controllers/mail');
const item=require('./Controllers/item');
const publisher=require('./Controllers/publisher');
const issue=require('./Controllers/issue');
const retur=require('./Controllers/retur');
const request=require('./Controllers/request');
const member=require('./Controllers/member');
const mail1=require('./Controllers/mail1');
const pass=require('./Controllers/pass');
const reserve=require('./Controllers/reserve');
const reminder=require('./Controllers/reminder');
const pending=require('./Controllers/pending');
app.use(cors());
app.use(bodyParser.json());

var db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'lms'
  }
});


app.post('/verify',(req,res)=>
{
  verify.handleVerify(req,res,db);
})

app.post('/signin',(req,res)=>
{
 signin.handleSignin(req,res,db,bcrypt); 
})

app.post('/register',(req,res)=>
{
  register.handleRegister(req,res,db,bcrypt);
})

app.post('/mail',(req,res)=>
{
  mail.handleMail(req,res,db);
})

app.post('/mail1',(req,res)=>
{
  mail1.handleMail(req,res,db);
})


app.post('/additem',(req,res)=>
{
item.handleAdd(req,res,db);
})

app.post('/pass',(req,res)=>
{
pass.handlePassword(req,res,db,bcrypt);
})

app.get('/showitem',(req,res)=>
{
  item.handleShow(req,res,db);
})

app.post('/addpublisher',(req,res)=>
{
publisher.handleAdd(req,res,db);
})

app.post('/showmember',(req,res)=>
{
  member.handleShow(req,res,db);
})

app.post('/showissue',(req,res)=>
{
  item.handleShowIssue(req,res,db);
})


app.post('/issue',(req,res)=>
{
  issue.handleIssue(req,res,db);
})

app.post('/return',(req,res)=>
{
  retur.handleReturn(req,res,db);
})

app.get('/showrequest',(req,res)=>
{
  request.handleShow(req,res,db);
})

app.post('/showrequest1',(req,res)=>
{
  request.handleShow1(req,res,db);
})

app.get('/showpublisher',(req,res)=>
{
  publisher.handleShow(req,res,db);
})


app.post('/request',(req,res)=>
{
  request.handleRequest(req,res,db);
})
app.post('/reserve',(req,res)=>
{
  reserve.handleReserve(req,res,db);
})

app.get('/checkreserve',(req,res)=>
{
  reserve.handleUpdate(req,res,db);
})
app.get('/showreserve',(req,res)=>
{
  reserve.handleShow(req,res,db);
})

app.get('/sendreminder',(req,res)=>
{
  reminder.handleReminder(req,res,db);
})

app.get('/pending',(req,res)=>
{
  pending.handlePending(req,res,db);
})
app.get('/showpending',(req,res)=>
{
  pending.showPending(req,res,db);
})
app.post('/showreserve1',(req,res)=>
{
  reserve.handleShow1(req,res,db);
})
app.listen(process.env.PORT || 3000,()=>
{
  console.log("server is working on port 3000");
} )
