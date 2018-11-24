const handlePassword=(req,res,db,bcrypt)=>
{
const {id , password,flag}=req.body;
const pas = bcrypt.hashSync(password);
   if(flag==="1")
    table='a.login1'
  else
    table='a.login2'
  if(!id || !password)
  {
   return res.status(400).json(false)
  }
  
  db(table).where({
    id:id})
  .update(
  {
    password:pas
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
handlePassword:handlePassword
}