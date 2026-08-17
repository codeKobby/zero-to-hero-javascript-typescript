// Day 43 — Project: E-commerce — Starter

var products = []
var cart = []

function addToCart(productId) {
  var existing = cart.find(function (item) { return item.productId === productId })
  if (existing) {
    existing.quantity++
  } else {
    cart.push({ productId: productId, quantity: 1 })
  }
}

function removeFromCart(productId) {
  cart = cart.filter(function (item) { return item.productId !== productId })
}

function getCartTotal() {
  return cart.reduce(function (sum, item) {
    var product = products.find(function (p) { return p.id === item.productId })
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)
}

console.log('E-commerce ready!')
