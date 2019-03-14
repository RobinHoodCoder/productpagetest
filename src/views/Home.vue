<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
    <div class="wrapper">
      <ProductOverview/>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ProductOverview from "@/components/ProductOverview";

export default {
  name: "home",
  components: {
    // HelloWorld,
    ProductOverview
  }
};
</script>
