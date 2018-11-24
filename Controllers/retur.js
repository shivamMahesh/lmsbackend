const handleReturn=(req,res,db)=>
{
	const {mem_id,item_id}=req.body;
	var day_start,day_end,total_days,days,fine;
 var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
if(!mem_id || !item_id)
{
	return res.status(400).json('unable to return');	
}
else
	{
		db.select('name').from('a.member')
		.where('id','=',mem_id)
		.then(result=>
		{
			if(result.length)
			{
	db.select('qty').from('a.item')
	.where('id','=',item_id)
	.then(data=>
	{
	if(data.length)
	{
	db.select('*').from('a.issue')
	.where('item_id','=',item_id)
	.then(data1=>
	{
	if(data1.length)
	{
		db.transaction(trx=>
	{
day_start = new Date( data1[0].return_date);
day_end = new Date(cd);
total_days = (day_end - day_start) / (1000 * 60 * 60 * 24);
days=Math.round(total_days);
fine=days*5;
if(fine<0)
fine=0;
	trx('a.item').
	where({id:item_id})
	.update({qty:data[0].qty+1})
		.returning('*')
		.then(response=>{
 return  trx('a.issue')
 .where({
item_id:item_id
 })
 .del()
.then(result=>
{
	res.json(fine);
})
})
.then(trx.commit)
	.catch(trx.rollback)
	})	
	.catch(err=>res.status(400).json('item not return'))
	}
	else
	res.status(400).json("item not issued");
	})
}
	else
	{
	res.status(400).json("item not found");
	}
	}).catch(err=>res.status(400).json('item not issued'))
	}
	else
				res.status(400).json('member not found');
	})
	.catch(err=>res.status(400).json('item not issued'))	

	
}
}

module.exports={
	handleReturn:handleReturn
}