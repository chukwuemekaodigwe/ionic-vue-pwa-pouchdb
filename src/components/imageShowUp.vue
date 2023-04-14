<style>
ion-modal#example-modal  {
    --width: 250px;
    --min-width: 250px;
    --height: fit-content;
    --border-radius: 6px;
    --box-shadow: 0 28px 48px rgba(0, 0, 0, 0.4);
    
}

ion-modal#product-image{
    display: none;
}

ion-modal#example-modal h3 {
    margin: 0px auto;
    position: fixed;
    background-color: #0005;
    width: 100%;
    padding: 5px;
    color: #fff;
    display: block;
}

ion-modal#example-modal  ion-icon {
    margin-right: 6px;
    font-size: 2em;
    padding: 4px 0;
    color: rgb(146, 30, 30);
}

ion-modal#example-modal  .wrapper {
    margin-bottom: 5px;
}

ion-modal#example-modal ion-img img{
    height: 300px
}
ion-modal ion-button{
    height: auto;
    margin: auto;
}
</style>

<template>
   
        <ion-modal :is-open="true" id="example-modal" @didDismiss="closeModals()" ref="modal">
            <div class="wrapper">
                <h3> {{ imgTitle }} </h3>

                <ion-img :src="image">

                </ion-img>
                <div class="foot">
                    <ion-button fill="clear" slot="end" @click="editPage">
                        <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
                    </ion-button>
                    <ion-button fill="clear" slot="end" @click="viewPage">
                        <ion-icon :icon="informationCircleOutline" slot="icon-only"></ion-icon>
                    </ion-button>
                </div>
            </div>
        </ion-modal>
    
</template>

<script lang="ts">

import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList, modalController,
    IonLabel,
    IonIcon,
} from '@ionic/vue';
import { personCircle, informationCircleOutline, createOutline } from 'ionicons/icons';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    components: {
        IonButton,
        IonModal,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle,
        IonItem,
        IonList,
        IonLabel,  modalController,
        IonIcon,
    },
    props: {
        editPath: {
            type: String,
            default: '/home'
        },
        viewPath: {
            type: String,
            default: '/login'
        },
        image: {
            type: String,
            default: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw=='
        },
        imgTitle: {
            type: String,
            default: ''
        }
    },
    methods: {
        closeModals() {
          //  let a = this.$emit('dismised', true)
           modalController.dismiss('', 'confirm', 'product-image')
           // Programmable close the first bigger modal

        },

    },
    setup(props) {
        const router = useRouter()
        
        function viewPage() {
            if (props.viewPath){ return router.push(props.viewPath)}
        }

        function editPage() {
            if (props.editPath){ return router.push(props.editPath) }
        }
        return { editPage, viewPage, personCircle, informationCircleOutline, createOutline };
    }
});
</script>
