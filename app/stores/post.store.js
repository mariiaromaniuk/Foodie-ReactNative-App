import { action } from 'mobx'
import firebase from 'firebase';
import MobxFirebaseStore from 'mobx-firebase-store';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const base = 'posts';

export default class PostStore extends MobxFirebaseStore {
  constructor() {
    super(firebase.database().ref())
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if (this.user) {
          // set up our firebase storage, where we'll store our images
        this.storage = firebase.storage().ref(this.user.uid);
      }
    })
  }
  // for our mobx firebase store and firebase nest to get access to our subscription content
  subs() {
    return [{
      subKey: base,
      asList: true,
      path: base
    }]
  }

  // modify our database
  @action
  add(text, url) {
    let post = { text: text, created: Date.now(), user: this.user.uid, url: url};
    // pushes on a new object to this path and gives us back the key from that new object
    let key = this.fb.child(base).push().key;

    let updates = {}
    updates['/' + base + '/' + key] = post;
    this.fb.update(updates);
  }

  @action
  postImage(img, cb) {
    let uri = RNFetchBlob.wrap(img.path)
    Blob.build(uri, {type: img.type})
      .then((blob) => {
        this.storage
          .child(img.fileName)
          .put(blob, {contentType: img.type})
            .then((snap) => {
              cb(snap)
              blob.close()
            })
      })
  }

  
}