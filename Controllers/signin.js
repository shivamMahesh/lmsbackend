const handleSignin=(req,res,db,bcrypt)=>
{
	const {id,password,flag}=req.body;
	var obj={
		'id':'',
		'active':false
	}
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
	if(!id || !password)
	{
   return res.status(400).json('wrong creditials')
	}
	else
	{
db.select('password','active').from(table2)
.where('id','=',id)
.then(data=>
{
	var isValid=false;
	isValid=bcrypt.compareSync(password,data[0].password);
	if(isValid)
	{
		return db.select('*').from(table1)
		.where('id','=',id)
		.then(user=>
		{
			obj.id=user[0].id;
			obj.active=data[0].active;
			res.json(obj);
		})
		.catch(err=>res.status(400).json('unable to get user'))
	} 
	else
	{
res.status(400).json('wrong creditials')
	}
})
.catch(err=>res.status(400).json('wrong creditials'))
}
}


module.exports={
	handleSignin:handleSignin
}