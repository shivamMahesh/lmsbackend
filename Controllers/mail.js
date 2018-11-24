const randomstring=require('randomstring');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'librarymanagementrvce@gmail.com',
    pass: 'Rvcse@2020'
  }
});

const sendMail=(req,res,db,name,email)=>
{
  var table;
    const {id,flag}=req.body;
	const token=randomstring.generate();
  const html=`hi ${name}
<br>
THANK YOU FOR REGISTERING !!
<br><br>
YOUR ID IS ${id}
<br>
PLEASE VERIFY YOUR EMAIL BY TYPING THE FOLLOWING TOKEN
<br><br><b>${token}<br>`;

    var mailOptions = {
  from: 'librarymanagementrvce@gmail.com',
  to: email,
  subject: 'verify your mail',
  html: html
}
 if(flag==="1")
    table='a.login1'
  else
    table='a.login2'

  db(table)
  .where({id:id})
  .update(
  {
    token:token
  })
  .then(data=>
	{
    if(data===1)
    {
		transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    res.json(false);
  } else {
    //console.log('Email sent: ' + info.response);
  }})
	res.json(true);
  }
  else
  return res.status(400).json(false)})
}

const handleMail=(req,res,db)=>
{
	const {id,flag}=req.body;
  var table;
  if(flag==="1")
    table='a.member';
  else
    table='a.staff';

	 db.select('name','email').from(table)
  .where({id:id})
  .then(data=>
  {
 if(data.length)
  sendMail(req,res,db,data[0].name,data[0].email);
  else
	res.status(400).json(false);
})
}

module.exports={
	handleMail:handleMail
}