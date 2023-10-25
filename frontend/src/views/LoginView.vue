<script>
import { IonPage, IonContent,IonInput,IonButton,IonLabel, IonItem, IonAlert} from '@ionic/vue'
import { storeToRefs } from 'pinia';
import { loginStore } from "../stores/userStore"
import router from '../router';

export default {
  components: {IonPage,IonContent,IonInput,IonButton,IonLabel,IonItem,IonAlert},
  setup(){
    const store = loginStore;
    const {estaLogeado}  =storeToRefs(store);
    const {login} = store;
    return {login,estaLogeado};
  },
  data(){
    return {
        user:{},
        errorMesasge:''
    }
  },
  methods:{
    async loginForm(){
      try{
        await this.login(this.user);
        if(this.estaLogeado){
            this.$router.push("/system")
        }else {
            router.push("/system")
        }
      }catch (error){
        this.errorMesasge ='Erro al iniciar sesion. Por favor intente nuevamente';
      }
    },
    RegisterForm(){
      this.$router.push('/register')
  }

  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <div class="content-wrapper">
      <div class="login-container">
        <img src="@/assets/logo2.png" alt="Logo" class="login-logo">
        <h5>Login</h5>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input v-model="user.email" type="email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="user.password" type="password"></ion-input>
        </ion-item>
        <ion-button expand="full" @click="loginForm">Login</ion-button>
        <p>No estás Registrado? <a @click="RegisterForm">Registrate!</a></p>
        <ion-alert
           :is-open="!!errorMessage"
            @did-dismiss="() => errorMessage = ''"
            header="Error"
            :message="errorMessage"
            :buttons="['OK']"
        ></ion-alert>
      </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style>


.content-wrapper{
  display: flex;
  justify-content: center;
  align-items: center ;
  height: 100%;
  width: 100%;
}

.login-container{
  transform: translateY(-100px);
  max-width: 400px;
  width: 100%;
  margin:auto;
  text-align: center;
}
.login-logo{
  width: 450px;
  margin: 0 auto 20px;
  display: block;
}

a {
  color: #007bff; 
  text-decoration: none;
  cursor: pointer;
}

a:hover {
  text-decoration: underline; 
}

</style>

