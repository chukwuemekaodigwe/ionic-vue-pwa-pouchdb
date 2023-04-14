import { actionSheetController } from "@ionic/vue"
import { alertController } from "@ionic/vue";
import * as Type from './interfaces'
import emailjs from 'emailjs-com';
import * as KEY from './constants'
import { v4 as uuid } from 'uuid';



export const useActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Are you sure ?',
    buttons: [
      {
        text: 'Yes',
        role: 'confirm',
      },
      {
        text: 'No',
        role: 'cancel',
      },
    ],
  });

  await actionSheet.present();
  const { role } = await actionSheet.onWillDismiss();
  console.log(role)
  return role
}

export const useImageModal = async (image: string, header: string) => {

  const src = (image);

  const alert = await alertController.create({
    header: header,
    //subHeader: 'Important message',
    message: `<div class="cont">
      <div class="img-position">
        <ion-img src="${src}">
  
        </ion-img>
      </div>
      <div class="img-modal-footer">
        <Ion-buttons>
          <ion-button color="danger" @click="">
            EDIT <!--<ion-icon :icon="createOutline" slot="start"></ion-icon>-->
          </ion-button>
          <ion-button color="primary" @click="">
          VIEW  
          <!-- <ion-icon :icon="informationCircleOutline" slot="end"></ion-icon>-->
          </ion-button>
        </Ion-buttons>
      </div>
    </div>`,
    cssClass: 'img-modal',
    animated: true,
    // buttons: [
    //   {
    //     text: '&bigstar;',
    //     role: 'cancel',
    //     handler: () => {
    //       handlerMessage.value = 'Alert canceled';
    //     },
    //   },
    //   {
    //     text: 'OK',
    //     role: 'confirm',
    //     handler: () => {
    //       handlerMessage.value = 'Alert confirmed';
    //     },
    //   },
    // ],
  });

  await alert.present();
};

export function sendActivation(reci_name, email) {
  try {
    const code = uuid() + uuid()

    emailjs.send(KEY.SERVICE_ID, KEY.EMAIL_TEMP, {
      subject: "Account Activation",
      to_name: reci_name,
      from_name: KEY.COMPANY_NAME,
      message: `Welcome!, Please click the link below to activate your account 
      
      ${KEY.URL}email/verify/${code}
      Thanks for your confidence in us to serve you`,
      to_email: email

    }, KEY.USER_ID);
    return code

  } catch (error) {
    console.log({ error })
  }

}

export function getDateOnly() {
  var utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  return utc
}

export function numberShortner(num) {
num = parseInt(num)
  if (String(num).length < 4) {
    return num
  } else if (String(num).length < 7) {
    return Math.floor(num / 1000) + 'K';
  } else if (String(num).length < 10) {

    return Math.floor(num / 1000000) + 'M';
  } else if (String(num).length < 13) {
    return Math.floor(num / 1000000000) + 'B';
  } else if (String(num).length < 16) {
    return Math.floor(num / 1000000000000) + 'T';
  } else if (String(num).length < 19) {
    return Math.floor(num / 1000000000000000) + 'E';
  }
}
