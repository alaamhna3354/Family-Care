<template>
  <section class="products-gallery">
    <ProductsShoppingCart v-model="shoppingCart" @shopping-cart="getEmited"/>
    <!-- <ElementsHeaderImage :src="`/images/header (2).jpeg`" :height="`50vh`" /> -->
    <div class="container pt-5">
      <div class="row">
        <div v-for="(product, index) in products" :key="`product-${index}`" class="col-12 col-sm-6 col-md-4 col-xl-3 mx-auto mb-5 text-center">
          <NuxtLink :to="`/our-product/3/${product.id}`" class="gold-hover">
            <ElementsProductCard :src="apiBase +'/'+ product.frontImageUrl" :title="useTranslate(product, 'name')" :newPrice="`${product.price} ${currency.symbol}`" :titleSize="titleSize" :priceSize="priceSize" :priceColor="`#977c38`" />
            <!-- <button @click.prevent="addToCart(product)" class="btn btn-gradient text-white">Add To Cart</button> -->
            <ElementsCustomBtn :url="`/our-product/4/${product.id}`" :classes="['py-1 py-sm-s']" :width="btnWidth" :fontSize="btnSize" :btnText="$t('add-to-cart')" />
          </NuxtLink>
        </div>
        <!-- <div class="col-12 col-sm-6 col-md-4 col-xl-3 mx-auto text-center">
          <NuxtLink to="/gallery/2" class="gold-hover">
            <ElementsProductCard :src="`/images/card (3).jpg`" :title="`Ferrari (Metallic Foil)`" :newPrice="`159$`" :titleSize="`1.5rem`" :priceSize="`1.4rem`" :priceColor="`#977c38`" />          
            <button @click.prevent="addToCart" class="btn btn-gradient text-white">Add To Cart</button>
          </NuxtLink>
        </div>
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 mx-auto text-center">
          <NuxtLink to="/gallery/3" class="gold-hover">
            <ElementsProductCard :src="`/images/card (2).jpg`" :title="`Audi (Metallic Foil)`" :newPrice="`159$`" :titleSize="`1.5rem`" :priceSize="`1.4rem`" :priceColor="`#977c38`" />          
            <button @click.prevent="addToCart" class="btn btn-gradient text-white">Add To Cart</button>
          </NuxtLink>
        </div> -->
      </div><!--.row-->
    </div>
  </section>
</template>

<script setup>
  const { products } = defineProps(['products'])
  const { apiBase, api } = useRuntimeConfig()
  const { $awn } = useNuxtApp()
  const currency = useCurrency().value
  const titleSize = ref('1.5rem');
  const priceSize = ref('1.5rem');
  const btnWidth = ref('100%');
  const btnSize = ref(`1.3rem`);
  
  const shoppingCart = ref([])
  const getEmited = () => {
    // console.log('getEmited')
  }
  const addToCart = (product) => {
    return navigateTo('/our-product/4');
    let exists = false
        
    for (const cartItem of shoppingCart.value) {
        if (cartItem.id === product.id) {
            cartItem.amount = cartItem.amount + 1
            exists = true
            break
        }
    }
    if (!exists) {
        shoppingCart.value.push({
            ...product,
            amount: 1,
        })
    }
    $awn.success('Add To Cart Successfully')
  }


  onMounted(() => {
    shoppingCart.value = JSON.parse(localStorage.getItem('shoppingCart') || "[]")
    if (window.innerWidth > 1100) {       
      titleSize.value = '1.5rem';
      priceSize.value = '1.5rem';
    }
    if (window.innerWidth > 992 && window.innerWidth <= 1100) { 
      titleSize.value = '1.4rem';
      priceSize.value = '1.4rem';
    }
    if (window.innerWidth >= 768 && window.innerWidth <= 992) { 
      titleSize.value = '1.3rem';
      priceSize.value = '1.3rem';
    }
    if (window.innerWidth >= 576 && window.innerWidth < 768) { 
      titleSize.value = '1.2rem';
      priceSize.value = '1.2rem';
    }
    if (window.innerWidth < 576) { 
      titleSize.value = '1.1rem';
      priceSize.value = '1.1rem';
      btnWidth.value = '140px';
      btnSize.value = '1.1rem';
    }
  });
  // watch(() => shoppingCart.value, (newValue) => {
    // // your code
    // console.log('shoppingCart', shoppingCart, newValue);
    // localStorage.setItem('shoppingCart', JSON.stringify(newValue));
// }, { deep: true });
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';

</style>