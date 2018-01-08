'use strict';

// Get all

db.restaurants.find().pretty();

//Limit and sort

db.restaurants.find().sort({name: 1}).limit(10).pretty();

//Get by _id

var Id = db.restaurants.findOne({}, {_id: true})._id;
db.restaurants.findOne({_id: Id});

//Get by value

db.restaurants.find({borough: "Queens"});

//Count

db.restaurants.count();

//Count by nested value

db.restaurants.count({'address.zipcode': '11206'});

//Delete by ID

const objectId = db.restaurants.findOne({}, {_id: 1})._id;
db.restaurants.find({_id: objectId}).count();
1
db.restaurants.remove({_id: objectId});
//Logs out : WriteResult({ "nRemoved" : 1 })
db.restaurants.find({_id: objectId}).count();

//Update a single document

var obj = db.restaurants.findOne({}, {_id: 1})._id
db.restaurants.updateOne(
{_id: obj},
{$set: {name: 'Bizz Bar Bang'}});

//Logs outs: { "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }

db.restaurants.findOne({_id: obj});

//Updates many documents

db.restaurants.updateMany(
{'address.zipcode': '10035'},
{$set: {'address.zipcode': '10036'}});
 //Log outs: { "acknowledged" : true, "matchedCount" : 103, "modifiedCount" : 103 }
db.restaurants.find({'address.zipcode': '10035'}).pretty();
//Nothing found
db.restaurants.find({'address.zipcode': '10036'}).pretty();
//Restaurants move to 10036
