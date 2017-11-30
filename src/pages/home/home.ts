import { Component } from '@angular/core'
import { NavController } from 'ionic-angular'

declare var window

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  messages: any[] = []
  inputText: string = '' // bind with ngModel on home.html

  constructor(public navCtrl: NavController) {
    this.messages.push({
      text: 'Hi, how can I help you?',
      sender: 'api'
    })

    this.messages.push({
      text: this.inputText,
      sender: 'me'
    })
  }
  sendText() {
    window['ApiAIPlugin'].requestText(
      {
        query: this.inputText
      },
      response => {
        alert(JSON.stringify(response))
      },
      error => {
        alert(JSON.stringify(error))
      }
    )
  }
}
