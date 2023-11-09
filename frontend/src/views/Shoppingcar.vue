<script>
import { IonPage, IonContent} from '@ionic/vue'
import { storeToRefs } from 'pinia';
import { useShoppingStore } from '../stores/shoppingcar';
export default{
  components: {IonPage,IonContent},
  setup(){
    const store = useShoppingStore();
    const {addToCar, getProducts,getLenghtPoducts} = storeToRefs(store);
    return {addToCar, getProducts, getLenghtPoducts};
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
    <h2>Shopping Car</h2>
    {{ getProducts }}
    Cantidad: {{ getLenghtPoducts }}
    </ion-content>
  </ion-page>
</template>

<style>
</style>