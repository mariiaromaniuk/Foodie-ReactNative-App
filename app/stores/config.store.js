import firebase from 'firebase';

// get the configuration from the Firebase website
const config = {
    apiKey: "AIzaSyCgrDtSEJtwMKF6clLNERSxJp_KVuJ_p-4",
    authDomain: "foodie-a548b.firebaseapp.com",
    databaseURL: "https://foodie-a548b.firebaseio.com",
    projectId: "foodie-a548b",
    storageBucket: "foodie-a548b.appspot.com",
    messagingSenderId: "624267068140",
    appId: "1:624267068140:web:b8a00c02e07c90b9b61bc9",
    measurementId: "G-ZY1EXX4WC5"
};

export default class ConfigStore {
  constructor() {
    firebase.initializeApp(config);
    // amount of thime splash will be displayed (ms)
    this.splashTime = 1000;
    this.splashImg = require('../../images/splash.jpg');
    this.loginBG = require('../../images/login.jpg');
  }
  get SplashImg() {
    return this.splashImg;
  }
  get SplashTime() {
    return this.splashTime;
  }
  get LoginBG() {
    return this.loginBG;
  }
}
