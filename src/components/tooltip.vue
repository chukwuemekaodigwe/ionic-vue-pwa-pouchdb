<template>
  <div>
    <div :id="for" class="tooltip" :style="`color: ${color};` ">
      <ion-icon :icon="iconStyle" size="small"></ion-icon>
    </div>
    <ion-popover :style="mystyle" :trigger="for" trigger-action="click"
     >
  <ion-label>
    {{ message }}
  </ion-label>
    </ion-popover>
  </div>
</template>
  
<script lang="ts">
import { IonButton, IonContent, IonPopover } from '@ionic/vue';
import { defineComponent } from 'vue';
import { informationCircleOutline, informationCircleSharp } from "ionicons/icons";
import { computed, ref } from "vue";

export default {
  name: "tooltipHelper",
  components: {
    IonButton, IonContent, IonPopover
  },

  props: {
    fontSize: {
      type: String,
      default: '1em'
    },
    iconColor: {
      type: String,
      default: 'blue'
    },

    isOutline: {
      default: true,
      type: Boolean
    },
    bgColor: {
      default: '#000',
      type: String
    },
    textColor: {
      type: String,
      default: 'red'
    },
    message: {
      type: String
    },
    for:{
      type: String,
      
    }
  },

  setup(props) {
    const color = ref(props.iconColor)
    const iconStyle = computed(() => (props.isOutline) ? informationCircleOutline : informationCircleSharp)

    const message = ref(props.message)
    const mystyle = `
    color: ${props.textColor};
    --background: ${props.bgColor};
    font-size: ${props.fontSize}
    `
    return {
      color, iconStyle, informationCircleSharp, message, mystyle
    }
  }
}
</script>

<style>
ion-icon {
  pointer-events: none;

}

ion-label{
  padding: 5px;
  
}
/* Tooltip container */
.tooltip {
  position: relative;
  display: block;
  cursor: pointer;

}

</style>