const handleShow=(req,res,db)=>
{
	const {flag}=req.body;
	if(flag==="1")
	{
		const id=req.body.id;
		db.select('*').from('a.member').where(
{
	id:id
})
.then(result=>
	{
		if(result.length)
		{
		res.json(result[0])	
		}
		else
		res.status(400).json("member not found");
		
})
.catch(err=>res.status(400).json("member not found"))
	}
	else
	{
		const name=req.body.name;
		db.select('*').from('a.member').where(
{
	name:name
})
.then(result=>{
	if(result.length)
		{
		res.json(result[0])	
		}
		else
			res.status(400).json("member not found");
})
.catch(err=>res.status(400).json("member not found"))
	}

}



module.exports={
	handleShow:handleShow
}