<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content slot="middle">
      <div class="ion-padding"></div>
      <ion-row>
        <ion-col size="6" offset="3">

          <div class="vertical-center">
            <div class="center">
              <ion-img src="/vite.svg" class="ion-align-self-end"></ion-img>
            </div>
          </div>

          <p v-if="verify" @click="resend" class="info">
            Click to resend verfification code
          </p>
          <!-- 
          <ion-avatar style="height: 100px; width:auto;">
            <img src="/vite.svg" />
          </ion-avatar> <br />
          <p>Sign in</p> -->


          <ion-list inset="true">
            <form @submit.prevent="handleLogin">
              <ion-item>
                <ion-label position="stacked">Username</ion-label>
                <ion-input v-model="username" name="username" autocomplete type="text"
                  placeholder="Enter the account email"></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input v-model="pwd" name="password" autocomplete type="password"></ion-input>
              </ion-item>

              <div class="ion-text-center">
                <ion-button type="submit">Login</ion-button>
              </div>

              <ion-grid>
                <ion-row>
                  <ion-col align-self-center>
                    <!-- <ion-button router-link="/registration" expand="block" color="primary">Register</ion-button> -->
                    <span class="divider line one-line">or</span>
                    <span class="already">Not already a user?</span>
                    <ion-button router-link="/signup" expand="block" color="danger">Register</ion-button>
                  </ion-col>
                </ion-row>
              </ion-grid>

            </form>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-page>
</template>
  
<script lang="ts">

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput, IonRow, IonCol, IonGrid,
  IonButton, IonImg,
  toastController,
  loadingController,
} from '@ionic/vue'
import { defineComponent, onMounted, ref, reactive, computed, onBeforeMount } from 'vue'
import { personAdd, logIn } from "ionicons/icons";
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";
import * as bcrypt from 'bcryptjs'
import * as Type from "../../helpers/interfaces";
import { sendActivation, getDateOnly } from '../../helpers/useActionSheet'
import { v4 as uuid } from "uuid";
import * as VITE from '../../helpers/constants';


export default defineComponent({
  name: 'LoginPage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton, IonRow, IonCol, IonGrid, IonImg
  },
  async setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    let employee: Type.employeeTyping = reactive({
      fullname: '',
      company: '',
      username: '',
      role: '',
      location: '',
      password: '',
      _id: '',
      email: ''
    })

    const pwd = ref('')
    const username = ref(employee.username)
    const company_logo = ref('')
    const logo = computed(() => { !company_logo ? '/vite.svg' : company_logo })
    const verify = ref(false)

    onBeforeMount(() => {
//console.log(store.state.locations.locations)
      if (route.params.key) {
        const token = route.params.key
        verify.value = true
        const f = store.getters.getEmployeeByToken(token)
        if (f) {
          employee = f
          //console.log(f)
          username.value = employee.username
          toast.message = `Welcome ${employee.fullname.toUpperCase()}! Account Activated Successfully`
          verify.value = false
          router.push('/login')
        } else {
          toast.message = 'Verification failed, please resend or verify your link'
        }

        toast.present()
      } else if (route.query.verify) {
        verify.value = true
      } else if (route.path == '/logout') {
        const stored = JSON.parse(localStorage.getItem('vip-pos-key'))
        if (stored) {
          stored.time = ''
          localStorage.setItem('vip-pos-key', JSON.stringify(stored))
          localStorage.removeItem('isAuth')
          localStorage.clear()
        }

      } else if (route.path == '/lockscreeen') {

      } else if (window.localStorage.getItem('vip-pos-key')) {
        const webstore = JSON.parse(localStorage.getItem('vip-pos-key'))
        //console.log(webstore)
        company_logo.value = webstore.image
        const token = webstore.token
        const time = webstore.time
        const f = store.getters.getEmployeeByToken(token)
        if (f) {
          employee = f
          username.value = employee.username
          toast.message = `Welcome back, ${employee.fullname.toUpperCase()}!`
        }
        //console.log(getDateOnly())
        if (time === getDateOnly()) {

          return router.replace('/home')
        } else {
          toast.message = 'Session expired, please login'
        }
        toast.present()
      }
    })

    const handleLogin = async () => {
      if (username.value) {
        const check = await store.getters.getEmployeeByUsername(username.value)

          .then((res) => {
            
            employee = res
            console.log({'then': res, 'employee': employee})
            bcrypt.compare(pwd.value, res.password)
              .then((res) => {
                if (res) {
                  comCred()
                } else {
                  toast.message = 'Incorect Password'
                  toast.present()
                }

              })
          })

          .catch((result: Type.employeeTyping) => {
            console.log({'catch': result})
            // if (!result) {
            toast.message = 'Invalid Credentials'
            toast.present()
            // }
          })

      } else {
        toast.message = 'please fill all the fields'
        return toast.present()

      }

    }

    const comCred = async () => {
      await loadPage()

      const token = {
        image: company_logo,
        time: getDateOnly(),
        token: uuid()
      }

      localStorage.setItem('vip-pos-key', JSON.stringify(token))
      localStorage.setItem('isAuth', getDateOnly())
      employee.login_token = token.token
      employee.last_active = new Date()
console.log(employee)
      await store.dispatch('saveUpdate', employee)

      return router.push('/home')

    }

    const resend = async () => {
      const token = sendActivation(employee.fullname, employee.email)
      employee.login_token = token
      store.commit('updateEmployee', employee)
      toast.message = 'Activation resent successfully'
      toast.present()
    }

    const loadPage = async () => {
      /**
       * load company
       * load active employee
       * load company products
       */
      //(VITE.DB_KEY as string) = employee.company
      localStorage.setItem('company_name', employee.company)
      localStorage.setItem('employee_id', employee._id)
      await store.commit('setActiveEmployee', employee)
      await store.dispatch('setActiveCompany', employee.company)

      const company: Type.CompanyTyping = store.state.company.company

      company_logo.value = company.logo


      await store.dispatch('loadProducts')
      await store.dispatch('loadLocations', company._id)
      await store.dispatch('loadStock')
      /**
       * PRODUCT
       */
    }
    const loader = await loadingController.create({})
    const toast = await toastController.create({ duration: 7000 })


    return { username, pwd, handleLogin, employee, logo, verify, resend, personAdd, logIn }
  },
})
</script>

<style>
.vertical-center {
  display: flex;
  align-items: center;
  justify-content: center;

}

.vertical-center ion-img {
  height: 150px;
}

.divider {
  display: block;
  text-transform: uppercase;

}

.already {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>