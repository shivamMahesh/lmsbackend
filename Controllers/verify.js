const handleVerify=(req,res,db)=>
{
	  const {id, token,flag}=req.body;
     var table;
     if(flag==="1")
    table='a.login1';
  else
    table='a.login2';
  if(!id || !token)
  {
   return res.status(400).json(false)
  }
  db(table).where({
    id:id,
    token:token})
  .update(
  {
    active:true
  })
  .then(data=>
  {
    if(data===1)
    res.json(true);
  else
    res.status(400).json(false);
  })
  .catch(err=>res.status(400).json(false))
}


module.exports={
	handleVerify:handleVerify
}
