//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";

handleAdd=(req,res,db)=>
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
.then(result=>
	{
		/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("lms");
  var myobj = { id:result[0],name: name, address: address,phone:phone,email:email };
  dbo.collection("publisher").insert(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
		*/res.json(result[0])})
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
/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("lms");
  dbo.collection("publisher").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);

    db.close();
    res.json(result);
  });
});*/
}



module.exports={
	handleAdd:handleAdd,
	handleShow:handleShow
}