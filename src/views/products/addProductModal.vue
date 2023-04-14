<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="cancel">
            <ion-icon class="modal-button" size="medium" :icon="arrowBackSharp"></ion-icon>
            <ion-back-button></ion-back-button>
          </ion-button>
        </ion-buttons>
        <ion-title>
          {{ modalTitle }}
        </ion-title>
        <ion-buttons slot="end">
          <ion-button color="success" @click="confirm">
            <ion-icon :icon="checkmarkDoneOutline" size="medium"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="$props.change">
        <ion-item lines="inset">
          <product-search @product-selected="changeProduct"></product-search>
        </ion-item>
        <ion-row>
          <ion-col size=6>
            <ion-item lines="inset">
              <ion-label position="stacked">Old Cost Price</ion-label>
              <ion-input type="number" readonly="readonly" v-model="changePrice.cost_price"></ion-input>
            </ion-item>
          </ion-col>

          <ion-col size=6>
            <ion-item lines="inset">
              <ion-label position="stacked">Old Selling Price</ion-label>
              <ion-input  type="number" readonly="readonly" v-model="changePrice.selling_price"></ion-input>
            </ion-item>
          </ion-col>

        </ion-row>

        <ion-row>
          <ion-col size=6>
            <ion-item lines="inset" class="price">
              <ion-label position="stacked">New Cost Price</ion-label>
              <ion-input type="number" @ionBlur="validatePrice" v-model="changePrice.new_cost"></ion-input>

              <ion-note slot="error"> Note: The cost price is above the selling price</ion-note>
            </ion-item>
          </ion-col>

          <ion-col size=6>
            <ion-item lines="inset" class="price">
              <ion-label position="stacked">New Selling Price</ion-label>
              <ion-input type="number" @ionBlur="validatePrice"  v-model="changePrice.new_selling" :min="changePrice.new_cost"></ion-input>
              <ion-note slot="error"> Note: The selling price is below the Cost price</ion-note>
            </ion-item>
          </ion-col>
        </ion-row>
        <!-- 
        <ion-row>
          <ion-col size=8>
            <ion-item lines="inset">
              <ion-label>
                Change on specific stores?
              </ion-label>
              <ion-checkbox color="primary" slot="end" v-model="changePrice.specific_location"></ion-checkbox>
            </ion-item>
          </ion-col>

          <ion-col size=4>
            <ion-item lines="inset">
              <ion-label position="stacked"> Select store locations</ion-label>
              <ion-select v-model="changePrice.locations" multiple>

                <ion-select-option value="brown">Brown</ion-select-option>
                <ion-select-option value="blonde">Blonde</ion-select-option>
                <ion-select-option value="black">Black</ion-select-option>
                <ion-select-option value="red">Red</ion-select-option>
              </ion-select>
            </ion-item>
          </ion-col>

        </ion-row> -->

      </div>
      <div v-else>

        <ion-grid>
          <ion-row>

            <ion-col size-xs="12" size-md="6">

              <ion-item lines="inset">
                <ion-label position="stacked">Product Name</ion-label>
                <ion-input :readonly="readonly" v-model="form.name" type="text"></ion-input>
              </ion-item>
              <ion-item lines="inset">
                <ion-label position="stacked">Product Code/SKU

                </ion-label>
                <ion-input placeholder="A unique product Identifier" :readonly="readonly" type="text" v-model="form.sku"
                  @ionBlur="checkSKU"></ion-input>
                <ion-note slot="error">SKU already exists</ion-note>
                <tool-tip :icon-color="'black'" :is-outline="false"
                  :message="'This is the product/brand unique identifier'"></tool-tip>
              </ion-item>

              <ion-item lines="inset" class="price">
                <ion-label position="stacked">Initial Cost Price</ion-label>
                <ion-input v-bind="number" :readonly="readonly" type="text" v-model="form.cost_price" @ionBlur="validatePrice"
                  @focus="form.cost_price = ''"></ion-input>
                <ion-note slot="error"> Note: Above the selling price</ion-note>
              </ion-item>
              <ion-item lines="inset" class="price">
                <ion-label position="stacked">Initial Selling Price</ion-label>
                <ion-input :readonly="readonly" type="number" v-model="form.selling_price"
                  @ionBlur="validatePrice"></ion-input>
                <ion-note slot="error"> Note: less than the cost price</ion-note>
              </ion-item>

              <ion-item lines="inset">
                <ion-label position="stacked">Type of Product</ion-label>
                <ion-select :readonly="readonly" v-model="form.productType">
                  <ion-select-option value="fixed">Fixed/Countable</ion-select-option>
                  <ion-select-option value="variable">Variable Length</ion-select-option>

                </ion-select>
              </ion-item>

              <ion-item lines="inset">
                <ion-label position="stacked">Unit of Measurement</ion-label>
                <ion-select v-if="!form.unit" :readonly="readonly" v-model="form.productUnit">
                  <ion-select-option v-for="{unit, index} in units" :key="index"> {{ unit }}</ion-select-option>
                 
                </ion-select>
              </ion-item>

              <ion-item lines="inset">
                <ion-label position="stacked">Comment</ion-label>
                <ion-textarea :readonly="readonly" v-model="form.desc" placeholder="optional"></ion-textarea>
              </ion-item>
            </ion-col>

            <ion-col size-xs="12" size-md="6" style="min-height: 300px; height:fit-content">

              <ion-label position="stacked">Product Image</ion-label>
              <image-uploader :image="imageUrl" @save-image="saveImage"></image-uploader>


            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonButton, IonBackButton,
  IonHeader,
  IonContent,
  IonToolbar, IonGrid,
  IonTitle, IonRow, IonCol,
  IonItem, IonPage,
  IonInput, IonSelect, IonSelectOption, IonTextarea,
  IonLabel, modalController
} from "@ionic/vue";
import { closeOutline, checkmarkDoneOutline, arrowBackSharp } from "ionicons/icons";
import { defineComponent, computed, ref, onMounted, reactive } from "vue";
import { useStore } from 'vuex';
import ImageUploader from "../../helpers/formImage.vue";
import { defaultState, IProduct, state } from "./store/state";
import productSearch from '../../components/useProductSearchModal.vue'
import toolTip from "../../components/tooltip.vue";
import number from 'vue-number-format'

export default defineComponent({
  name: 'addProductModal',
  props: {
    title: {
      type: String
    },

    product: {

      default: {
        name: '',
        desc: '',
        cost_price: '0',
        selling_price: '0',
        sku: '',
        productUnit: '',
        productType: '',
        imageData: '',
        _id: new Date().toJSON(),
        employee_id: localStorage.getItem('employee_id'),
        company_id: localStorage.getItem('company_name'),
        unit: ''
      }
    },
    change: {
      type: Boolean,
      default: false
    }
  },
  components: {
    IonButtons, productSearch,
    IonButton, toolTip,
    IonHeader, IonGrid,
    IonContent, IonPage,
    IonToolbar, IonBackButton,
    IonTitle, IonRow, IonCol,
    IonItem,
    IonInput, IonSelect, IonSelectOption, IonTextarea,
    IonLabel, ImageUploader, number
  },
  setup(props, context) {

    const store = useStore();
    const changePrice = reactive({
      cost_price: '',
      selling_price: '',
      new_cost: '',
      new_selling: '',
      product: {}
    })
    const number = 
      {
  "decimal": ".",
  "separator": ",",
  "prefix": "N ",
  "suffix": "",
  "precision": 2,
  "nullValue": "",
  "masked": false,
  "reverseFill": false,
  "prefill": true
    }
    const form = { ...props.product }
    const modalTitle = ref(props.title)
    const imageUrl = props.product.imageData
    const readonly = computed(() => {
      return (store.state.products.showProductModal == true) ? true : false
    })
    const units = computed(() => { store.getters.getCompanyUnits})
    const cancel = () => {
      modalController.dismiss(null, 'cancel', 'product-modal').then(() => {
        store.dispatch('resetProductState')
      })

    };

    async function confirm() {

console.log(form)
      let res = ''
      if (store.state.products.showEditModal) {
        await updateProduct(form);
        
        store.state.products.showEditModal = false
      } else if (store.state.products.showCreateModal) {

        await saveNewProduct(form)

      } else if (props.change) {
        changePrice.product.cost_price = changePrice.new_cost
        changePrice.product.selling_price = changePrice.new_selling
        updateProduct(changePrice.product)

      }
      modalController.dismiss(form, 'confirm', 'product-modal')
    }

    const saveImage = (image: any) => {
      form.product_img = image.blob
      form.imageData = image.imgData
      //store.commit('saveNewImage', image)

    }

    const saveNewProduct = (data: IProduct) => {
      data.sku = data.sku.toUpperCase()
      store.dispatch('actionSaveProduct', data).then((e) => { console.log(e) })

    }

    const updateProduct = async function (data: IProduct) {

      await store.dispatch('actionUpdateProduct', data)
      //modalController.dismiss()
    }

    const changeProduct = (product) => {
      if (product) {
        changePrice.selling_price = product.selling_price
        changePrice.cost_price = product.cost_price
        changePrice.product = product
      }
    }

    const checkSKU = (ev) => {
      const el = ev.target.closest('ion-item')

      el.classList.remove('ion-valid'); +
        el.classList.remove('ion-invalid');

      if (ev.target.value == '') return;

      const value = ev.target.value;
      //console.log(value); console.log(value.toUpperCase())
      if (store.getters.getProductBySku(value.toUpperCase())) {
        el.classList.add('ion-invalid');
      } else {
        el.classList.add('ion-valid');
      }

    }

    function validatePrice(ev) {
      const el = ev.target.closest('ion-item')

      el.classList.remove('ion-valid');
      el.classList.remove('ion-invalid');

      if (ev.target.value === '') return;

      (parseInt(form.selling_price) > parseInt(form.cost_price))
        ? document.querySelectorAll('.price').forEach((e) => {

          e.classList.remove('ion-valid');
          e.classList.remove('ion-invalid');
          e.classList.add('ion-valid')

        })
        : el.classList.add('ion-invalid');

      //console.log(document.querySelectorAll('.price').forEach((e))
    }

    return {
      form, number, checkSKU, validatePrice, readonly, changePrice, changeProduct, cancel, confirm, modalTitle, saveImage, imageUrl, arrowBackSharp, checkmarkDoneOutline, closeOutline, units
    }
  },

});



</script>