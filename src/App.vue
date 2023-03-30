<script>
import {store} from "./store.js";
import axios from "axios";

import AppMain from "./components/AppMain.vue";
import AppLoader from "./components/AppLoader.vue";
import AppSearch from "./components/AppSearch.vue";
import CardsCounter from "./components/CardsCounter.vue";
export default {
  data() {
    return {
      store,
    }
  },

  components: {
    AppMain,
    AppLoader,
    AppSearch,
    CardsCounter,
  },

  created() {

    // facciamo la chiamata api
    this.executeAPIquery('');


  },

  computed: {

    // le computed vengono scritte come funzioni, ma sono delle proprietà.
    // OGNI computed DEVE avere un return.
    cardsCount() {
      // mi restituirà il numero di carte che abbiamo nell'array
      return this.store.cards.length;
    },

  },

  methods: {

    searchName() {
      this.store.isLoading = true;

      // alert(this.store.cardNameSearch);

      // predisponiamo il parametro da aggiungere
      if(this.store.cardNameSearch != "") {
        // creiamo una variabile dove costruiremo la stringa dei parametri di ricerca
        let newParameters = "&fname=" + this.store.cardNameSearch;

        console.log(newParameters);
        
        // faccio di nuovo una chiamata api
        this.executeAPIquery(newParameters);

      } else {

        this.executeAPIquery('');

      }


    },


    executeAPIquery(newParameters) {

      axios.get(this.store.APIbaseSearch + newParameters).then((response) => {

        this.store.cards = response.data.data;
        this.store.isLoading = false;
        

      }).catch((err) => { // "afferro" l'errore ed eseguo del codice con esso

        if(err.response.status == 400) {

          // rendere l'array delle carte vuoto
          this.store.cards = [];

          // settare che lo stato dell'applicazione non è più in loading
          this.store.isLoading = false;
          
        } else {
          alert("Errore: " + err.response.statusText);
        }


      });

    },

    

  },
}
</script>

<template>
  <!-- footer -->
  <!-- <AppLoader v-if="!store.cards.length > 0"></AppLoader> -->
  <AppLoader v-if="store.isLoading"></AppLoader>

  <AppSearch @userSearch="searchName()"></AppSearch>

  <CardsCounter :cardsNumber="cardsCount"></CardsCounter>

  <div>

    <AppMain></AppMain>


  </div>
</template>

<style lang="scss" scoped>

</style>
