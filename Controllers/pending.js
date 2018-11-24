var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'librarymanagementrvce@gmail.com',
    pass: 'Rvcse@2020'
  }
});

const sendMail=(req,res,db,data)=>
{

  var html;
  var mailOptions;
  var i;  
  var name,email,return_date;
  console.log(data);

for(i=0;i<data.length;i++)
{
   db.select('name','email').from('a.member')
  .where('id','=',data[i].mem_id)
  .then(result=>{
    name=result[0].name;
    email=result[0].email;
  })
  .catch(err=>res.status(400).json(400))
 
   db('a.item').select('title','author')
  .where({id:data[i].item_id})
  .then(result2=>{
  html=`hi ${name}
<br>
It's a reminder!!!
<br>
The item with details: title: ${result2[0].title} and author: ${result2[0].author} which you have issued.
<br><br>
The return date for the item is over so kindly go and return the book.
<br>
Else you will be charged a fine of Rs.5 pr day.
`;
  mailOptions = {
  from: 'librarymanagementrvce@gmail.com',
  to: email,
  subject: 'pending item reminder',
  html: html
}
  transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    //console.log('Email sent: ' + info.response);
  }})
}).catch(err=>console.log(err))
}
res.json(data);
}

const handlePending=(req,res,db)=>
{
	const {id}=req.body;
  var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();

	 db.select('*').from('a.issue')
  .where('return_date','<',cd)
  .then(data=>
  {
 if(data.length)
  {
     sendMail(req,res,db,data);
  }
  else
    res.json("false");
})
}

const showPending=(req,res,db)=>
{
  var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();

   db.select('*').from('a.issue')
  .where('return_date','<',cd)
  .then(data=>
  {
 if(data.length)
  {
    res.json(data);
       }
  else
    res.json("true");
})
}

module.exports={
	handlePending:handlePending,
  showPending:showPending
}