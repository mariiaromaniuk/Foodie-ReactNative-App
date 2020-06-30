import { observable, action } from 'mobx';
import firebase from 'firebase';

export default class AuthStore {
    @observable authUser = null;

    constructor() {
        // listener handler
        // when the authentication state changes in firebase, 
        // it calls this handler and updates our user
        firebase.auth().onAuthStateChanged((user) => {
            // when this user changed mobx will tell that login 
            // screen it needs to update and re-render
            this.authUser = user;
        });
    }

    // actions are mobx functions that cause side effects back to the database. 
    // signIn method sends data to the db and changes the state of authenticated user.
    @action
    signIn({ email, password }) {
        if (this.authUser) {
            return Promise.resolve(this.authUser);
        }
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
}
