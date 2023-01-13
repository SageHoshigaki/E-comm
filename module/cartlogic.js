
  const updateQty = function(cartItemIndex) {
    return (shoppingBag[cartItemIndex].qty += 1);
  }

  const updatePrice = function(index) {
    let newPrice = shoppingBag[index].qty * caughtPrice;
    return (shoppingBag[index].price = newPrice);
  }

  const emptyCart = function(shoppingBag) {
    return shoppingBag.length;
  }

  const findItemInCart = function(element) {
    return element.itemName === incomingItem;
  }

const checkItemExist = function (incomingItem, shoppingBag) {
  console.log(incomingItem, shoppingBag)
    let itemIndexNumber = shoppingBag.findIndex(findItemInCart);
    if (itemIndexNumber === -1) {
      addToCart(incomingItem);
    } else {
      updateQty(itemIndexNumber);
      updatePrice(itemIndexNumber);
      //updateCartTotal();
    }
  }

  const addToCart=function(item) {
    return cart.products.push({ itemName: item, price: caughtPrice, qty: 1 });
  }



function calculateTotalPrice(shoppingBag) {
  let valuesToCalc = [];
  const reducer = (previousValue, currentValue) => previousValue + currentValue;

  for (let i = 0; i < shoppingBag.length; i++) {
    valuesToCalc.push(shoppingBag[i].price);
  }
  return valuesToCalc.reduce(reducer, 0);
}

module.exports = {
  calculateTotalPrice,
  emptyCart,
  updateQty,
  updatePrice,
  findItemInCart,
  checkItemExist,
  addToCart,
};