import { Component, NgZone } from '@angular/core'
import { NavController } from 'ionic-angular'
import { TextToSpeech } from '@ionic-native/text-to-speech'

declare var window

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messageArr: any[] = []
  inputText: string = '' // bind with ngModel on home.html

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone,
    private tts: TextToSpeech
  ) {
    this.messageArr.push({
      msgText: 'Hi, how can I help you?',
      msgSender: 'api'
    })
  }
  sendText() {
    let messsageSend = this.inputText

    this.messageArr.push({
      msgText: messsageSend,
      msgSender: 'me'
    })
    // Clear the local variable
    messsageSend = ''

    window['ApiAIPlugin'].requestText(
      {
        query: this.inputText
      },
      response => {
        this.ngZone.run(() => {
          this.messageArr.push({
            msgText: response.result.fulfillment.speech,
            msgSender: 'api'
          })
        })
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }

  sendVoice() {
    window['ApiAIPlugin'].requestVoice(
      {},
      response => {
        this.tts.speak({
          text: response.result.fulfillment.speech,
          locale: 'en-US',
          rate: 1
        })
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }
}
