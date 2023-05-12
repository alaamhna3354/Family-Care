<template>
    <section class="banner">
        <div class="row p-5">
            <div class="col-md-8 col-12 mb-3" 
            data-aos="zoom-in-right" 
            data-aos-offset="300"
            data-aos-duration="2000">
                <ElementsImage :classes="['custom-image']" :src="`/images/Rectangle 11.png`" />
            </div>
            <div class="col-md-4 col-12">
              <div class="row">
                  <div class="col-12 mb-3" 
                    data-aos="zoom-in-left" 
                    data-aos-offset="300"
                    data-aos-duration="2000">
                        <ElementsImage :classes="['custom-image']" :src="`/images/Rectangle 11 copy.png`" />
                  </div>
                  <div class="col-12"
                    data-aos="zoom-in-left" 
                    data-aos-offset="300"
                    data-aos-duration="2000">
                        <ElementsImage :classes="['custom-image']" :src="`/images/Rectangle 11 copy 2.png`" />
                  </div>
              </div>
            </div>
        </div>
    </section>
</template>

<script setup>

</script>

<style lang="scss">
.banner{
    overflow: hidden;
    img{
        width: 100%;
    }
}
</style>