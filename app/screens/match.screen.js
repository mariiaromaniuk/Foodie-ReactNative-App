import React, { Component } from 'react';
import {
    Container,
    Content,
    Icon,
    Button
} from 'native-base';
import { inject } from 'mobx-react';
import Match from '../components/match.component';

@inject("stores")
export default class MatchScreen extends Component {
    constructor(props) {
        super(props);
    }

    // static function that tells React navigation to render in the 
    // right side of the header a transparent button that navigates 
    // to the post screen and it have an icon of white camera.
    static navigationOptions = ({ navigation }) => ({
        headerRight: <Button transparent
            onPress={() => navigation.navigate('Post')}>
            <Icon name='camera' style={{ color: "#fff" }} size={28} />
        </Button>
    })
    render() {
        return (
            <Container>
                <Content scrollEnabled={false} style={{ backgroundColor: "#858585" }}>
                    <Match stores={this.props.stores} />
                </Content>
            </Container>
        )
    }
}