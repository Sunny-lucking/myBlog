<template>
  <div id="app">
    <myheader></myheader>
    <router-view/>
    <myfooter></myfooter>
  </div>
</template>

<script>
    import myheader from "./components/public/header/Header"
    import myfooter from "./components/public/footer/Footer"
    export default {
        components:{myfooter,myheader}
    }
</script>
<style lang="scss">
  body{
    overflow-y: scroll!important;
    overflow-x: hidden;
  }
#app{

  width: 100%;
  height: 100%;
}
</style>
