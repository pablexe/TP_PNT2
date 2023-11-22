<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
import axios from 'axios';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list:[],
            product: {},
            showForm:false,
            editMode:false,
            editingListingId: null,
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
      this.fetchProducts();
      this.product = {};
      this.showForm = false; 
      this.fetchProducts(); 
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  },
  prepareEdit(product) {
      this.product = {...product}; 
      this.editMode = true;
      this.showForm = true;
    },
    saveProduct() {
      if (this.editMode) {
        this.updateProduct();
      } else {
        this.addProduct(); 
      }
    },
  }
}
</script>

<template>
  <ion-page>
    <ion-content class="scroll-content">
      <h2>Inventario de productos</h2>
      
      <ion-button @click="showForm = !showForm">Crear Productos</ion-button>
      <div v-if="showForm"  class="formshow">

      <div class="form-content">

          <div class="content-tittle">
            <h2>USUARIO</h2>
          </div>
          <ul class="content-input">

            <li>
              <div>
                <h4>SKU</h4>
              </div>
              <div>
                <ion-input v-model="product.sku" placeholder="SKU"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Descripcion</h4>
              </div>
              <div>
                <ion-input v-model="product.descripcion" placeholder="Descripcion"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Costo</h4>
              </div>
              <div>
                <ion-input v-model="product.costo" placeholder="Costo"></ion-input>
              </div>
            </li>     

            <li>
              <div>
                <h4>Categoria</h4>
              </div>
              <div>
                <ion-input v-model="product.categoria" placeholder="Categoria"></ion-input>
              </div>
            </li>   

            <li>
              <div>
                <h4>Marca</h4>
              </div>
              <div>
                <ion-input v-model="product.marca" placeholder="Marca"></ion-input>
              </div>
            </li>   
            
            <li>
              <div>
                <h4>Importado</h4>
              </div>
              <div>
                <ion-input v-model="product.importado" placeholder="Importado"></ion-input>
              </div>
            </li>   


            <li>
              <div>
                <h4>Stock Disponible</h4>
              </div>
              <div>
                <ion-input v-model="product.stock_disponible" placeholder="Stock Disp.e"></ion-input>
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
          <ion-label>SKU</ion-label>
          <ion-label>Descripción</ion-label>
          <ion-label>Costo</ion-label>
          <ion-label>Categoria</ion-label>
          <ion-label>Marca</ion-label>
          <ion-label>Importado</ion-label>
          <ion-label>Stock Disponible</ion-label>
          <ion-label></ion-label>
          <ion-label></ion-label>
        </ion-item>
        <ion-item v-for="e in list" :key="e._id">
          <ion-label>{{e.sku}}</ion-label>
          <ion-label>{{e.descripcion}}</ion-label>
          <ion-label>{{e.costo}}</ion-label>
          <ion-label>{{e.categoria}}</ion-label>
          <ion-label>{{e.marca}}</ion-label>
          <ion-label>{{e.importado}}</ion-label>
          <ion-label>{{e.stock_disponible}}</ion-label>
          <ion-label><ion-button @click="prepareEdit(e)" color="primary">EDIT</ion-button></ion-label>
          <ion-label><ion-button  @click="deleteProduct(e._id)" color="danger">x</ion-button></ion-label>
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

.scroll-content .formshow .form-content {
  align-items: center;
  text-align: center;
padding: 2rem;
border: solid;
}

.scroll-content .formshow .form-content .content-input{
  list-style: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
