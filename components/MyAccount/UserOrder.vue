<template>
  <section class="user-orders">
    <div class="table-content table-responsive" id="cart-container">
      <table class="table">
        <thead>
          <tr>
            <th>Card Logo</th>
            <th>Card Name</th>
            <th>Card Number</th>
            <th>Card Number Position</th>
            <th>Chip Size</th>
            <th>Our Designers</th>
            <th>Card Care</th>
            <th>Shipping</th>
            <th>Insurance</th>
            <th>Payment Way</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td v-if="order?.logoUrl"><img :src="order?.logoUrl" alt="" width="75" height="75" /></td>
            <td v-if="!order?.logoUrl">----</td>
            <td>
                {{ order.name ?? '----' }}
            </td>
            <td>
              {{ order.cardNumber ?? '----' }}
            </td>
            <td>
              {{ order.cardNumberIsBack ? 'On Back' : 'On Front' }}
            </td>
            <td>
              {{ order.chipSizeIsBig ? $t('large') : $t('small') }}
            </td>
            <td>
              {{ order.ourDesigners ?? '----' }}
            </td>
            <td>
              {{ order.cardCare ?? '----' }}
            </td>
            <td>
              {{ order.shipping ?? '----' }}
            </td>
            <td>
              {{ order.insurnace ?? '----' }}
            </td>
            <td>
              {{ order.isCash ? 'Cash' : 'Online' }}
            </td>
            <td>
              {{ order.totalPrice ?? '----' }}
            </td>            
          </tr>
        </tbody>
      </table>      
    </div>
    <div class="pagination">
      <div class="row w-100 mx-auto my-3">
        <div class="col-6 text-start">
          <button type="button" :class="`btn btn-outline-secondary px-4 py-1 ${page == 0 ? 'disabled' : ''}`" @click="prevRecords">Prev</button>
        </div>
        <div class="col-6 text-end">
          <button type="button" :class="`btn btn-outline-secondary px-4 py-1 ${lastPage ? 'disabled' : ''}`" @click="nextRecords">Next</button>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
  const { api, apiBase } = useRuntimeConfig()
  const page = ref(0);
  const productNumberPerPage = ref(8);
  const orders = ref([]);
  const lastPage = ref(false);

  const { data, error, pending: dataPending, execute } = await useAsyncData(
    'orders',
    () => $fetch(`${api.ClientOrdersApi}`, {
      method: 'GET',
      baseURL: `${apiBase}`,
      params: {PageNumber: page.value, PageSize: productNumberPerPage.value},
      headers: {
        'Authorization': `Bearer ${useToken().value}`
      },

    } ), {
      watch: [page, productNumberPerPage],
    }
  );

  // refetch the token if 401 error occure
  if (error.value && error.value.statusCode == 401) {
    await useReauthorization().reAuthorize()
  }

  const appendOrders = ( newOrders ) => {    
    if (newOrders.length == 0) {
      lastPage.value = true
      return;
    } else {
      lastPage.value = false
      orders.value = [];
      newOrders.forEach( ( product ) => {
        orders.value.push( product );
      });
    }
  }

  const nextRecords = () => {
    if (!lastPage.value) {
      page.value = page.value + 1
    }
  }

  const prevRecords = () => {
    if (lastPage.value) {
      page.value = page.value - 2
    }
    if (page.value != 0) {
      page.value = page.value - 1
    }
  }

  // Life cycle Hook
  onMounted(() => {
    if (data.value) orders.value = data.value
    else execute()
  })
  watch(data, (newData) => appendOrders( newData ))
</script>

<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
  .table-responsive {
    // &::-webkit-scrollbar { height: 6px; }
    // &::-webkit-scrollbar-track { background: #2e2b2b; }
    // &::-webkit-scrollbar-thumb { background: $gold; border-radius: 10px; }
    // &::-webkit-scrollbar-thumb:hover { background: #555; }
    @include horizontal-scrollbar(6px, '#2e2b2b', $gold, '#555');
  }
  table.table {
    color: $text-color;
    thead th,
    tbody td { height: 60px; vertical-align: middle; white-space: nowrap; text-align: center; }
  }
  button.btn:focus:not(:focus-visible) {
    box-shadow: unset;
  }
</style>