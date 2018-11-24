const handleRequest=(req,res,db)=>
{
const {mem_id,title,author}=req.body;
var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
if(!mem_id || !title || !author)
{
	return res.status(400).json('unable to register');	
}
	else
	{
		db.select('name').from('a.member')
		.where('id','=',mem_id)
		.then(result=>
		{
			if(result.length)
			{
db('a.request').insert({
			mem_id:mem_id,
			title:title,
			author:author,
			req_date:cd
		}).returning('*')
.then(result=>res.json(result[0]))
.catch(err=>res.status(400).json("not accepted"))
}
else
res.status(400).json("member not found")
})
}
}

handleShow=(req,res,db)=>
{
db.select('*').from('a.request')
		.then(result=>
		{
			if(result.length)
			{
			res.json(result);
			}
			else
			{
				res.status(400).json("NO RESERVE");
			}
		}).catch(err=>res.status(400).json("REQUEST CAN NOT BE SHOWN"));
}

handleShow1=(req,res,db)=>
{
db.select('*').from('a.request')
.where({mem_id:req.body.mem_id})
		.then(result=>
		{
			if(result.length)
			{
			res.json(result);
			}
			else
			{
				res.status(400).json("NO RESERVE");
			}
		}).catch(err=>res.status(400).json("REQUEST CAN NOT BE SHOWN"));
}


module.exports={
	handleRequest:handleRequest,
	handleShow:handleShow,
	handleShow1:handleShow1
}