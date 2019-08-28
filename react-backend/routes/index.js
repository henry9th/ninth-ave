let express = require("express");
let router = express.Router();

let Seller = require("../models/seller");
let Item = require("../models/item"); 

router.get('/seller/:seller', function(req, res) {
  res.send("test route");
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
