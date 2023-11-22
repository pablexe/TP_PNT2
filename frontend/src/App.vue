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
    <div class="header-list">
        <div class="img-content">
          <img src="./assets/iconnn.png" alt="">
        </div>
        <ul class="nav-content">
          <li><RouterLink to="/home">Home</RouterLink></li>
        <li><RouterLink to="/login" v-id="!estalogeado">Login</RouterLink></li>
        <li><RouterLink to="/users">Users</RouterLink></li>
        <li><RouterLink to="/product">Products</RouterLink></li>
        <li><RouterLink to="/system" v-if="estalogeado">System</RouterLink></li>
        </ul>

      </div>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style>

ion-header {
  display: flex;
  justify-content: end;
  align-items: center;
  text-decoration: none;
  }

  ion-header .header-list {
    padding: 0 1rem;
    display: flex;
    margin: 0;
    z-index: 100;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    list-style: none;
    height: 5vw;
    width: 100%;
    background-color: black;
    text-decoration: none;

  }
  ion-header .header-list .img-content {
    align-items: center;
  }

  ion-header .header-list .img-content img {
    width: 5vh;
    height: 5vh;
  }

  ion-header .header-list .nav-content {
    display: flex;
    flex-direction: row;
  }

  ion-header .header-list li {
    margin: 0 0.2rem;
    text-decoration: none;
  }

</style>
