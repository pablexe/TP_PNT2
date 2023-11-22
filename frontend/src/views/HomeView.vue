<script>
import { IonPage,IonContent, IonList, IonInput, IonButton,IonItem,IonIcon } from '@ionic/vue';
import axios from 'axios';
export default {
  components: { IonPage,IonContent, IonList, IonInput, IonButton,IonIcon },
data(){
        return{
            list: [],
            listings: {},
            showForm:false,
            editMode:false,
            editingListingId: null,
            price: '0',
            base_price: '0'
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
      this.fetchListings()
      this.listings = {};
      this.editMode = false;
      this.showForm = false; 
    } catch (error) {
      console.error('Error al actualizar producto', error);
    }
  },
  prepareEdit(listing) {
      this.listings = {...listing}; 
      this.editMode = true;
      this.showForm = true;
    },
    saveListing() {
      if (this.editMode) {
        this.updateListing();
        this.fetchListings(); 
      } else {
        this.addListing();
        this.fetchListings(); 
      }
    },
    validatePriceInput() {
      this.listings.price = this.listings.price.replace(/\D/g, '');
      if (this.listings.price !== '' && parseInt(this.listings.price, 10) < 0) {
        this.listings.price = '';
      }
  },
  validateBasePriceInput() {
      this.listings.base_price = this.listings.base_price.replace(/\D/g, '');
      if (this.listings.base_price !== '' && parseInt(this.listings.base_price, 10) < 0) {
        this.listings.base_price = '';
      }
  }



}
}


</script>

<template>


  
  <div class="list-container">
  <ion-page>

    <ion-content class="scroll-content">
      <h2>Nuestras Publicaciones </h2>
      <ion-button @click="showForm = !showForm">Crear Publicacion</ion-button>

      <div class="formshow" v-if="showForm">

        <div class="form-content">

          <div class="content-tittle">
            <h2>PRODUCTO</h2>
          </div>
          <ul class="content-input">

            <li>
              <div>
                <h4>TITULO</h4>
              </div>
              <div>
                <ion-input v-model="listings.title" placeholder="Titulo"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Categoria</h4>
              </div>
              <div>
                <ion-input v-model="listings.category_id" placeholder="Categoria"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Precio</h4>
              </div>
              <div>
                <ion-input v-model="listings.price" placeholder="Precio" type="number" inputmode="numeric"
  pattern="\d*" @input="validatePriceInput"></ion-input>
              </div>
            </li>
            <li>
              <div>
                <h4>Precio Base</h4>
              </div>
              <div>
                <ion-input v-model="listings.base_price" placeholder="Precio Base" type="number" inputmode="numeric"
  pattern="\d*" @input="validateBasePriceInput"></ion-input>
              </div>
            </li>

         <!-- <ul class="form-content"> -->

            <li>
              <div>
                <h4>Link Imagen URL</h4>
              </div>
              <div>
                <ion-input v-model="listings.imagen" placeholder="Imagen"></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>Condicion</h4>
              </div>
              <div>
                <ion-input v-model="listings.condition" placeholder="Condition"></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>Stock Disponible</h4>
              </div>
              <div>
                <ion-input v-model="listings.status" placeholder="Stock Disp."></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>SKU</h4>
              </div>
              <div>
                <ion-input v-model="listings.sku" placeholder="SKU"></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>Costo de Producto</h4>
              </div>
              <div>
                <ion-input v-model="listings.product_cost" placeholder="Producto Cost"></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>Margin</h4>
              </div>
              <div>
                <ion-input v-model="listings.margin" placeholder="Margin"></ion-input>
              </div>
            </li>

            <li>
              <div>
                <h4>Sale Free</h4>
              </div>
              <div>
                <ion-input v-model="listings.sale_fee" placeholder="Sale Free"></ion-input>
              </div>
            </li>
            
            <li>
              <div>
                <h4>Shipping Cost</h4>
              </div>
              <div>
                <ion-input v-model="listings.shipping_cost" placeholder="Shipping Cost"></ion-input>
              </div>
            </li>
            
          
          </ul>
          <div class="content-button">
            <ion-button @click="saveListing">Guardar</ion-button>
          </div>

        </div>



        <!-- <ul class="form-content">
          <li> <h1></h1> <ion-input v-model="listings.title" placeholder="Titulo"></ion-input>
        <ion-input v-model="listings.category_id" placeholder="Categoria"></ion-input></li>
            <li>
              <ion-input v-model="listings.price" placeholder="Precio"></ion-input>
        <ion-input v-model="listings.base_price" placeholder="Precio Base"></ion-input>
            </li>
        <li>
          <ion-input v-model="listings.imagen" placeholder="Imagen"></ion-input>
        <ion-input v-model="listings.condition" placeholder="Condition"></ion-input>
        </li>
        <li>
          <ion-input v-model="listings.status" placeholder="Stock Disp."></ion-input>
        <ion-input v-model="listings.sku" placeholder="SKU"></ion-input>
        </li>
        <li>
          <ion-input v-model="listings.product_cost" placeholder="Producto Cost"></ion-input>
        <ion-input v-model="listings.margin" placeholder="Margin"></ion-input>
        </li>
       <li>
        <ion-input v-model="listings.sale_fee" placeholder="Sale Fee"></ion-input>
        <ion-input v-model="listings.shipping_cost" placeholder="Shipping Cost"></ion-input>
       </li>
       <ion-button @click="saveListing">Guardar</ion-button>

      </ul>
         -->

      </div>
      <Ion-list>
        <ion-item>
          <div class="item-header">
            <ion-label>Título</ion-label>
            <ion-label>Categoria</ion-label>
            <ion-label>Precio</ion-label>
            <ion-label>Precio Base</ion-label>
            <ion-label>Img</ion-label>
            <ion-label>Condición</ion-label>
            <ion-label>Stock</ion-label>
            <ion-label>SKU</ion-label>
            <ion-label>Costo del Producto</ion-label>
            <ion-label>Margen</ion-label>
            <ion-label>Comisión</ion-label>
            <ion-label>Costo del Envío</ion-label>
            <ion-label>ㅤ      </ion-label>
            <ion-label>ㅤ      </ion-label>
        </div>
        </ion-item>
        <div class="content-list">
          <ion-item v-for="e in list" :key="e._id">
          <div class="item-header">
            <ion-label>{{e.title}}</ion-label>
            <ion-label>{{e.category_id}}</ion-label>
            <ion-label>{{ e.price | currencyFormat }}</ion-label>
            <ion-label>{{e.base_price}}</ion-label>
            <ion-img :src="e.imagen" alt="imagen del producto"></ion-img>
            <ion-label>{{e.condition}}</ion-label>
            <ion-label>{{e.status}}</ion-label>
            <ion-label>{{e.sku}}</ion-label>
            <ion-label>{{e.product_cost}}</ion-label>
            <ion-label>{{e.margin}}</ion-label>
            <ion-label>{{e.sale_fee}}</ion-label>
            <ion-label>{{e.shipping_cost}}</ion-label>
            <ion-label><ion-button @click="prepareEdit(e)" color="primary">EDIT</ion-button></ion-label>
            <ion-label><ion-button @click="deleteListing(e._id)" color="danger">x</ion-button></ion-label>
          </div>
        </ion-item>    
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
  </div>  
  
<ion-alert trigger="present-alert" header="Alert!"></ion-alert>

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
.scroll-content .formshow .form-content .content-input li{
  flex: 1 1 calc(50% - 20px);
}


ion-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.item-header {
  display: flex;
  justify-content: space-between;
  background-color: #eaeaea;
  padding: 10px;
  width: 100%;
  font-size: 12px;
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000000;
  padding: 10px;
}


.item-header > ion-label,
.item-content > ion-label 
.item-content > ion-img {
  text-align: center;
  align-items: center;
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
  flex-grow: 1;
  flex-basis: 0;
}
.item-header > ion-label:nth-child(3),
.item-content > ion-label:nth-child(3) {
  flex: 5; /* Categoría */
  flex-grow: 1;
  flex-basis: 0;
}

.item-header:first-child,
.item-content:last-child {
  border-radius: 10px;
}

.item-content > ion-img {
  flex: 0 0 50px; /* Ancho fijo para la imagen */
  height: auto; /* Altura automática para mantener la proporción */
  flex-grow: 1;
  flex-basis: 0;
}

.list-container {
  border: 1px solid #000000; /* Añade un borde */
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



