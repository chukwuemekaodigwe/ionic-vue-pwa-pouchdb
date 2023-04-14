<template>
    <ion-page>
        <ion-header translucent>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>Stock Manager</ion-title>
            </ion-toolbar>
            <ion-toolbar>
                <ion-searchbar placeholder="search by name, sku, location, quantity" v-model="searchkey" @ionChange="">
                </ion-searchbar>
            </ion-toolbar>
        </ion-header>

        <ion-content fullscreen>
<ion-grid>
                    <ion-row>
                        <ion-col>
                            <ion-list lines="full">
                                <form @submit.prevent="bindValue">
                                    <ion-item>
                                        <ion-label position="stacked">Unit Identifier</ion-label>
                                        <ion-input type="text" placeholder="title"></ion-input>
                                    </ion-item>
                                    <ion-item>
                                        <ion-label position="stacked">Symbol</ion-label>
                                        <ion-input name="symbol"></ion-input>
                                    </ion-item>

                                    <ion-button color="danger" size="small" type="submit">Save</ion-button>
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

        </ion-content></ion-page>
</template>

<script lang="ts">
import { toastController } from '@ionic/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonItemDivider, } from '@ionic/vue';
import { defineComponent, reactive, ref, computed } from 'vue';
import { useStore, mapGetters } from 'vuex';
import * as type from '../helpers/interfaces'

export default {
    name: 'ConfigPage',
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonList, IonItemDivider, },
    setup() {
        const store = useStore()
        const new_unit = ref({
            name: '',
            symbol: ''
        })

        const units = computed(() => store.getters.getCompanyUnits)
        function bindValue(ev) {
            console.log(new_unit.value)
        }

        return {
            units, bindValue, new_unit
        }
    }

}
</script>