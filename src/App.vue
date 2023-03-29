<script>
import {store} from "./store.js";
import axios from "axios";

import AppMain from "./components/AppMain.vue";
import AppLoader from "./components/AppLoader.vue";
export default {
  data() {
    return {

      store,
    }
  },

  components: {
    AppMain,
    AppLoader
  },

  created() {

    // facciamo la chiamata api
    axios.get("https://db.ygoprodeck.com/api/v7/cardinfo.php?num=200&offset=0").then((response) => {
      
      console.log(response.data.data);
      this.store.cards = response.data.data;

      this.store.isLoading = false;

    });


  },
}
</script>

<template>
  <!-- footer -->
  <!-- <AppLoader v-if="!store.cards.length > 0"></AppLoader> -->
  <AppLoader v-if="store.isLoading"></AppLoader>

  <div>

    <AppMain></AppMain>


  </div>
</template>

<style lang="scss" scoped>

</style>
