

const handleRegister=(req,res,db,bcrypt)=>
{
	const { name , email ,password ,address,phone,flag}=req.body;
const pass = bcrypt.hashSync(password);

var table1,table2;
	if(flag==="1")
		{
		table1='a.member';
		table2='a.login1';}
		else
		{
		table1='a.staff';
		table2='a.login2';
		}
		console.log(flag,table1,table2);
if(!email || !name || !password)
{
	return res.status(400).json('unable to register');	
}
else
{
	db.transaction(trx=>
	{
	trx.insert({
			name:name,
			address:address,
			phone:phone,
			email:email
		})
		.into(table1)
		.returning('id')
		.then(logid=>{
 return  trx(table2)
 .returning('*')
 .insert(
{
	id:logid[0],
	active:false,
	password:pass
})
.then(result=>
{
	res.json(result[0].id);
})
})
.then(trx.commit)
	.catch(trx.rollback)
	})	
	.catch(err=>res.status(400).json('ALREADY REGISTERED'))	
}
}

module.exports={
	handleRegister:handleRegister
}
