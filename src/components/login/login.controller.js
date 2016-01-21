
//import {default as FirebaseFactory} from '../../core/firebase';

// TODO: Make this whole component less hacky
// * Save the auth info into localstorage or something
import Firebase from 'firebase';
class LoginController {
  constructor($timeout) {
    this.displayName = 'Login';
    this.ref = new Firebase("https://notehub-data.firebaseio.com");
    this.$timeout = $timeout;
    // console.log(this);
    // this.firebaseFactory.setBaseUrl('https://notehub-data.firebaseio.com');
    this.ref.authWithOAuthPopup("google",(error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        // HAX!!!! Use ng-fire instead
        this.$timeout(() => {
          this.authData = authData;
          this.displayName = authData.google.displayName;
          this.buttonText = 'Back to NoteHub';
          console.log("Authenticated successfully!");
          this.updateDisplayName();
        }, 0);
      }
    });
  }

  updateDisplayName() {
    console.log(this);
    this.displayName = this.authData ? this.displayName : 'Login';
  }
}


LoginController.$inject = ['$timeout'];
export default LoginController;