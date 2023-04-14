<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Customers Manager</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content fullscreen>

            <ion-list>
                <ion-item lines="none">

                    <ion-label position="stacked"> Company Name</ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="stacked"> Company Address</ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked"> Email </ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>


                <ion-item>
                    <ion-label position="stacked">Phone N&otilde; </ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked"> Username</ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>


                <ion-item>
                    <ion-label position="stacked">Password </ion-label>
                    <ion-input type="text"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked"> Contact Person's Name</ion-label>
                    <ion-input type="number"></ion-input>
                </ion-item>

                <ion-item>
                    <ion-label position="stacked"> Contact Person's Email</ion-label>
                    <ion-input type="number"></ion-input>
                </ion-item>

            </ion-list>
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
    name: 'signUp',
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

    setup() {

    }

}

</script>