<template>
  <ion-page>
    <ion-header translucent>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>System Config</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content style="padding: 20px 30px">
      <ion-row>
        <ion-col offset='1' size='10'>

          <ion-accordion-group value=first>
            <ion-accordion value="first">
              <ion-item slot="header" color="light">
                <ion-label>Business Locations</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">
                <ion-grid>
                  <ion-row>
                    <ion-col size-sm="4">
                      <ion-list lines="full">

                        <ion-item>
                          <ion-label position="stacked">New Location</ion-label>
                          <ion-input type="text" :value="location.name" @input="location.name = $event.target.value"
                            placeholder="title"></ion-input>
                        </ion-item>
                        <ion-item>
                          <ion-label position="stacked">Address</ion-label>
                          <ion-input type="text" :value="location.address"
                            @input="location.address = $event.target.value"></ion-input>
                        </ion-item>
                        <ion-item>

                          <ion-label position="stacked">Location Manager</ion-label>
                          <ion-select v-model="location.manager">
                            <ion-select-option v-if="!employees"></ion-select-option>
                            <ion-select-option v-else v-for="emp in employees" :key="emp._id">{{
                              
                            }} </ion-select-option>
                          </ion-select>

                        </ion-item>
                        <ion-button color="danger" size="small" @click="savelocation()">Save</ion-button>

                      </ion-list>
                    </ion-col>

                    <ion-col size-sm="8">

                      <ion-list lines="full">
                        <ion-item-divider v-if="locations.length == 0">No Business Locations yet</ion-item-divider>
                       <div v-else>

                        <ion-item-divider>Company Locations</ion-item-divider>
                        <ion-item v-for="locat in locations" :key="locat._id">
                          <ion-label>{{ locat.name }}</ion-label>
                          <ion-text slot="start">{{ locat.address }}</ion-text>
                          <ion-text slot="end">Manager : {{ getEmployeeName(locat.admin) }}</ion-text>
                        </ion-item>
                      </div>
                      </ion-list>

                    </ion-col>

                  </ion-row>
                </ion-grid>

              </div>
            </ion-accordion>
            <ion-accordion value="second">
              <ion-item slot="header" color="light">
                <ion-label> Measuring Units</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">

                      <ion-list lines="full">
                        <form @submit.prevent="">
                          <ion-item>
                            <ion-label position="stacked">Unit Identifier</ion-label>
                            <ion-input type="text" :value="new_unit.name" @input="new_unit.name = $event.target.value"
                              placeholder="title"></ion-input>
                          </ion-item>
                          <ion-item>
                            <ion-label position="stacked">Symbol</ion-label>
                            <ion-input :value="new_unit.symbol"
                              @input="new_unit.symbol = $event.target.value"></ion-input>
                          </ion-item>
                          <ion-button color="danger" size="small" @click="saveUnit(false)" type="submit">Add</ion-button>
                          <ion-button color="primary" size="small" @click="saveUnit(true)" type="submit">Save</ion-button>
                        </form>
                      </ion-list>


                    </ion-col>

                    <ion-col size-md="8">

                      <ion-list lines="full">
                        <ion-item-divider v-if="units">No Units yet</ion-item-divider>

                        <ion-item v-else v-for="unit in units">
                          <ion-label>{{ unit.name }}</ion-label>
                          <ion-text>{{ unit.symbol }}</ion-text>

                        </ion-item>

                      </ion-list>

                    </ion-col>

                  </ion-row>
                </ion-grid>

              </div>
            </ion-accordion>
            <ion-accordion value="third">
              <ion-item slot="header" color="light">
                <ion-label>Company Settings</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">
                <ion-grid>
                  <ion-row>
                    <ion-col size="4">

                      <ion-list lines="full">
                        <form method="post" @submit.prevent="savelocation">
                          <ion-item>
                            <ion-label position="stacked">New Location</ion-label>
                            <ion-input type="text" v-model="locat_name" placeholder="title"></ion-input>
                          </ion-item>
                          <ion-item>
                            <ion-label position="stacked">Address</ion-label>
                            <ion-input type="text" v-model="location.address"></ion-input>
                          </ion-item>
                          <ion-item>
                            <ion-label position="stacked">Location Manager</ion-label>
                            <ion-select v-model="location.manager">
                              <ion-select-option v-if="!employees"></ion-select-option>
                              <ion-select-option v-else v-for="emp in employees" :key="emp._id" value="emp._id">{{
                             
                              }} </ion-select-option>
                            </ion-select>
                          </ion-item>
                          <ion-button color="danger" size="small">Save</ion-button>
                        </form>
                      </ion-list>
                    </ion-col>

                    <ion-col size-md="8">

                      <ion-list lines="full">
                        <ion-item-divider v-if="locations.length == 0">No Business Locations yet</ion-item-divider>

                        <ion-item v-else v-for="locat in locations" :key="locat._id">
                          <ion-label>{{ locat.name }}</ion-label>
                          <ion-text>{{ locat.address }}</ion-text>
                          <ion-text slot="end">{{ getEmployeeName(locat.admin) }}</ion-text>
                        </ion-item>
                      </ion-list>
                    </ion-col>
                  </ion-row>
                </ion-grid>

              </div>
            </ion-accordion>
          </ion-accordion-group>

        </ion-col>
      </ion-row>
    </ion-content>

  </ion-page>
</template>

<script lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonItemDivider, } from '@ionic/vue';
import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
import { useStore, mapGetters } from 'vuex';
import * as type from '../helpers/interfaces'

export default {
  name: 'ConfigPage',
  components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonItemDivider, },
  setup() {
    const store = useStore()
    const location = reactive({
      name: '',
      address: '',
      manager: ''
    })

    const new_unit = reactive({
      name: '',
      symbol: ''
    })

    const company = computed(()=>store.state.company.company)
    const locations = ref(store.state.locations.locations)
    
    const employees = ref(store.state.employees.employees)
    const units = ref(store.getters.getCompanyUnits)

    async function getEmployeeName(id: string) {
     const employee = store.state.employees.findIndex(id)
      console.log(employee)
      return employee.fullname
    }

    function addManager(event) {
      let emp = event.target.value
      console.log(emp)
    }

   async function saveUnit(all: boolean) {
  const u = await store.commit('addNewUnit', new_unit)
  console.log(u)
      new_unit.name = ''
      new_unit.symbol = ''

      if (all) {
     let   unitz = store.getters.getCompanyUnits
     console.log(unitz)
        store.dispatch('updateCompanyInfo', company)
      }
    }

    function savelocation() {
      console.log(location)

      // const save: type.locationTyping = {
      //   _id: new Date().toJSON(),
      //   name: location.name,
      //   address: location.address,
      //   admin: location.manager,
      //   company: company._id
      // }
      // store.dispatch('saveNewLocation', save)
    }
onMounted(()=>{
store.dispatch('loadCompanyEmployees', localStorage.getItem('company_name'))
})
    return {
      company, locations, employees, location, getEmployeeName, savelocation, units, new_unit,
      saveUnit, addManager,
    }
  },
}
</script>

<style scoped>
ion-item {
  --padding-start: 0;
}

/* iOS places the subtitle above the title */
ion-card-header.ios {
  display: flex;
  flex-flow: column-reverse;
}
</style>