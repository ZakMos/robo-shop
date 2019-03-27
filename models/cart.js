/**
 * @class CartItem A single cart item
 */
class CartItem {
  constructor(cartItem = {}) {
    /**
     * @property id (String) A product id for the cart item
     */
    this.id = cartItem.id;
    /**
     * @property product (Object) The product object
     * See: models/product
     */
    this.product = cartItem.product;
    /**
     * @property qty (Number) The quantity of the product in the cart
     */
    this.qty = cartItem.qty || 0;
    /**
     * @property price (Number) The total price of the product in the cart - product.price * qty
     */
    this.price = cartItem.price || 0;
  }
}

/**
 * @class Cart a state container for the shopping cart
 */
class Cart {
  constructor(cart = {}) {
    /**
     * @property items (Object) a hashmap to contain cart items where each property is the id of the item and each value is a CartItem object
     */
    this.items = cart.items || {};
  }

  /**
   * totalQty
   *
   * @return  {Number}  the total amount of items in the cart
   */
  get totalQty() {
    return this.toArray().reduce((sum, item) => sum + item.qty, 0);
  }

  /**
   * totalPrice
   *
   * @return  {Number}  the total price of all items in the cart
   */
  get totalPrice() {
    return this.toArray().reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * toArray converts cart items to array
   *
   * @return  {Array}  an Array of CartItem objects
   */
  toArray() {
    return Object.values(this.items);
  }

  /**
   * add Adds item to the cart
   *
   * @param   {String}  id       A product id
   * @param   {Object}  product  A product object
   */
  add(id, product) {
    // If an item exists in the cart...
    const item = this.items[id]
      ? // ...clone it to a new cart item
      new CartItem(this.items[id])
      : // otherwise, create a new cart item
      new CartItem({ id, product });

    // Increment the item's quantity
    item.qty += 1;
    // Update the item's price
    item.price = item.product.price * item.qty;

    // Set the item in the items hashmap
    this.items = {
      ...this.items,
      [id]: item
    };
  }

  /**
   * remove Removes product from cart
   *
   * @param   {String}  id  A product id
   */
  remove(id) {
    // If an item exists in the cart clone it to a new item
    const item = this.items[id] && new CartItem(this.items[id]);

    // If it doesn't exist, do nothing
    if (!item) return;
    // If the item's quantity is 1, just remove all of it
    if (item.qty <= 1) return this.removeAll(id);

    // Otherwise, decrement the item's quantity
    item.qty -= 1;
    // Update the item's price
    item.price = item.product.price * item.qty;

    // Set the item in the items hashmap
    this.items = {
      ...this.items,
      [id]: item
    };
  }

  /**
   * removeAll remove all of one item from the cart
   *
   * @param   {String}  id  A product id
   */
  removeAll(id) {
    // Clone the items hashmap
    const newItems = { ...this.items };
    // Delete the cart item by id
    delete newItems[id];

    // Set the new items hashmap
    this.items = newItems;
  }
}

module.exports = Cart;
