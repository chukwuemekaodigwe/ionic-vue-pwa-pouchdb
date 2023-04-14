<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-img src="/vite.svg" class="ion-align-self-end"></ion-img>
        </ion-buttons>
        <ion-title> New SignUp</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="8" offset="2">

            <ion-list inset="true">
              <form @submit.prevent="handleSignup">
                <ion-item>

                  <ion-label position="stacked"> Company Name</ion-label>
                  <ion-input type="text" v-model="form.company" autocomplete></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="stacked"> Company Address   </ion-label>
                  <tooltip for="address" position="start" bg-color="darkblue" icon-color="blue" text-color="white" message="write on the company address" :is-outline="true"></tooltip>
                  <ion-input v-model="form.address" autocomplete type="text"></ion-input>
                </ion-item>
                <ion-row class="bordered">
                  <ion-col size-md="6">
                    <ion-item>
                      <ion-label position="stacked"> Business Email </ion-label>
                      
                      
                      <tooltip for="email" font-size="36px" bg-color="darkblue" icon-color="blue" text-color="white" message="write on the company address" :is-outline="false"></tooltip>
                      <ion-input type="email" v-model="form.email" autocomplete></ion-input>

                    </ion-item>
                  </ion-col>
                  <ion-col size-md="6">
                    <ion-item>
                      <ion-label position="stacked">Company Phone N&otilde; </ion-label>

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

                <ion-item>
                  <ion-label position="stacked"> Contact Person's Name</ion-label>
                  <ion-input type="text" v-model="form.person" placeholder="Account Name" autocomplete></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked"> Contact Person's Email</ion-label>
                  <ion-input type="email" v-model="form.p_email" placeholder="For account creation"
                    autocomplete></ion-input>
                </ion-item>
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
  IonPage,IonPopover,
  IonHeader,
  IonContent,
  IonToolbar, IonList,
  IonTitle,
  IonItem,
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
import tooltip from "../../components/tooltip.vue";


export default defineComponent({
  name: 'signupPage',

  components: {
    IonButtons,
    IonButton,
    IonPage,
    IonHeader,
    IonContent,
    IonToolbar, IonList,
    IonTitle,IonPopover,
    IonItem, IonImg, IonSelect, IonGrid, IonCol, IonRow,
    IonInput, modalController,
    IonLabel, toastController,
    loadingController, tooltip

  },

  setup(props) {
    const store = useStore();
    const router = useRouter()

    let form = reactive({
      company: '',
      address: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      person: '',
      p_email: ''
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

        store.getters.getEmployeeByUsername(form.p_email)
          .then((res) => {
            console.log(res)

              toast.message = "Email aready in use"
              toast.present()
              throw new Error("Email exists");
              
return
          })          /**
         * Save Employee
         */
         

         const employee: Type.employeeTyping = {
          _id: form.p_email,
          fullname: form.person,
          email: form.p_email,
          username: form.username,
          company: '',
          location: '',
          password: '',
          role: 'admin'
        }

        bcrypt.hash(form.password, 10, function (err, hash) {
          // Store hash in your password DB.
          employee.password = hash;
          if (err) {
            console.log(err)
          }
        });

        const token = await sendEmail()
        employee.login_token = token

        const rr: Type.employeeTyping = await store.dispatch('saveNewEmployee', employee)

        const newCompany: Type.CompanyTyping = {
          _id: '',
          shortname: '',  // taken over by id == from uuid
          currency: '',
          units: [
            {
              name: 'kilogram',
              symbol: 'kg'
            }
          ],
          admin: rr._id, //_id of the admin user
          logo: '',
          _rev: '',
          fullname: form.company,
          address: form.address,
          email: form.email,
          phone: form.phone,
          contact: {
            name: form.person,
            email: form.p_email
          },
          created_at: new Date(),
        }

        await store.dispatch('createCompany', newCompany);

        const newC: Type.CompanyTyping = store.state.company.company
        localStorage.setItem('company_name', newC._id)
        /**
         * Add Location
         */
        //console.log(newC)
        const newLocation: Type.locationTyping = {
          _id: new Date().toJSON(),
          company: newC._id,
          name: 'Main Branch',
          address: form.address,
          admin: rr._id
        }


        await store.dispatch('saveNewLocation', newLocation)
        const Loca: Type.locationTyping = store.getters.getLocationById(newLocation._id)
        //console.log(Loca)

        /**
         * Update employee info
         */


        rr.company = newC._id
        rr.location = Loca._id
        store.dispatch('saveUpdate', rr)


        toast.message = `Welcome ${form.person}, Please Check your email for the login link!`
        //form = {}
      //  router.push('/login?verify=true')

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

::placeholder {
  font-size: smaller;
  font-style: italic;
}
</style>