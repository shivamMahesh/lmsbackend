var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'librarymanagementrvce@gmail.com',
    pass: 'Rvcse@2020'
  }
});
const handleAdd=(req,res,db)=>
{
	const {title,author,type,price,edition,pub_id}=req.body;
	var req_date,mem_id,flag=0;
	if(!title || !author || !type || !price || !edition || !pub_id)
	{
   return res.status(400).json('ITEM NOT ADDED');
	}
	else
	{
		db('a.request').select('mem_id','req_date').where({
			title:title,
			author:author
		}).then(data=>{
			if(data.length){
				console.log('hey');
		req_date=data[0].req_date;
		mem_id=data[0].mem_id
	
	db.select('name','email').from('a.member')
  .where({id:mem_id})
  .then(data1=>
  {
 if(data1.length)
 {
const html=`hi ${data1[0].name}
<br>
The item with details
<br> 
Title: ${title}<br> 
Author: ${author} which you have requested on ${req_date} for is now available. 
<br>Go and Issue the Item`;

    var mailOptions = {
  from: 'librarymanagementrvce@gmail.com',
  to: data1[0].email,
  subject: 'request',
  html: html
}
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    //console.log('Email sent: ' + info.response);
  }})
  }
 }).catch(err=>console.log(err))
}})
		.catch(err=>console.log(err))



db('a.item').insert(
{
	title:title,
	author:author,
	type:type,
	price:price,
	edition:edition,
	qty:1,
	pub_id:pub_id
}).returning('id')
.then(result=>res.json(result[0]))
.catch(err=>res.status(400).json("publisher not found"))
console.log(title,author);
db('a.request').where({
			title:title,
			author:author
		}).del().catch(err=>console.log(err))

}
}

const handleShow=(req,res,db)=>
{

db.select('*').from('a.item')
.then(result=>res.json(result))
.catch(err=>res.status(400).json("item not found"))
}

const handleShowIssue=(req,res,db)=>
{
	const {id}=req.body;
db.select('*').from('a.issue').where(
{
	mem_id:id
})
.then(result=>
	{
		if(result.length)
		{
		res.json(result)	
		}
		else
		res.status(400).json("item not issued");
		
})
.catch(err=>res.status(400).json("member not found"))
}

module.exports={
	handleAdd:handleAdd,
	handleShow:handleShow,
	handleShowIssue:handleShowIssue
}