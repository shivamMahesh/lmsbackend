const handleAdd=(req,res,db)=>
{
	const { name ,address,phone,email}=req.body;
if(!email || !name || !address || !phone)
{
	return res.status(400).json('unable to register');	
}
	else
	{
db('a.publisher').insert({
			name:name,
			address:address,
			phone:phone,
			email:email
		}).returning('id')
.then(result=>res.json(result[0]))
.catch(err=>res.status(400).json("not added"))
}
}

const handleShow=(req,res,db)=>
{
db('a.publisher').select('*')
.then(result=>
{
if(result.length)
{
	res.json(result);
}
else
res.status(400).json("No publisher")
})
.catch(err=>res.status(400).json("No publisher"))
}



module.exports={
	handleAdd:handleAdd,
	handleShow:handleShow
}