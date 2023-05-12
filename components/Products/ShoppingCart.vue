<template>
  <div>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header">

        <h5 id="offcanvasRightLabel">
          Shopping cart - AED {{ totalSum }}
        </h5>

        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">

        <div v-for="(product, index) in modelValue" 
             :key="'cart-product-' + index" 
             class="card mb-3">
          <div class="row">
            <div class="col-md-4">
              <img :src="product.photoURL" 
                   class="img-fluid rounded-start">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                  {{ product.name }}
                </h5>
                <p class="card-text">
                  {{ product.description }}
                </p>
                <p class="card-text">
                  {{ product.price }} x AED {{ product.amount }}
                </p>
                <div class="d-grid">
                  <button @click="removeFromCart(product)" 
                          class="btn btn-outline-secondary">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
  const { modelValue } = defineProps(['modelValue'])
  const emit = defineEmits(['shoppingCart'])
  
  const totalSum = computed(() => {
      /// Sums all the prices and returns a TOTAL price
      let sum = 0

      for (const product of modelValue) {
        sum += product.price * product.amount
      }
      
      return sum
    })
// console.log('totalSum', totalSum);
    const removeFromCart = (product) => {
      // Looks for the item in the shopping cart array
      // Then, substracts one to the amount or removes it

      const shoppingCart = modelValue
      const productIndex = shoppingCart.findIndex(
                             item => item.id === product.id)
      console.log('shoppingCart', shoppingCart, shoppingCart[productIndex]);  
      shoppingCart[productIndex].amount -= 1
      
      if (shoppingCart[productIndex].amount < 1) {
        shoppingCart.splice(productIndex, 1)
      }

      // this.$emit('update:modelValue', shoppingCart)
      emit('shoppingCart', shoppingCart)
    }

</script>
