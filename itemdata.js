const mongoose = require("mongoose");
const Product = require("./models/Product");

let PullOnShorts = new Product({
  img: "images/hl1.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "PullOnShort",
  price: 395.0,
  description:
    "The Helmut Lang Pull On Shorts Are Drawstring Shorts With Side Zip Pockets And Snap-Button Flap Pockets At The Back.",
});

const SprayedTee = new Product({
  img: "images/hl2.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "SprayedTee",
  price: 375.0,
  description:
    "The Helmut Lang Sprayed Tee Is A Short-Sleeve Cotton T-Shirt With A Sprated Finish And Logo Details.",
});

const LacedShirt = new Product({
  img: "images/hl3.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "LacedShirt",
  price: 395.0,
  description:
    "The Helmut Lang Laced Shirt Is A Poplin Button-Up With A Point Collar, Concave Hem, And Lacing Details",
});

const StrappedBomber = new Product({
  img: "images/hl4.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "StrappedBomberJacket",
  price: 595.0,
  description:
    "The Helmut Lang Strapped Bomber Jacket Is A Relaxed Style With Ribbed Trim, Multiple Pockets, And Interior Straps So You Can Wear It Off Your Shoulders",
});

const StrapBra = new Product({
  img: "images/hl5.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "StrapBra",
  price: 125.0,
  description:
    "The Helmut Lang Strap Bra Is An Unlined Bra Thats Lightweight And Stretchy",
});

const FemmeHi = new Product({
  img: "images/hl6.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "FemmeHiSpikesJeans",
  price: 320.0,
  description:
    "The Helmut Lang Hi Spikes Jeans In A Matte, Powder Black Wash Have A High Rise And A Slim-Straight Leg",
});

const DoubleWaistBandSkirt = new Product({
  img: "images/hl7.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "DoubleWaistBandSkirt",
  price: 295.0,
  description:
    "The Helmut Lang Double-Waistband Skirt Is An Alpaca And Wool Blend Mini Skirt With An Asymmetric Waistband Detail",
});

const SilkMiniDress = new Product({
  img: "images/hl8.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "Open-BackSilkMiniDress",
  price: 595.0,
  description:
    "The Helmut Lang Open-Back Silk Mini Dress Is A Lightweight, Silk Satin Mini Dress With An Open Back And Spaghetti Straps",
});

const CorsetShirt = new Product({
  img: "images/hl9.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "CorsetShirt",
  price: 395.0,
  description:
    "The Helmut Lang Corset Shirt Is An Open Back, Italian Poplin Button-Up Collar And Adjustable Waist Tie.",
});

const TrenchBonber = new Product({
  img: "images/hl10.jpg",
  storeTitle: "HELMUT LANG",
  itemName: "TrenchBomberJacket",
  price: 695.0,
  description:
    "The Helmut Lang Trench Bomber Jacket Is a Lightweight Cotton Bomber Jacket With a zip Front, Buttoned Wrap Collar, And Interior Shoulder Straps. ",
});

const defaultProducts = [
  PullOnShorts,
  SprayedTee,
  LacedShirt,
  StrappedBomber,
  StrapBra,
  FemmeHi,
  DoubleWaistBandSkirt,
  SilkMiniDress,
  CorsetShirt,
  TrenchBonber,
];

/*Product.insertMany(defaultProducts, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Products Saved to the database");
  }
});*/

module.exports = defaultProducts;
module.exports = PullOnShorts;
module.exports = SprayedTee;
module.exports = LacedShirt;
module.exports = StrappedBomber;
module.exports = StrapBra;
module.exports = FemmeHi;
module.exports = DoubleWaistBandSkirt;
module.exports = SilkMiniDress;
module.exports = CorsetShirt;
module.exports = TrenchBonber;
