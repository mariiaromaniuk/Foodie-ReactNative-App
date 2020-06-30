import { action } from 'mobx';
import firebase from 'firebase';
import MobxFirebaseStore from 'mobx-firebase-store';

export default class MatchStore extends MobxFirebaseStore {
  constructor() {
    super(firebase.database().ref());
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  }

  // creates the query we'll use to get the data from our firebase database
  resolveFirebaseQuery(sub) {
      // we want to get our subscription path, order it by the child viewed by this 
      // user ID, and we want that to be equal to null. So if we don't have an entry
      // here, the entry's equal to null, we want to get back that particular item. 
      // If we do have a viewedBy this.user, we don't want that post
    return this.fb.child(sub.path).orderByChild('viewedBy/'+this.user.uid).equalTo(null)
  }
  @action
  markViewed(post) {
    let updates = {};
    updates['viewedBy/'+this.user.uid] = true;
    this.fb.child('posts').child(post).update(updates);
  }
  subs() {
    return [{
      subKey: 'matches',
      path: 'posts',
      asList: true,
      user: this.user
    }]
  }
}