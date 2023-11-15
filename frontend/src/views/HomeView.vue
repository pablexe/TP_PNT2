<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
import axios from 'axios';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list: [],
            listings: {},
            showForm:false
       }
   },
   created() {
    this.fetchListings();
   },
   methods:{
    async fetchListings(){
      try{
        const response = await axios.get('http://localhost:3000/api/listings');
        this.list=response.data.body;
      }catch(error){
        console.log('Error al cargar Productos', error);
      }
    },
    async addListing(){
        try {
          await axios.post('http://localhost:3000/api/listings', this.listings);
          this.listings = {};
          this.fetchListings(); 
        }catch(error){
          console.error('Error al guardar publicacion', error)
        }
    },
    async deleteListing(id) {
      try{
        await axios.delete(`http://localhost:3000/api/listings/${id}`);
        this.fetchListings()
      }catch(error){
        console.error('Error al eliminar producto',error)
      }
    },
    async updateListing() {
    try {
      await axios.put(`http://localhost:3000/api/listings/${this.listings._id}`, this.listings);
      this.listings = {};
      this.showForm = false; 
      this.fetchListings(); 
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  },
  }
  
}
</script>

<template>
  <div class="list-container">
  <ion-page>
    <ion-content>
      <h2>Nuestras Publicaciones </h2>
      <ion-button @click="showForm = !showForm">Crear Publicacion</ion-button>
      <div v-if="showForm">
        <ion-input v-model="listings.title" placeholder="title"></ion-input>
        <ion-input v-model="listings.category_id" placeholder="category_id"></ion-input>
        <ion-input v-model="listings.price" placeholder="price"></ion-input>
        <ion-input v-model="listings.base_price" placeholder="base_price"></ion-input>
        <ion-input v-model="listings.imagen" placeholder="imagen"></ion-input>
        <ion-input v-model="listings.condition" placeholder="condition"></ion-input>
        <ion-input v-model="listings.status" placeholder="stock_disponible"></ion-input>
        <ion-input v-model="listings.sku" placeholder="sku"></ion-input>
        <ion-input v-model="listings.product_cost" placeholder="product_cost"></ion-input>
        <ion-input v-model="listings.margin" placeholder="margin"></ion-input>
        <ion-input v-model="listings.sale_fee" placeholder="sale_fee"></ion-input>
        <ion-input v-model="listings.shipping_cost" placeholder="shipping_cost"></ion-input>
        <ion-button @click="addListing">Guardar</ion-button>
      </div>
      <Ion-list>
        <ion-item>
          <div class="item-header">
            <ion-label>title</ion-label>
            <ion-label>category_id</ion-label>
            <ion-label>price</ion-label>
            <ion-label>base_price</ion-label>
            <ion-label>imagen</ion-label>
            <ion-label>condition</ion-label>
            <ion-label>status</ion-label>
            <ion-label>sku</ion-label>
            <ion-label>product_cost</ion-label>
            <ion-label>margin</ion-label>
            <ion-label>sale_fee</ion-label>
            <ion-label>shipping_cost</ion-label>
        </div>
        </ion-item>
        <ion-item v-for="e in list" :key="e._id">
          <div class="item-header">
            <ion-label>{{e.title}}</ion-label>
            <ion-label>{{e.category_id}}</ion-label>
            <ion-label>{{e.price}}</ion-label>
            <ion-label>{{e.base_price}}</ion-label>
            <ion-img :src="e.imagen" alt="imagen del producto"></ion-img>
            <ion-label>{{e.condition}}</ion-label>
            <ion-label>{{e.status}}</ion-label>
            <ion-label>{{e.sku}}</ion-label>
            <ion-label>{{e.product_cost}}</ion-label>
            <ion-label>{{e.margin}}</ion-label>
            <ion-label>{{e.sale_fee}}</ion-label>
            <ion-label>{{e.shipping_cost}}</ion-label>
          </div>
          <ion-button @click="editItem(e)">Editar</ion-button>
          <ion-button @click="deleteListing(e.id)" color="danger">Borrar</ion-button>
        </ion-item>    
      </ion-list>
    
    </ion-content>
  </ion-page>
  </div>  

</template>
    


<style>

ion-list {
  display: flex;
  flex-direction: column;
}

.item-header {
  display: flex;
  justify-content: space-between;
  background-color: #eaeaea;
  padding: 10px;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}


.item-header > ion-label,
.item-content > ion-label 
.item-content > ion-img {
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
  padding:8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.item-header > ion-label:nth-child(1),
.item-content > ion-label:nth-child(1) {
  flex: 4; /* ID */
}
.item-header > ion-label:nth-child(2),
.item-content > ion-label:nth-child(2) {
  flex: 5; /* Título */
}
.item-header > ion-label:nth-child(3),
.item-content > ion-label:nth-child(3) {
  flex: 5; /* Categoría */
}

.item-header:first-child,
.item-content:last-child {
  border-radius: 10px;
}

.item-content > ion-img {
  flex: 0 0 50px; /* Ancho fijo para la imagen */
  height: auto; /* Altura automática para mantener la proporción */
}

.list-container {
  border: 1px solid #ccc; /* Añade un borde */
  border-radius: 10px; /* Bordes redondeados */
  overflow: hidden; /* Esto asegura que el contenido no se desborde de las esquinas redondeadas */
}

ion-page {
  --ion-background-color: #f4f4f4;
  --ion-text-color: #333;
}

h2 {
  color: #222;
  font-size: 1.5em;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

ion-content {
  --padding-start: 20px;
  --padding-end: 20px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-input {
  --padding: 10px;
  --border-radius: 4px;
  --background: #ffffff;
  --border: 1px solid #ddd;
  margin-bottom: 10px;
}

ion-button {
  margin-top: 10px;
  --background: #007bff;
  --border-radius: 4px;
}

ion-list {
  border-top: 1px solid #ddd;
}

ion-item {
  --background: #ffffff;
  --border-bottom: 1px solid #ddd;
  --min-height: 50px;
  display: flex;
  align-items: center;
}

ion-label {
  color: #555;
  padding-right: 10px;
}

ion-img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

/* Botones de acción */
ion-button {
  margin-left: 10px;
}

/* Estilo específico para botones de peligro/eliminación */
ion-button[color="danger"] {
  --background: #dc3545;
}
</style>



