import React, {Component} from 'react';
import {
  Button,
  Icon,
  Spinner,
  Card,
  CardItem,
  DeckSwiper
} from 'native-base';
import { StyleSheet, View, Text, Image} from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { createAutoSubscriber, autoSubscriber } from 'firebase-nest';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _autoSubscriberFetching: true,
      _autoSubscriberError: null
    };
  }

  // we're passing stores in through the properties
  static getSubs(props, state) {
    const {auth, matches} = props.stores;
    // if there is a user, call matches.subs.
    // if not - pass back an empty array so we don't error
    return auth.authUser ? matches.subs() : [];
  }
  subscribeSubs(subs, props, state) {
    const { matches } = props.stores;
    // subscribe to this subscription object and return a promise
    return matches.subscribeSubsWithPromise(subs);
  }
  markViewed(match) {
      // firebase nest is going to return us our data in a list. 
      // match is a list of keys and values, which is the data of the actual match. 
      // we want to pass the key to the markViewed()
    this.props.stores.matches.markViewed(match[0]);
  }
  renderCard(post, store) {
      // if we have a post, get the data from the post 
      // otherwise set post object to null
    const postObj = post ? post[1] : null;
    if (postObj) {
      let pic = {uri: postObj.url};
      let text = postObj.text;

      return (
        <Card>
          <CardItem cardBody>
            { pic.uri != undefined && pic.uri != "" ? <Image style={styles.thumbnail} source={pic}/> : null}
          </CardItem>
          <CardItem>
            <Text style={styles.text}>
              {text}
            </Text>
          </CardItem>
        </Card>
      )
    }
    return null;
  }
  renderNoMoreCards() {
    return (
      <Card>
        <CardItem cardBody>
          <Text style={styles.text}> Out of Matches </Text>
        </CardItem>
      </Card>
    )
  }
  render() {
    const {matches, auth} = this.props.stores;
    // firebase-nest needs to know that the user is updated.
    // user is observable it needs to be called from a render()
    const user = auth.authUser;

    const {_autoSubscriberFetching: fetching, _autoSubscriberError: fetchError } = this.state;

    if (fetchError) {
      return <Text style={{backgroundColor: "red"}}>{fetchError}</Text>
    }

    const postList = matches.getData('matches')
    const list = postList ? postList.entries() : null
    return (
      <View>
        { fetching ? <Spinner/> : 
          <DeckSwiper
            dataSource={list}
            renderItem={(card) => this.renderCard(card, matches)}
            renderEmpty={this.renderNoMoreCards.bind(this)}
            looping={false}
            onSwipeRight={(item) => this.markViewed(item)}
            onSwipeLeft={(item) => this.markViewed(item)}
            />
          }
        </View>
        
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  thumbnail: {
    width: 300,
    height: 300,
    flex: 1
  }
});

// makes our match component an observer and adds the auto subscriber capabilities.
// auto subscriber does not provide a decorator unlike observer.
export default autoSubscriber(observer(Match));
