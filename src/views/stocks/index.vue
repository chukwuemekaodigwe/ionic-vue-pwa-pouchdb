<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Stock Manager</ion-title>
      </ion-toolbar>

    </ion-header>

    <ion-content fullscreen>

      <ion-list>
        <ion-item-divider>
          <ion-label>
            View By:

            <ion-chip :outline="!isByTimeline" @click="byTimeline">Timeline</ion-chip>
            <ion-chip :outline="!isByLocation" @click="byLocation">Location</ion-chip>
            <ion-chip :outline="!isByProducts" @click="byProducts">Products</ion-chip>
          </ion-label></ion-item-divider>
        <ion-item button lines="full" v-for="product in products" :key="product._id">

          <ion-thumbnail slot="start" @click="viewProductImg(product.product_id)">
            <img :src="getProductDetail(product.product_id, 'imageData')" />
          </ion-thumbnail>

          <ion-label class="ion-text-wrap" @click="viewStock(product)">
            <ion-row>
              <ion-col size-md="4">
                <ion-text color="primary">
                  <h2> {{ getProductDetail(product.product_id, 'name') }} </h2>
                  <small class="ion-hide-sm-down"> {{ getProductDetail(product.product_id, 'sku') }}</small>
                </ion-text>

              </ion-col>
              <ion-col size-md="8">

                <ion-text :color="(product.quantity > 0) ? 'success' : 'danger'">
                  <p> <strong> {{ product.quantity }} {{ (product.quantity > 0) ? 'In Stock' : 'Out of Stock'
                  }}</strong></p>

                </ion-text>
                <small id=location v-if="!isByProducts">
                  @ {{ getLocationName(product.location_id) }}
                </small>
                <small v-else>
                  In {{ countLocation(product.locations) }} locations
                </small>
              </ion-col>
            </ion-row>

          </ion-label>

          <!-- <ion-icon :icon="add" slot="end" title="add more" @click="addStock()"></ion-icon> -->
          <ion-icon :icon="createOutline" title="Edit" slot="end" @click="editStock(product)"></ion-icon>
          <ion-icon v-if="isByTimeline" :icon="trashOutline" title="delete" slot="end" @click="deleteStock(product)"></ion-icon>
        </ion-item>

      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button color="success" id="transferStock">
          <ion-icon :icon="shareOutline" size="3"></ion-icon>
        </ion-fab-button>
        <ion-fab-button color="primary" @click="addStock()">
          <ion-icon :icon="add" size="3"></ion-icon>
        </ion-fab-button>

      </ion-fab>

    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">

import {
  IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenuButton,
  IonPage, IonTitle, IonRow, IonCol, IonIcon,
  IonToolbar, IonGrid, modalController
} from "@ionic/vue";
import { add, searchSharp, createOutline, shareOutline, sendSharp, trashOutline } from "ionicons/icons";
import addStockModal from "./stocksModal.vue"
import { useImageModal, useActionSheet } from "../../helpers/useActionSheet"
import { computed, onMounted, ref, reactive, inject, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { stockProductType, productsType } from "../../helpers/interfaces";
import { state } from "../products/store/state";
import imageShow from "../../components/imageShowUp.vue";

export default {
  name: "inventoryPage",
  components: {
    IonIcon,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonGrid,
    IonLabel,
    IonList,
    IonItem, IonCol, IonRow
  },

  setup() {
    const store = useStore()
    const search = false
    const isByProducts = ref(false)
    const isByLocation = ref(false)
    const isByTimeline = ref(true)

    const outlet: any = inject("routerOutlet");
    const products = ref(store.state.inventory.stocks)

    const byProducts = () => {
      isByProducts.value = true
      isByLocation.value = false
      isByTimeline.value = false
      return products.value = store.getters.loadStocksByProduct
    }


    const byLocation = () => {
      isByLocation.value = true
      isByProducts.value = false
      isByTimeline.value = false
       return products.value = store.getters.getStockByLocation
       //console.log(products)
    }


    const byTimeline = () => {
      isByLocation.value = false
      isByProducts.value = false
      isByTimeline.value = true
      return products.value = store.state.inventory.stocks
    }

    function countLocation(locations:[]){
      var uniqueArray = [...new Set(locations)]
      return uniqueArray.length
    }


    //console.log(products)
    function getLocationName(location_id: string) {
      const location = store.getters.getLocationById(location_id)
      if (location) return location.name
      else return 'Nama euejhdhjhfjhfh fbfhfjhfjhfjhjf djhdjjdhjdh'
    }

    const addStock = async () => {
      store.state.inventory.showCreateModal = true
      stockModal()
    }


    async function viewProductImg(id: string) {
      const product: productsType = store.getters.getProductById(id)
      const modal = await modalController.create({
        component: imageShow,
        componentProps: {
          image: product.imageData,
          imgTitle: product.name
        },
        animated: true,
        id: 'product-image',

      });
      modal.present();

    }

    const editStock = (product: stockProductType) => {
      let name = getProductDetail(product.product_id, 'name')

      store.state.inventory.showEditModal = true
      stockModal(`Update ${name}`, product);
    }

    const viewStock = (product: stockProductType) => {

      let name = getProductDetail(product.product_id, 'name')
      store.state.inventory.showProductModal = true
      stockModal(name.toUpperCase(), product)

    }

    function getProductDetail(id: string, item: string) {
      const product = store.getters.getProductById(id)
      if (item == 'sku') return product.sku
      if (item == 'imageData') return product.imageData
      if (item == 'name') return product.name
    }


    async function stockModal(title?, product?) {
      const top = (await modalController.getTop()) || outlet.value.$el;
      const modal = await modalController.create({
        component: addStockModal,
        componentProps: { pageTitle: title, stock_detail: product },
        animated: true,
        swipeToClose: true,
        presentingElement: top,
        id: 'main-modal'
      })

      modal.present()

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {

      }
    }

    function deleteStock(stock) {

      store.dispatch('deleteStock', stock)
    }

    onMounted(async () => {

      // //await store.dispatch('loadStock')
      // products.forEach(item => {

      //   const prod = store.getters.getProductById(item.product_id)


      //   item.prod = prod
      //   return item
      // })
      // console.log(store.state.inventory.stocks)



    })

    return {

      addStock, viewProductImg, editStock, viewStock,
      products, createOutline, getProductDetail, search, searchSharp,
      add, shareOutline, trashOutline, sendSharp, getLocationName, isByLocation, isByProducts,
      byLocation, byProducts, byTimeline, isByTimeline, countLocation, deleteStock
    }
  }
}


</script>

<style>
#location {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

ion-col {
  padding: 0px;
  margin: 0px
}
</style>