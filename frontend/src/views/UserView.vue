<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            lista: [{id:100,Nombre:'Charly',apellido:'Zaraza',rol:'Admin'},
                    {id:101,Nombre:'Fulano',apellido:'Lopez',rol:'Operador'}],
            person: {},
            showForm:false
       }
   },
   methods:{
    addName(){
        this.lista.push({...this.person})
        this.person={}
    },
    deleteUser(id) {
      this.lista = this.lista.filter(user => user.id !== id);
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Lista de Usuarios</h2>
      <ion-button @click="showForm = !showForm">Crear Usuario</ion-button>
      <div v-if="showForm">
        <ion-input v-model="person.id" placeholder="ID"></ion-input>
        <ion-input v-model="person.Nombre" placeholder="Nombre"></ion-input>
        <ion-input v-model="person.apellido" placeholder="Apellido"></ion-input>
        <ion-input v-model="person.rol" placeholder="Rol"></ion-input>
        <ion-button @click="addName">Guardar</ion-button>
      </div>
      <Ion-list>
        <ion-item>
          <ion-label>ID</ion-label>
          <ion-label>Nombre</ion-label>
          <ion-label>Apellido</ion-label>
          <ion-label>Rol</ion-label>
        </ion-item>
        <ion-item v-for="e in lista" :key="e.id">
          <ion-label>{{e.id}}</ion-label>
          <ion-label>{{e.Nombre}}</ion-label>
          <ion-label>{{e.apellido}}</ion-label>
          <ion-label>{{e.rol}}</ion-label>
          <ion-button @click="editUser(e)">Editar</ion-button>
          <ion-button @click="deleteUser(e.id)" color="danger">Borrar</ion-button>
        </ion-item>    
      </ion-list>
      <div class="return-button">
        <router-link to="/home">
           <ion-button>Volver</ion-button>
        </router-link>
      </div>
    </ion-content>
  </ion-page>
</template>
    


<style>

</style>
