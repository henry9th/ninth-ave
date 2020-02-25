let express = require("express");
let router = express.Router();

let Seller = require("../models/seller");
let Item = require("../models/item");
let Owner = require("../models/owner");
let AccessCode = require("../models/accesscode");
let mongoose = require("mongoose");
const multer = require('multer');
const fs = require('fs');

var bcrypt = require('bcryptjs');

/* code for initializing mongo collections */ 
// var newItem = new Item({ name: 'Test item', description: "random description", availability: null, sellerName: "Test seller", sellerId: new mongoose.mongo.ObjectId('56cb91bdc3464f14678934ca'), postDate: 0 });
// newItem.save(function (err) {
//   if (err) console.log(err);
//   // saved!
// });

// var newSeller = new Seller({ name: 'Test seller', bio: "random bio", joinDate: 0, brandImage: "random path", coverImage: "random" });

// newSeller.save(function (err) {
//   if (err) console.log(err);
//   // saved!
// });

// var newOwner = new Owner({ username: 'hyunraekim', password: "substitue", sellerId:  new mongoose.mongo.ObjectId('5e102b2f12eb260c142b7c60')});

// newOwner.save(function (err) {
//   if (err) console.log(err);
//   // saved!
// });

// var newAccessCode = new AccessCode({ code: 'secret', expirationDate: Date.now(), available: true });

// newAccessCode.save(function(err) { 
//   if (err) console.log(err);
  
// });

// Get all sellers 
router.get('/seller/', async function (req, res) {
  try {
    Seller.find().sort({ 'name': 1 }).exec((err, sellers) => {
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


router.post('/signin', async function (req, res) {

  var username = req.body.username; 
  var password = req.body.password; 

  try {
    Owner.findOne({ "username" : username }).exec((err, owner) => {
      if (err) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } 
      if (!owner) { 
        // username wasn't found
        res.status(400).send({ error: "The username could not be found"})
      }
      else {
        if (bcrypt.compareSync(password, owner.password)) { 
          // password matches
          res.status(200).send(owner);
        } else { 
          res.status(400).send({ error: "The password is incorrect" })
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});

router.post('/register', async function (req, res) {

  var username = req.body.username; 
  var password = req.body.password; 
  var accessCode = req.body.accessCode; 

  try {
    AccessCode.findOne({"code" : accessCode}).exec((err, accessCode) => {
      if (err) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } 
      if (!accessCode) { 
        // invalid access code 
        res.status(400).send({ error: "Incorrect access code value"});
      }
      else {

        Owner.findOne({ "username" : username }).exec((err, owner) => {
          if (err) {
            if (err) console.log(err);
            res.status(400).send({ error: "Internal DB error" });
          } 
          if (owner) { 
            // username already taken
            res.status(400).send({ error: "The username already exists"})
          }
        });

        if (accessCode.available) { 
          var newOwner = new Owner({ username: username, password: password, sellerId: accessCode.sellerId });

          newOwner.save(function (err) {
            if (err) console.log(err);
            else { 
              accessCode.claimedBy = username; 
              accessCode.available = false;
              accessCode.save();
            }
          });

          res.status(200).send(newOwner);

        } else { 

          res.status(400).send({ error: "Access code has been already used"});
        }

      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});

router.post('/updateBio', async function (req, res) {

  var sellerId = req.body.sellerId; 
  var bio = req.body.bio; 

  try {
    Seller.findById(sellerId).exec((err, seller) => {
      if (err) {
        if (err) console.log(err);
        res.status(400).send({ error: "Internal DB error" });
      } 
      if (!seller) { 
        // invalid access code 
        res.status(400).send({ error: "No seller found"});
      }
      else {
        seller.bio = bio; 
        seller.save();
        res.status(200).send(seller);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "Internal error" });
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var sellerName = file.originalname

    sellerName = sellerName.replace(".jpg", "");
    sellerName = sellerName.replace(/ /g,"_");
    const dir = `../public/images/${sellerName}`

    fs.exists(dir, exist => {
    if (!exist) {
      return fs.mkdir(dir, error => cb(error, dir))
    }
    return cb(null, dir)
    })
  },
  filename: (req, file, cb) => {
    cb(null, `logo.jpg`)
  }
})
  

const upload = multer({ storage })

router.post('/updateBrandImage', upload.single('file'), function(req, res) { 
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log('file received');
    return res.send({
      success: true
    })
  }
});

router.post('/newItem', function(req, res) { 
  
  var name = req.name;
  var description = req.description;
  var availability = req.availability;
  var sellerName = req.sellerName;
  var sellerId = req.sellerId;
  var postDate = req.postDate; 
  var images = req.image; 
  var price = req.price; 

  var newItem = new Item({ name: name, description: description, availability: availability, sellerName: sellerName, sellerId: sellerId, postDate: postDate, images: images, price: price });
  newItem.save(function (err) {
    if (err) {
      console.log(err);
      return res.send({ 
        success: false, 
        message: err
      });

    } else { 
      return res.send({
        success: true,
        message: "Successfully saved new item"
      })
    }
  });
});

module.exports = router;
