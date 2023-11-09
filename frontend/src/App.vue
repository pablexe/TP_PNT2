<script>
import { RouterLink, RouterView } from 'vue-router'
import {IonApp,IonRouterOutlet, IonHeader} from '@ionic/vue'
import { storeToRefs } from 'pinia';
import { useShoppingStore } from '../src/stores/shoppingcar';
import { loginStore } from './stores/userStore';
export default { 
  components:{IonApp, IonRouterOutlet, IonHeader},
  setup(){
    const store = useShoppingStore();
    const {addToCar, getProducts,getLenghtPoducts} = storeToRefs(store);
    const store1 = loginStore();
    const {usuario,estalogeado} = storeToRefs(store1);
    const {logout} = store1;
    return {addToCar, getProducts, getLenghtPoducts,usuario,estalogeado};
  }
}
</script>

<template>
  <ion-app>
    <ion-header>
        <RouterLink to="/">Home | </RouterLink>
        <RouterLink to="/login" v-id="!estalogeado">Login  |</RouterLink>
        <RouterLink to="/about">About | </RouterLink>
        <RouterLink to="/users">Users | </RouterLink>
        <RouterLink to="/product">Products | </RouterLink>
        <RouterLink to="/system" v-if="estalogeado">System | </RouterLink>
        <RouterLink to="/shopping">Shopping (Cantidad: {{ getLenghtPoducts }}) | </RouterLink>
        user {{ this.usuario.email }}
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style>
</style>
