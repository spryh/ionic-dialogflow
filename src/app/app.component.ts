import { Component } from '@angular/core'
import { Platform } from 'ionic-angular'
import { StatusBar } from '@ionic-native/status-bar'
import { SplashScreen } from '@ionic-native/splash-screen'
import { HomePage } from '../pages/home/home'

// window will allow us to use the browser's JS library
declare var window

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault()
      splashScreen.hide() //show() 

      window['ApiAIPlugin'].init(
        {
          clientAccessToken: '3b0c740693694c5cb33d756b58c14da4', // from https://console.dialogflow.com/ Gear icon
          lang: 'en' // set lang tag from list of supported languages
        },
        //function(result) {       //Remove the alerting for startup
          //alert(result)},
        // function(error) {
        //   alert(error)
        // }
      )
    })
  }
}
