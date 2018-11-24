const handleReserve=(req,res,db)=>
{
	const {mem_id,item_id}=req.body;
 var currentTime = new Date();
 var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
var start_date=cd;

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

var date = new Date();

currentTime=date.addDays(1)

var currentOffset = currentTime.getTimezoneOffset();
 var ISTOffset = 330;
 var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
 cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
var end_date=cd;

if(!mem_id || !item_id)
{
	return res.status(400).json('unable to reserve');	
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
 return  trx('a.reserve')
 .returning('*')
 .insert(
{
	mem_id:mem_id,
	item_id:item_id,
	start_date:start_date,
	end_date:end_date
})
.then(result=>
{
	res.json(response[0]);
})
})
.then(trx.commit)
	.catch(trx.rollback)
	})	
	.catch(err=>res.status(400).json('item not reserved'))
	}
	else
	res.status(400).json("item not available");
	}
	else
	{
	res.status(400).json("item not found");
	}
	}).catch(err=>res.status(400).json('item not reserved'))
	}
	else
				res.status(400).json('member not found');
	})
	.catch(err=>res.status(400).json('item not reserved'))	

	
}
}




const handleUpdate=(req,res,db)=>
{

  var currentTime = new Date();

var currentOffset = currentTime.getTimezoneOffset();

var ISTOffset = 330;

var c = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
cd=c.getFullYear()+"-"+(((c.getMonth()+1)<10)?'0':'')+(c.getMonth()+1)+"-"+((c.getDate()<10)?'0':'')+c.getDate();
   console.log(cd);
   
   
		db.select('item_id').from('a.reserve')
	.where('end_date','<',cd)
	.then(data=>
	{
	if(data.length)
	{
		db.transaction(trx=>
	{
	console.log(data);	
dat=[];
		for(i=0;i<data.length;i++)
			dat.push(data[i].item_id)
		console.log(dat)
		trx('a.reserve').
	where('end_date','<',cd)
		.del()
		.then(result=>{
 return  trx('a.item')
 .whereIn('id',dat)
.increment('qty',1)
.then(result=>
{
	res.json("true");
})
})
.then(trx.commit)
	.catch(trx.rollback)
	})	
	.catch(err=>res.status(400).json('false'))
  }
  else
  	res.json("true");
}).catch(err=>res.status(400).json('false'))
}

handleShow=(req,res,db)=>
{
db.select('*').from('a.reserve')
		.then(result=>
		{
			if(result.length)
			{
			res.json(result);
			}
			else
			{
				res.status(400).json("NO REQUEST");
			}
		}).catch(err=>res.status(400).json("RESERVES CAN NOT BE SHOWN"));
}


handleShow1=(req,res,db)=>
{
db.select('*').from('a.reserve')
.where({mem_id:req.body.mem_id}).then(result=>
		{
			if(result.length)
			{
			res.json(result);
			}
			else
			{
				res.status(400).json("NO REQUEST");
			}
		}).catch(err=>res.status(400).json("RESERVES CAN NOT BE SHOWN"));
}

module.exports={
	handleReserve:handleReserve,
	handleUpdate:handleUpdate,
	handleShow:handleShow,
	handleShow1:handleShow1
}