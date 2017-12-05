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
      msgText: 'Hey there! I can check wait times for you at Disney\'s parks. Just ask me \"What parks?\"',
      msgSender: 'api'
    })
    this.tts.speak({
      text: 'Hey there! I can check wait times for you at Disney\'s parks. Just ask me \"What parks?\"',
      locale: 'en-CA',
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
    this.inputText = ''

    window['ApiAIPlugin'].requestText(
      {
        query: messsageSend//this.inputText
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
          locale: 'en-CA',
          rate: 1
        })
        this.ngZone.run(() => {
          this.messageArr.push({
            msgText: response.result.resolvedQuery,
            msgSender: 'me'
          })
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
