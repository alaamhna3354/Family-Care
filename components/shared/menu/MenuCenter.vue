
<template>
  <div class="container-fluid menu-center">
    <div class="row align-items-center">
      <div class="col-md-3 col-6 logo mb-2">
      <NuxtLink to="/">
            <img width="90" class="navbar-logo" src="/images/FAMILYCAREPHARMACYlogo.png" alt="" />
      </NuxtLink>
      </div>
      <div class="col-md-3 col-6 Customer_Service d-block d-md-none">
         <NuxtLink to="/">
            <img width="40" height="40" src="/images/img_(1).png" alt="">
            <span>
              <h6 class="m-0" style="color:#3ab3c2">{{$t('Customer_Service')}}</h6>
              <h6 class="m-0"  style="color:#e42626">+971 888 777 666</h6>
            </span>
        </NuxtLink>
      </div>
      <div class="col-md-6 mb-2 d-none d-md-block">
        <div class="search">
          <div class="dropdown">
            <button class="dropbtn">
              {{$t('category')}}
             <font-awesome-icon :icon="['fas', 'angle-down']" />
              </button>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div>
           <div class="search-box">
            <button class="btn-search"><font-awesome-icon :icon="['fas', 'magnifying-glass']" /></button>
            <input type="text" class="input-search" placeholder="What are you looking for?">
          </div>
        </div>
      </div>
      <div class="col-md-3 Customer_Service d-none d-md-block">
        <NuxtLink to="/">
            <img width="40" height="40" src="/images/img_(1).png" alt="">
            <span>
              <h6 style="color:#3ab3c2">{{$t('Customer_Service')}}</h6>
              <h6 style="color:#e42626">+971 888 777 666</h6>
            </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>


<script setup>

</script>



<style lang="scss" scoped>
  @import '~/assets/styles/scss/theme/variables';
  @import '~/assets/styles/scss/theme/mixin';
.menu-center{
  padding-top: 10px;
  padding-bottom: 10px;
  
  .search{
    background-color: #8ad4dd;
    border-radius: 30px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline-start: 20px;
    .dropdown {
      position: relative;
      display: inline-block;
      &:hover{
        .dropdown-content {
          display: block;
        }
      }
      .dropbtn {
      background-color: transparent;
      color: #3a91b5;
      font-size: 16px;
      border: none;
      cursor: pointer;
    }
     .dropdown-content {
    display: none;
    position: absolute;
    background-color: $blue;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
    a {
    color: $white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover{
      background-color: #f1f1f1;
      color:$DarkBlue;
    }
  }
  }
    }
.search-box{
  width: fit-content;
  height: fit-content;
  position: relative;
  .input-search{
  height: 40px;
  width: 40px;
  border-style: none;
  padding: 10px;
  font-size: 18px;
  letter-spacing: 2px;
  outline: none;
  border-radius: 25px;
  transition: all .5s ease-in-out;
  background-color: #8ad4dd;
  padding-right: 40px;
  color:#fff;
  &::placeholder{
  color:#3a91b5;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: 100;
}
&:focus{
  width: 100;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
}
.btn-search{
  width: 40px;
  height: 40px;
  border-style: none;
  font-size: 20px;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  position: absolute;
  right: 0px;
  color:#ffffff ;
  background-color:transparent;
  pointer-events: painted;  
  &:focus ~ .input-search{
  width: 100%;
  border-radius: 0px;
  background-color: transparent;
  border-bottom:1px solid rgba(255,255,255,.5);
  transition: all 500ms cubic-bezier(0, 0.110, 0.35, 2);
}
}
}

  }
  .Customer_Service{
    text-align: end;
    img,span{
      display: inline-block;  
    }
    img{
      margin-bottom: 30px;
    }
    h6{
      font-weight: bold;
    }
      @media (max-width: 767.98px) {
      text-align: center;
      img{
      margin-bottom: 0;
    }
  }
  }
}


</style>