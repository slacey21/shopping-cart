// const express = require("express");
// const router = express.Router();
// const Product = require("../models/product");
// const CartItem = require("../models/cartItem");

// router.get("/products", (req, res, next) => {
//   Product.find({})
//     .then((products) => res.json(products))
//     .catch(next);
// });

// router.post("/products", (req, res, next) => {
//   const { title, price, quantity } = req.body;
//   Product.create({ title, price, quantity })
//     .then((product) => res.json(product))
//     .catch((err) => next(err));
// });

// router.put("/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const { title, price, quantity } = req.body;
//   Product.findById(productId)
//     .then((product) => {
//       return Product.findByIdAndUpdate(
//         productId,
//         {
//           title: title || product.title,
//           price: price === undefined ? product.price : price,
//           quantity: quantity === undefined ? product.quantity : quantity,
//         },
//         { new: true }
//       );
//     })
//     .then((updatedProduct) => {
//       res.json(updatedProduct);
//     });
// });

// router.delete("/products/:id", (req, res, next) => {
//   const productId = req.params.id;
//   Product.findByIdAndRemove(productId)
//     .then(() => {
//       res.json();
//     })
//     .catch((err) => next(err));
// });

// router.post("/cart", (req, res) => {
//   const { productId, title, price } = req.body;
//   CartItem.findOne({
//     productId,
//   })
//     .then((item) => {
//       if (!item) {
//         return CartItem.create({
//           title: title,
//           price: price,
//           quantity: 1,
//           productId,
//         });
//       } else {
//         return CartItem.findOneAndUpdate(
//           { productId },
//           {
//             quantity: item.quantity + 1,
//           },
//           { new: true }
//         );
//       }
//     })
//     .then((item) => {
//       res.json(item);
//     });
// });

// router.post("/cart/checkout", (req, res) => {
//   CartItem.deleteMany({}).then(() => {
//     res.json();
//   });
// });

// router.get("/cart", (req, res, next) => {
//   CartItem.find({})
//     .then((cartItems) => res.json(cartItems))
//     .catch(next);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const CartItem = require("../models/cartItem");

router.get("/products", (req, res, next) => {
  Product.find({})
    .then((products) => res.json(products))
    .catch(next);
});

router.post("/products", (req, res, next) => {
  const { title, price, quantity } = req.body;
  Product.create({ title, price, quantity })
    .then((product) => res.json(product))
    .catch((err) => next(err));
});

router.put("/products/:id", (req, res) => {
  const productId = req.params.id;
  const { title, price, quantity } = req.body;
  Product.findById(productId)
    .then((product) => {
      return Product.findByIdAndUpdate(
        productId,
        {
          title: title || product.title,
          price: price === undefined ? product.price : price,
          quantity: quantity === undefined ? product.quantity : quantity,
        },
        { new: true }
      );
    })
    .then((updatedProduct) => {
      res.json(updatedProduct);
    });
});

router.delete("/products/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete({_id: productId})
    .then(() => {
      res.json();
    })
    .catch((err) => next(err));
});

router.post("/add-to-cart", (req, res, next) => {
  const { productId } = req.body;
  Product.findById(productId)
    .then((product) => {
      if (product.quantity === 0) {
        product.error = "No more items";
        return product;
      }
      return Product.findByIdAndUpdate(
        productId,
        {
          quantity: product.quantity - 1,
        },
        { new: true }
      );
    })
    .then((updatedProduct) => {
      CartItem.findOne({
        productId,
      })
        .then((item) => {
          if (updatedProduct.error) {
            return item;
          }
          if (!item) {
            return CartItem.create({
              title: updatedProduct.title,
              price: updatedProduct.price,
              quantity: 1,
              productId,
            });
          } else {
            return CartItem.findOneAndUpdate(
              { productId },
              {
                quantity: item.quantity + 1,
              },
              { new: true }
            );
          }
        })
        .then((item) => {
          const { error, ...product } = updatedProduct.toObject();
          res.json({ product, item });
        });
    });
});

router.post("/checkout", (req, res) => {
  CartItem.deleteMany({}).then(() => {
    res.json();
  });
});

router.get("/cart", (req, res, next) => {
  CartItem.find({})
    .then((cartItems) => {
      res.json(cartItems);
    })
    .catch(next);
});

module.exports = router;
