import {reactive} from "vue";

export const store = reactive({
  // proprietà che vogliamo rendere disponibili per tutta la nostra app

  // questa proprietà conterrà le carte in risposta dalla nostra chiamata api
  cards: [],
  
  isLoading: true,

});