<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
import axios from 'axios';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list: [],
            user: {},
            showForm:false,
            editMode:false,
            editingUserId: null
       }
   },
   created() {
    this.fetchUsers();
   },
   methods:{
    async fetchUsers(){
      try{
        const response = await axios.get('http://localhost:3000/api/users');
        this.list=response.data.body;
      }catch(error){
        console.log('Error al cargar Productos', error);
      }
    },
    async addUser(){
        try {
          await axios.post('http://localhost:3000/api/users', this.user);
          this.user = {};
          this.fetchUsers(); 
        }catch(error){
          console.error('Error al guardar usuario', error)
        }
    },
    async deleteUser(id) {
      try{
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        this.fetchUsers()
      }catch(error){
        console.error('Error al eliminar Usuario',error)
      }
    },
    editUser(user) {
      this.users = { ...user };
      this.showForm = true; 
    },
    async updateUsuario() {
    try {
      await axios.put(`http://localhost:3000/api/users/${this.user._id}`, this.user);
      this.fetchUsers();
      this.user = {};
      this.showForm = false; 
      this.fetchUsers(); 
    } catch (error) {
      console.error('Error al actualizar usuario', error);
    }
  },
  prepareEdit(user) {
      this.user = {...user}; 
      this.editMode = true;
      this.showForm = true;
    },
    saveProduct() {
      if (this.editMode) {
        this.updateUsuario();
      } else {
        this.addUser(); 
      }
    }, 
 }
}
</script>

<template>
  <ion-page>
    <ion-content class="scroll-content">
      <h2>Lista de Usuarios</h2>
      <ion-button @click="showForm = !showForm">Crear Usuario</ion-button>
      <div class="formshow" v-if="showForm">

      <div class="form-content">

          <div class="content-tittle">
            <h2>USUARIO</h2>
          </div>
          <ul class="content-input">

            <li>
              <div>
                <h4>Nombre</h4>
              </div>
              <div>
                  <ion-input v-model="user.nombre" placeholder="Nombre"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Apellido</h4>
              </div>
              <div>
                <ion-input v-model="user.apellido" placeholder="Apellido"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Rol</h4>
              </div>
              <div>
                <ion-input v-model="user.rol" placeholder="Rol"></ion-input>
              </div>
            </li>         
          </ul>
          <div class="content-button">
            <ion-button @click="saveProduct">Guardar</ion-button>
          </div>
        </div>
      </div>
      <Ion-list>
        <ion-item>
          <ion-label>Nombre</ion-label>
          <ion-label>Apellido</ion-label>
          <ion-label>Rol</ion-label>
          <ion-label>ㅤ</ion-label>
          <ion-label>ㅤ</ion-label>
          
        </ion-item>
        <ion-item v-for="e in list" :key="e._id">
          <ion-label>{{e.nombre}}</ion-label>
          <ion-label>{{e.apellido}}</ion-label>
          <ion-label>{{e.rol}}</ion-label>
          <ion-label><ion-button @click="prepareEdit(e)" color="primary">EDIT</ion-button></ion-label>
          <ion-label><ion-button @click="deleteUser(e._id)" color="danger">x</ion-button></ion-label>
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


.scroll-content .formshow {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.scroll-content .formshow .form-content .content-input{
  list-style: none;
  display: flex;
  flex-direction: row;
}

</style>
