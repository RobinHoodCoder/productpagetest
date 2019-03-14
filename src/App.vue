<template>
  <div id="app">
    <Navbar/>
    <router-view />
  </div>
</template>

<style lang="scss">
  /*@import './assets/css/bootstrap.css';*/
  @import './assets/vendors/vendorscss.min.css';
  @import './assets/styles/bootstrap.scss';


</style>
<script>
  import Navbar from "@/components/TheNavbar";

  export default {
    components: {Navbar}
  }
</script>