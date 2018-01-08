/*
db.restaurants.find(
 { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ]
})

db.restaurants.find({
  $or: []

})

The cuisine set to something
other than "Not Listed/Not Applicable"
db.restaurants.find({'cuisine':  { $ne: "Not Listed/Not Applicable" } }).pretty();
-------------------------
The borough set to something other than "Missing"
 db.restaurants.find({'borough':  { $ne: "Missing" } }).pretty();
-------------------------
At least one grade
grades.
 db.restaurants.find({'grades.0.grade':  { $exists: true } }).pretty();
-------------------------
None of the grades set to "Not Yet Graded"
db.restaurants.find({'grades':  { $ne: "Not Yet Graded" } }).pretty()
-------------------------
None of the scores set to -1
db.restaurants.find({'grades.score':  { $ne: "-1" } }).pretty();
-------------------------
//chained.
db.restaurants.find({
'grades.score':  { $ne: "-1" } ,
'cuisine':  { $ne: "Not Listed/Not Applicable" },
'borough':  { $ne: "Missing" },
'grades.1.score':  { $exists: true },
'grades':  { $ne: "Not Yet Graded" },
'grades.score':  { $ne: "-1" }
}).pretty();
-------------------------
//count how many were filtered.
db.restaurants.count({
'grades.score':  { $ne: "-1" } ,
'cuisine':  { $ne: "Not Listed/Not Applicable" },
'borough':  { $ne: "Missing" },
'grades.1.score':  { $exists: true },
'grades':  { $ne: "Not Yet Graded" },
'grades.score':  { $ne: "-1" }
});
-------------------------
Create a list of all of the cuisines offered by the restaurants, with no duplicates
db.runCommand({distinct:"restaurants", key:"cuisine"})
-------------------------
Find the first five restaurants with the lowest positive score in one of their gradings.
//sort 1,-1 descending vs ascending
db.restaurants.find({'grades.grade': {$gt: "0" }}).sort({'grades.score' : 1}).limit(5);
-------------------------
Find the restaurants which have only been graded A.
db.restaurants.find({'grades.grade': {$ne: 'B'}}).pretty(); - runs, not SOL Dx
db.restaurants.grades.find({'grade': {$eq: "A"}}).pretty(); - runs, not SOL Dx
db.restaurants.find({'grades.grade':{$elemMatch: {$eq: "A"}}}).pretty(); - runs, not SOL Dx
db.restaurants.find({'grades.grade':{$elemMatch: {$in: ["A"]}}}).pretty(); - doesnt wrk
db.restaurants.find({grades: $elemMatch: {grade: {$in: ['A']}}}}).pretty(); - runs, not SOL Dx

//sol
$not - $nin
db.restaurants.find({grades: {$not: {$elemMatch: {grade: {$nin: ["A"]}}}}});

-------------------------

*/
