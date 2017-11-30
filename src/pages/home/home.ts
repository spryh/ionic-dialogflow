import { Component, NgZone } from '@angular/core'
import { NavController } from 'ionic-angular'

declare var window

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messageArr: any[] = []
  inputText: string = '' // bind with ngModel on home.html

  constructor(public navCtrl: NavController, public ngZone: NgZone) {
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
}
