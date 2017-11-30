import { Component, NgZone, ViewChild } from '@angular/core'
import { NavController, Content} from 'ionic-angular'
import { TextToSpeech } from '@ionic-native/text-to-speech'

declare var window

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  messageArr: any[] = []
  inputText: string = '' // bind with ngModel on home.html
  @ViewChild(Content) content: Content

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone,
    private tts: TextToSpeech
  ) {
    
    this.messageArr.push({
      msgText: 'Hi, how can I help you?',
      msgSender: 'api'
    })
    this.tts.speak({
      text: 'Hi, how can I help you?',
      locale: 'en-US',
      rate: 1
    })
  }

  sendText() {
    let messsageSend = this.inputText

    this.messageArr.push({
      msgText: messsageSend,
      msgSender: 'me'
    })
    this.content.scrollToBottom(200)

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
        this.content.scrollToBottom(200)
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
        this.ngZone.run(() => {
          this.messageArr.push({
            msgText: response.result.fulfillment.speech,
            msgSender: 'api'
          })
        this.content.scrollToBottom(200)
        })
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }
}
