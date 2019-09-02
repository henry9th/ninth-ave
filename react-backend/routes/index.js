let express = require("express");
let router = express.Router();

let Seller = require("../models/seller");
let Item = require("../models/item");


// should perform regex on seller name
router.get('/seller/name/:sellerName', async function (req, res) {
  var sellerName = req.params.sellerName.trim().toLowerCase();  
	console.log("sellerName: " + sellerName);
  try {
    Seller.find({
      "name" : { $regex: sellerName, $options: "i" }
    }).exec((err, sellers) => {
      if (err || !sellers) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(sellers);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});

router.get('/seller/id/:sellerId', async function (req, res) {
  var sellerId= req.params.sellerId; 

  try {
    Seller.findById(sellerId).exec((err, seller) => {
      if (err || !seller) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(seller);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});


// Get most recent 50 items
router.get('/item', async function (req, res) {
  try {
    Item.find().limit(50).sort({ 'postDate': -1 }).exec((err, items) => {
      if (err || !items) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(items);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});


// should perform regex on item name
router.get('/item/name/:itemName', async function (req, res) {
  var itemName = req.params.sellerName.trim().toLowerCase();  

  try {
    Item.find({
      "name" : { $regex: itemName, $options: "i" }
    }).exec((err, items) => {
      if (err || !items) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(items);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});

router.get('/item/seller/:sellerId', async function (req, res) {
  var sellerId = req.params.sellerId.trim();
  try {
    Item.find({
      "sellerId" : sellerId
    }).exec((err, items) => {
      if (err || !items) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(items);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});

router.get('/item/id/:itemId', async function (req, res) {
  var itemId= req.params.itemId; 

  try {
    Item.findById(itemId).exec((err, item) => {
      if (err || !item) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } else {
        res.status(200).send(item);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});


// let searchSeller = (req, res) => {
//   let query = req.query.query;
//   if (!query || query.length == 0) {
//     res.status(400).send({ error: "Invalid query" });
//     return;
//   }

//   query = query.trim().toLowerCase();
//   try {
//     Seller.find({
//       sellerName: { $regex: query, $options: "i" }
//     })
//       .limit(MAX_RETURNED_USERS)
//       .exec((err, users) => {
//         if (err || !users) {
//           if (err) console.log(err);
//           res.status(400).send({ error: "Internal DB error" });
//         } else {
//           users = users.map(user => ({
//             alias: user.alias,
//             firstName: user.firstName,
//             lastName: user.lastName
//           }));
//           res.status(200).send(users);
//         }
//       });
//   } catch (err) {
//     console.log(err);
//     res.status(400).send({ error: "Internal error" });
//   }
// };


module.exports = router;
