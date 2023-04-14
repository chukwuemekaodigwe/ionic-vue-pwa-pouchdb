<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title> Products</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" slot="end" @click="router.push('/logout')">
            <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-searchbar placeholder="search by name, sku" v-model="searchkey" @ionChange="searchproducts()">
        </ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content fullscreen>
      <div id="containe">

        <ion-list>
          <ion-item button lines="full" v-for="product in products" :key="product._id">
            <ion-thumbnail slot="start" @click="viewProductImg(product._id)">
              <img
                :src="!product.imageData ? 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==' : product.imageData" />
            </ion-thumbnail>

            <ion-label class="ion-text-wrap" @click="viewProduct(product._id)">

              <h4> {{ product.name }} ({{ product.sku }})</h4>

              <ion-row>
                <ion-col class="separator" size-md="4" size-xs="12">

                  <small>Selling Price: {{ product.selling_price }}</small>
                </ion-col>
                <ion-col class="separator" size-md="4" size-xs="12">

                  <small> Cost Price: {{ product.cost_price }} </small>

                </ion-col>

              </ion-row>
            </ion-label>
            <ion-buttons>
              <ion-button fill="clear" slot="end" @click="editProduct(product._id)">
                <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
              </ion-button>
              <ion-button fill="clear" slot="end" @click="deleteProduct(product._id)">
                <ion-icon :icon="trashOutline" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-buttons>

          </ion-item>

        </ion-list>
      </div>


      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="primary" @click="addProduct()">
          <ion-icon :icon="add" size="3"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="success" @click="changePriceModal()">
          <ion-icon :icon="createOutline" size="3"></ion-icon>
        </ion-fab-button>


      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
//Number.NEGATIVE_INFINITY;
import {
  IonButtons,
  IonMenuButton,
  IonPage,
  IonList,
  IonItem,
  IonFab,
  IonContent,
  IonLabel,
  IonFabButton,
  IonHeader, IonText, IonSearchbar, IonThumbnail, IonIcon,
  IonTitle,
  IonToolbar, IonRow, modalController
} from "@ionic/vue";
import { add, trashOutline, informationCircleOutline, createOutline } from "ionicons/icons";
import { ref } from "vue";
import showModal from "./addProductModal.vue";
import { useActionSheet } from "../../helpers/useActionSheet"
import imageShow from "../../components/imageShowUp.vue";

//import axios from "axios";
import { useStore } from "vuex";
import { defaultState, IProduct } from "./store/state";
import { computed } from "@vue/reactivity";

export default {
  name: "ProductList",
  components: {

    IonButtons,
    IonContent,
    IonHeader, IonText, IonSearchbar, IonThumbnail, IonIcon,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar, IonRow,
    IonFab,
    IonFabButton,
    IonLabel,
    IonList,
    IonItem, imageShow
  },
  setup() {
    const store = useStore();

    const searchkey = ref('')
    const p = store.state.products.products
    const products = ref(p)
    //const products = reactive({...st})

    const addProduct = async () => {
      store.state.products.showCreateModal = true
      await productModal('New Product')

    }

   async function viewProductImg(id: string) {

    const product:IProduct = store.getters.getProductById(id)
      const modal = await modalController.create({
        component: imageShow,
        componentProps:{
          image: product.imageData,
          imgTitle: product.name
        },
        animated: true,
        id: 'product-image',
        
      });
      modal.present();
      
    }

    const editProduct = async (id: string) => {
      //console.log(id)
      let product = await store.getters.getProductById(id)
      store.state.products.showEditModal = true
      productModal(`Update ${product.name}`, product);

      //console.log(store.state.products)

    }

    const viewProduct = async (id: string) => {
      let product = await store.getters.getProductById(id)
      store.state.products.showProductModal = true

      productModal(product.name, product)

    }

    const deleteProduct = async (id: string) => {

      const role = await useActionSheet()
      if (role === 'confirm') {
        let product = await store.getters.getProductById(id)
        store.dispatch('actionDeleteProduct', product)

      }

    }

    const changePriceModal = () => {
      productModal('Update Product Price', defaultState, true)
    }

    const productModal = async function (title: string, product?: IProduct, change = false) {
      const modal = await modalController.create({
        component: showModal,
        componentProps: { title, product, change },
        animated: true,
        id: 'product-modal'
      });
      modal.present();
    }

    function searchproducts() {
      let search = searchkey.value
      if (search == '') {
        products.value = store.state.products.products
      } else {
        store.dispatch('searchProduct', search.toLowerCase()).then((a) => {
          products.value = JSON.parse(JSON.stringify(a))
        })
      }

    }
    return {
      changePriceModal,
      editProduct, addProduct, viewProductImg, viewProduct, deleteProduct, productModal,
      add, searchproducts, searchkey,
      createOutline, informationCircleOutline,
      trashOutline, products

    };
  },
};
</script>

<style>
.img-modal .alert-head {
  padding: 5px;
  text-align: center;
  color: transparent;
  background: #000;
  opacity: .5;
}

.img-modal .alert-wrapper {
  position: relative;

}

.img-modal .alert-message {
  padding: 0px;

  max-height: 300px;
}

.img-modal .alert-title {
  text-align: center;
  color: gold;

}

.img-modal .alert-button-group {
  padding: 0px;
  background-color: black;
}

.cont {
  display: flex;
  flex-flow: column nowrap;
  height: inherit;

}

.img-position {
  height: 250px;
  width: 100%;
}

.img-position ion-img {
  height: inherit;
}

.img-modal-footer {
  height: 50px;
  border-top: 1px solid gray;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;


}

.img-modal-footer ion-buttons {
  padding: 10px;
}

.separator {
  margin: 0 !important;
  padding: 1px !important;
  height: 20px;

}
</style>