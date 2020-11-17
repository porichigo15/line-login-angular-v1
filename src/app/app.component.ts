import { Component, OnInit } from '@angular/core';
import liff from '@line/liff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'line-login-angular-v1';

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: '1655212012-qE4vgdJ5' }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp(): void {
    const idToken = liff.getIDToken();
    console.log(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
    }).catch(err => console.error(err));
  }

  sendMessage(): void {
    if (!liff.isInClient()) {
      this.sendAlertIfNotInClient();
    } else {
      liff.sendMessages([{
        'type': 'text',
        'text': `You've successfully sent a message! Hooray!`
      }]).then(() => {
        window.alert('Message sent');
      }).catch((error) => {
        window.alert('Error sending message: ' + error);
      });
    }
  }

  sendAlertIfNotInClient(): void {
    window.alert('You not logged in');
  }
}
