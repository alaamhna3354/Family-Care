<template>
  <div class="form-floating mb-3">    
    <VField 
      :name="name" 
      v-slot="{ value }" 
      class="form-control just-bottom-border"
      :id="id"
      as="select"
      @change="getCitiesForCountry($event, name)">
        <option value="" disabled>{{placeholder}}</option>
        <!-- <option v-for="item in items" :key="item" :value="item" :selected="value && value.includes(item)">{{ useTranslate(item, 'Name') }}</option> -->
        <option v-for="item in items" :key="item" :value="item.id" :selected="value && value == item.id">{{ useTranslate(item, 'name') }}</option>
      </VField>
      <VErrorMessage :name="name" as="div" class="help is-invalid" />
    <label :for="id" :class="`form-label ${$i18n.locale == 'ar' ? 'rtl' : '' }`" v-if="label">{{ label }}</label>
  </div>
</template>

<script setup>
    const emit = defineEmits(['cities', 'isLoaded']);
    const { apiBase, api } = useRuntimeConfig();
    const props = defineProps({
      items: {
        required: true
      },
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        default: "text",
        required: true,
      },
      label: {
        type: String
      },
      placeholder: {
        type: String,
        default: "",
      }
    });

  const getCitiesForCountry = async (event, name) => {
    if (name == 'countries') {
      emit('isLoaded', true)
      let countryId = event.target.value;
      const { data, error, pending, refresh } = await useGetSiteApi().GetById(api.CitiesByCountryApi, countryId);
    
      // refetch the token if 401 error occure
      if (error.value && error.value.statusCode == 401) {
        await useReauthorization().reAuthorize()
      }
      // Emit The Value When Fetching It
      if (data.value) {
        emit('cities', data.value);
        emit('isLoaded', false)
      }
    }
  }

</script>

<style lang="scss" scoped>
  input { 
    &.rtl { direction: rtl; }
   }
   .form-floating > label { 
      &.rtl { right: 0; left: unset; }
   }
    .form-check-input:focus { box-shadow: none; }
    .form-check > label { color: #aaa; }
    .form-floating > label { color: #aaa; }
    .form-control {
      height: 54px;
      border: none;
      border-bottom: 1px solid #cccccc;
      border-radius: 0px;
      outline: none;
      box-shadow: none; 
      background-color: transparent;
      color: #aaa;
    }
    .help.is-invalid { letter-spacing: .03rem; }
  .form-control:focus,
  .form-control.is-invalid:focus, 
  .was-validated .form-control:invalid:focus {
    box-shadow: none;
  }

  .just-bottom-border {
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }

  .help {
    margin-top: 10px;
    &.is-invalid {
      color: #dc3545;
    }
  }
  .form-control.rtl.is-valid, 
  .was-validated .rtl.form-control:valid,
  .form-control.rtl.is-invalid, 
  .was-validated .rtl.form-control:invalid {
    background-position: left calc(.375em + .1875rem) center;
  }

</style>