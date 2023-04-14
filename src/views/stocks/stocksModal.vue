<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="cancel()">
            <ion-icon class="modal-button" size="medium" :icon="arrowBackSharp"></ion-icon>
            <ion-back-button></ion-back-button>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ pageTitle }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button color="success" @click="confirm()">
            <ion-icon :icon="checkmarkDoneOutline" size="medium"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>

    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>

        <product-search @product-selected="changeImage" :is-disabled="readonly"></product-search>
      </ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size-md="4" size-xs="12"
            style="height: fit-content; display: flex; flex-flow: column nowrap; width: 300px;">
            <ion-img :src="image"></ion-img>
          </ion-col>

          <ion-col size-md="8" size-xs="12">
            <ion-row>
              <ion-col size=12>
                <ion-item>
                  <ion-label position="stacked">Stock Quantity</ion-label>
                  <ion-input type="number" v-model="form.quantity"></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size=12>
                <ion-item>
                  <ion-label position="stacked">Initial Location</ion-label>

                  <ion-select v-model="form.location_id">

                    <ion-select-option v-for="location in locations" :key="location._id"> {{
                      location.name.toUpperCase()
                    }}</ion-select-option>
                  </ion-select>
                  <ion-button @click="change_location()">Add New Location</ion-button>

                </ion-item>
              </ion-col>
            </ion-row>

          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>

</template>

<script lang="ts">
import {
  IonButtons,
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonItem,
  IonInput, IonImg, IonSelect, IonGrid, IonCol, IonRow,
  IonLabel, actionSheetController, modalController
} from "@ionic/vue";
import { closeOutline, checkmarkDoneOutline, arrowBackSharp } from "ionicons/icons";
import productSearch from "../../components/useProductSearchModal.vue";
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { useStore } from 'vuex';
import { computed } from "@vue/reactivity";
import stockMgr from "./stocksService";
import { stockProductType, stocksType, productsType } from '../../helpers/interfaces'


export default defineComponent({
  name: 'addStock',
  inheritAttrs: false,
  components: {
    IonButtons,
    IonButton,
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem, IonImg, IonSelect, IonGrid, IonCol, IonRow,
    IonInput, modalController,
    IonLabel, productSearch
  },
  props: {
    pageTitle: {

      type: String,
      default: 'New Stock'
    },

    stock_detail: {

    }
  },

  setup(props) {
    const store = useStore();
    const readonly = computed(() => store.state.inventory.showEditModal || store.state.inventory.showProductModal)
    let new_location = false
    let isOpen = false
    const locations = computed(() => store.state.locations.locations
      ? store.state.locations.locations : 'None Yet')

    const image = ref('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==')

    let form: stockProductType = reactive({
      product_id: '',
      quantity: 0,
      location_id: '',
    })

    if (props.stock_detail) {

      form = props.stock_detail
      const item = store.getters.getProductById(form.product_id)
      form.name = item.name

      // form = { ...form, ...item }
      image.value = item.imageData
      //console.log(form)
    }


    function changeImage(p: productsType) {

      form.product_id = p._id
      image.value = p.imageData
    }

    function change_location() {
      return new_location = true
    }

    async function confirm() {
      if (store.state.inventory.showCreateModal) {
        await store.dispatch('addNewStock', form)
        store.state.inventory.showCreateModal = false
        
      } else if (store.state.inventory.showEditModal) {
        
        const updStock = {
          _id: form._id,
          product_id: form.product_id,
          location_id: form.location_id,
          quantity: form.quantity
        }

        await store.dispatch('updateStock', updStock)
        store.state.inventory.showEditModal = false

      } else {
        store.state.inventory.showProductModal = false
      }

      modalController.dismiss(form, 'confirm', 'main-modal');
    }

    async function cancel() {

      await modalController.dismiss(null, 'cancel', 'main-modal').then(() => {
        store.dispatch('resetProductState')
        console.log(store.state.products)
      })
    }

    return {
      form, changeImage, image, confirm, cancel, change_location,
      isOpen, new_location, closeOutline, checkmarkDoneOutline, arrowBackSharp,
      readonly, locations
    }
  },

});


</script>