<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import axios from 'axios'
export default{
  components: {IonPage,IonContent,IonList,IonInput,IonButton},
  data(){
        return{
            lista: [],
            person: {},
            mensajeError:''
       }
   },
   methods:{
    /*addName(){
        this.lista.push({...this.person})
        this.person={}
    },*/
    async loadData() {
      try{
        const response = await axios.get('http://localhost:3000/lista')
        this.lista = response.data
      }catch(e){
        this.mensajeError="Se produjo un error"
      }
    },
    async saveData() {
      try{
        await axios.post('http://localhost:3000/lista',this.person)
        await this.loadData()
      }catch(e){
        this.mensajeError="Se produjo un error"
      }
    },
    async deleteData(id) {
      try{
        await axios.delete('http://localhost:3000/lista/'+id)
        await this.loadData()
      }catch(e){
        this.mensajeError="Se produjo un error"
      }
    },
    async putData(id) {
      try{
        await axios.put('http://localhost:3000/lista/'+id,this.person)
        await this.loadData()
      }catch(e){
        this.mensajeError="Se produjo un error"
      }
    }
   }
}
</script>

<template>
  <ion-page>
    <ion-content>
        <h2>System</h2>
        <Ion-list v-for="e in lista" :key="e.id">
            {{e.id}} {{e.name}}
            <ion-button @click="deleteData(e.id)"> Borrar</ion-button>
        </Ion-list>
            <ion-input v-model="person.id" label="id" placeholder="ingrese un id">  </ion-input>
            <ion-input v-model="person.name" label="nombre" placeholder="ingrese un nombre"> </ion-input>
            <ion-button @click="saveData"> Agregar</ion-button>
            <ion-button @click="loadData"> Traer Datos</ion-button><bt/>
            <ion-button @click="putData(e.id)"> Remplazar</ion-button>
            {{ mensajeError }}
    </ion-content>
  </ion-page>
</template>

<style>
</style>