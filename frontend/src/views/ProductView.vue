<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list: [{id:100,sku:'Charly',descripcion:'Zaraza', costo:'Admin',categoria:'M', marca:'XXX',importado:'',stock_disponible:''},
                    {id:101,sku:'Fulano',descripcion:'Lopez', costo:'Operador',categoria:'M',marca:'XXX',importado:'',stock_disponible:''}],
            product: {},
            showForm:false
       }
   },
   methods:{
    addProduct(){
        this.lista.push({...this.product})
        this.product={}
    },
    deleteProduct(id) {
      this.list = this.lista.filter(product => product.id !== id);
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Inventario de productos</h2>
      <ion-button @click="showForm = !showForm">Crear Productos</ion-button>
      <div v-if="showForm">
        <ion-input v-model="product.id" placeholder="ID"></ion-input>
        <ion-input v-model="product.sku" placeholder="sku"></ion-input>
        <ion-input v-model="product.descripcion" placeholder="descripcion"></ion-input>
        <ion-input v-model="product.costo" placeholder="costo"></ion-input>
        <ion-input v-model="product.categoria" placeholder="categoria"></ion-input>
        <ion-input v-model="product.marca" placeholder="marca"></ion-input>
        <ion-input v-model="product.importado" placeholder="importado"></ion-input>
        <ion-input v-model="product.stock_disponible" placeholder="stock_disponible"></ion-input>
        <ion-button @click="addProduct">Guardar</ion-button>
      </div>
      <Ion-list>
        <ion-item>
          <ion-label>ID</ion-label>
          <ion-label>sku</ion-label>
          <ion-label>descripcion</ion-label>
          <ion-label>costo</ion-label>
          <ion-label>categoria</ion-label>
          <ion-label>marca</ion-label>
          <ion-label>importado</ion-label>
          <ion-label>stock_disponible</ion-label>
        </ion-item>
        <ion-item v-for="e in list" :key="e.id">
          <ion-label>{{e.id}}</ion-label>
          <ion-label>{{e.sku}}</ion-label>
          <ion-label>{{e.descripcion}}</ion-label>
          <ion-label>{{e.costo}}</ion-label>
          <ion-label>{{e.categoria}}</ion-label>
          <ion-label>{{e.marca}}</ion-label>
          <ion-label>{{e.importado}}</ion-label>
          <ion-label>{{e.stock_disponible}}</ion-label>
          <ion-button @click="editProduct(e)">Editar</ion-button>
          <ion-button @click="deleteProduct(e.id)" color="danger">Borrar</ion-button>
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
