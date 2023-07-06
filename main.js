const { createApp, ref, computed, reactive } = Vue;

const app = createApp({
  setup() {
    const cart = ref([]);
    const premium = ref(true);

    function updateCart(id) {
      cart.value.push(id)
      console.log(cart.value)
    }

    function removeCart(id) {
      let index = cart.value.indexOf(id);
      if (index !== -1) {
        cart.value.splice(index, 1);
      }
      console.log(cart.value)
    }

    return {
      cart, premium, updateCart , removeCart
    }
  },
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('cart-detail', cartDetail)
app.component('review-form', reviewForm)
app.component('review-list', reviewList)
app.mount("#app")