const handleIssue=(req,res,db)=>
{
	const {mem_id,item_id}=req.body;
 var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var co;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
var issue_date=cd;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();

currentTime=date.addDays(15)

var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
var return_date=cd;

if(!mem_id || !item_id)
{
	return res.status(400).json('unable to issue');	
}
else
	{
		db('a.issue').count('mem_id').where('mem_id','=',mem_id).
		then(result=>
		{
			
			co=parseInt(result[0].count);
		if(co > 3)
		{
			res.status(400).json("already issued 4 items");
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
	.where({id:item_id})
	.then(data=>
	{
	if(data.length)
	{
	if(data[0].qty>0)
	{
		db.transaction(trx=>
	{
	trx('a.item').
	where({id:item_id})
	.update({qty:data[0].qty-1})
		.returning('*')
		.then(response=>{
 return  trx('a.issue')
 .returning('*')
 .insert(
{
	mem_id:mem_id,
	item_id:item_id,
	author:response[0].author,
	return_date:return_date,
	issue_date:issue_date
})
.then(result=>
{
	res.json(response[0]);
})
})
.then(trx.commit)
	.catch(trx.rollback)
	})	
	.catch(err=>res.status(400).json('item not issued'))
	}
	else
	res.status(400).json("item not available");
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
		
		}).catch(err=>console.log(err))

		
}
}


module.exports={
	handleIssue:handleIssue
}