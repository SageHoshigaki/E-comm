class Cart {
  constructor(products, total) {
    this.products = [];
    this.total = 0;
  }

  addtoCart(product) {
    this.products.push(product);
  }

  updateQty(productName) {
    for (let i = 0; i < this.products.length; i++) {
      let itemInCart = this.products[i].name;
      if (productName === itemInCart) {
        return this.products[i].qty += 1;
      } else {
        console.log('Product May Not Exist');
      }
    }
  }
}