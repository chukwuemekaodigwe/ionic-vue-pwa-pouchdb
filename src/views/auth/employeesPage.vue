<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-img src="/vite.svg" class="ion-align-self-end"></ion-img>
                </ion-buttons>
                <ion-title> New employee</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="8" offset="2">

                        <ion-list inset="true">
                            <form @submit.prevent="handleSignup">
                                <ion-item>
                                    <ion-label position="stacked"> Name</ion-label>
                                    <ion-input type="text" v-model="form.fullname" autocomplete></ion-input>
                                </ion-item>
                                <ion-row class="bordered">
                                    <ion-col size-md="6">
                                        <ion-item>
                                            <ion-label position="stacked"> Email </ion-label>
                                            <ion-input type="email" v-model="form.email" autocomplete></ion-input>

                                        </ion-item>
                                    </ion-col>
                                    <ion-col size-md="6">
                                        <ion-item>
                                            <ion-label position="stacked"> Phone N&otilde; </ion-label>
                                            <ion-input type="tel" v-model="form.phone" autocomplete></ion-input>

                                        </ion-item>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="bordered">
                                    <ion-col size-md="6">
                                        <ion-item>
                                            <ion-label position="stacked"> Username </ion-label>
                                            <ion-input type="text" v-model="form.username" autocomplete></ion-input>

                                        </ion-item>
                                    </ion-col>
                                    <ion-col size-md="6">
                                        <ion-item>
                                            <ion-label position="stacked">Password </ion-label>
                                            <ion-input type="password" v-model="form.password"></ion-input>

                                        </ion-item>
                                    </ion-col>
                                </ion-row>
                                <ion-row class="bordered">
                                    <ion-col>
                                        <ion-item>
                                            <ion-label position="stacked"> Role</ion-label>
                                            <ion-select required v-model="form.role">
                                                
                                                <ion-select-option> Admin</ion-select-option>
                                                <ion-select-option> Shop Manager </ion-select-option>
                                                <ion-select-option>Cashier </ion-select-option>
                                                <ion-select-option>Auditor </ion-select-option>
                                                <ion-select-option> Branch Manager </ion-select-option>

                                            </ion-select>
                                        </ion-item>

                                    </ion-col>
                                    <ion-col>

                                        <ion-item>
                                            <ion-label position="stacked"> Location</ion-label>
                                            <ion-select required v-model="form.location">
                                                <ion-select-option> Select a Location</ion-select-option>
                                                <ion-select-option> All Locations</ion-select-option>
                                                <ion-select-option> Specific Loaction </ion-select-option>


                                            </ion-select>
                                        </ion-item>


                                    </ion-col>
                                </ion-row>

                                <ion-row>
                                    <ion-col size="4" offset="3">

                                        <ion-button type="submit" color="danger" expand="block">Sign Up</ion-button>
                                        <a href="/login"> Login Instead</a>
                                    </ion-col>

                                </ion-row>
                            </form>
                        </ion-list>

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
    IonItem, IonSelectOption,
    IonInput, IonImg, IonSelect, IonGrid, IonCol, IonRow,
    IonLabel, toastController,
    loadingController,
    modalController
} from "@ionic/vue";
import { defineComponent, ref, reactive, onMounted, inject } from "vue";
import { useStore } from 'vuex';
import * as bcrypt from 'bcryptjs'
import * as Type from '../../helpers/interfaces'
import { sendActivation } from "../../helpers/useActionSheet";
import { useRouter } from 'vue-router'

export default defineComponent({
    name: 'signupPage',

    components: {
        IonButtons,
        IonButton,
        IonPage,
        IonHeader,
        IonContent,
        IonToolbar,
        IonTitle, IonSelectOption,
        IonItem, IonImg, IonSelect, IonGrid, IonCol, IonRow,
        IonInput, modalController,
        IonLabel, toastController,
        loadingController,

    },

    setup(props) {
        const store = useStore();
        const router = useRouter()

        let form:Type.employeeTyping = reactive({
            company: import.meta.env.VITE_DB_KEY,
            fullname: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            location: '',
            
            role: ''
           
        })

        const handleSignup = async () => {
            const loader = await loadingController.create({})
            const toast = await toastController.create({ duration: 5000 })

            try {
                await loader.present()
                toast.message = ''
                Object.entries(form).forEach(([element, value]) => {

                    if (!value) {
                        toast.message += `${element} can't be empty<br>`

                    }

                    if (element == 'password' && value.length < 10) {
                        toast.message += `${element} should be upto 10 characters<br>`
                    }
                })
                if (toast.message) {
                    return toast.present();
                }
           
                const employee: Type.employeeTyping = form

                bcrypt.hash(form.password, 10, function (err, hash) {
                    // Store hash in your password DB.
                    employee.password = hash;
                    if (err) {
                        console.log(err)
                    }
                });

                console.log(employee)
throw Error

            } finally {
                // toast.message = 'Check your email for the login link!'
                await loader.dismiss()
            }
        }

        function sendEmail() {
            return sendActivation(form.person, form.p_email)

        }


        return {
            form, handleSignup
        }
    }

});

</script>

<style>
.bordered {
    border-bottom: .7px solid #eee;
}
</style>