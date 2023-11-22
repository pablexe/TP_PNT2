<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
import axios from 'axios';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list:[],
            product: {},
            showForm:false
       }
   },
   created() {
    this.fetchProducts();
  },
   methods:{
    async fetchProducts(){
      try{
        const response = await axios.get('http://localhost:3000/api/products');
        this.list=response.data.body;
      }catch(error){
        console.log('Error al cargar Productos', error);
      }
    },
    async addProduct(){
        try {
          await axios.post('http://localhost:3000/api/products', this.product);
          this.product = {};
          this.fetchProducts(); 
        }catch(error){
          console.error('Error al guardar producto', error)
        }
    },
    async deleteProduct(id) {
      try{
        await axios.delete(`http://localhost:3000/api/products/${id}`);
        this.fetchProducts()
      }catch(error){
        console.error('Error al eliminar producto',error)
      }
    },
    async updateProduct() {
    try {
      await axios.put(`http://localhost:3000/api/products/${this.product._id}`, this.product);
      this.product = {};
      this.showForm = false; 
      this.fetchProducts(); 
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  },
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Inventario de productos</h2>
      
      <ion-button @click="showForm = !showForm">Crear Productos</ion-button>
      <div v-if="showForm">
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
          <ion-label>sku</ion-label>
          <ion-label>descripcion</ion-label>
          <ion-label>costo</ion-label>
          <ion-label>categoria</ion-label>
          <ion-label>marca</ion-label>
          <ion-label>importado</ion-label>
          <ion-label>stock_disponible</ion-label>
        </ion-item>
        <ion-item v-for="e in list" :key="e._id">
          <ion-label>{{e.sku}}</ion-label>
          <ion-label>{{e.descripcion}}</ion-label>
          <ion-label>{{e.costo}}</ion-label>
          <ion-label>{{e.categoria}}</ion-label>
          <ion-label>{{e.marca}}</ion-label>
          <ion-label>{{e.importado}}</ion-label>
          <ion-label>{{e.stock_disponible}}</ion-label>
          <ion-button @click="deleteProduct(e._id)" color="danger">X</ion-button>
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
