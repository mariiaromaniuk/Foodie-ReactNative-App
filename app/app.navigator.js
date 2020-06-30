import React from 'react';
import { DrawerNavigator, StackNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import SplashScreen from './screens/splash.screen';
import LoginScreen from './screens/login.screen';
import MatchScreen from './screens/match.screen';
import PostScreen from './screens/post.screen';
import { ScrollView } from 'react-native';
import { Button, Icon } from 'native-base';

const hiddenItems = [
    'Splash',
    'Login'
];

const SideBar = (props) => {
    const propsClone = {
        ...props,
        items: props.items.filter(item => !hiddenItems.includes(item.key))
    }
    return (
        <ScrollView>
            <DrawerItems {...propsClone} />
        </ScrollView>
    )
}

const MenuButton = ({ navigate }) => (
    <Button transparent
        onPress={() => {
            navigate('DrawerOpen')
        }}>
        <Icon style={{ color: "#fff" }} size={28} name="menu" />
    </Button>
)

const Splash = {
    screen: SplashScreen,
    navigationOptions: {
        header: null
    }
}

const Login = {
    screen: LoginScreen,
    navigationOptions: {
        header: null
    }
}

const Match = {
    screen: MatchScreen,
    navigationOptions: {
        // changes the title of our header on that screen to Matches
        headerMode: 'screen',
        headerTitle: 'Matches',
        // tells our drawerNavigator that this Match screen has 
        // a label of matches to render in the side menu
        drawerLabel: 'Matches'
    }
}

const Post = {
    screen: PostScreen,
    navigationOptions: {
        headerMode: 'screen',
        headerTitle: 'Post'
    }
}

const MatchStack = StackNavigator({
    Match: Match,
    Post: Post
}, {
    navigationOptions: ({ navigation, HeaderProps }) => ({
        headerLeft: <MenuButton navigate={navigation.navigate} />,
        headerStyle: { backgroundColor: "#000" },
        headerTintColor: "#fff"
    })
})

const RouteConfig = {
    initialRoute: 'Splash',
    contentComponent: SideBar,
    navigationOptions: {
        gesturesEnabled: false
    }
}

// It takes in a route mapping - the different screens of our application
const AppNavigator = DrawerNavigator({
    Splash: Splash,
    Login: Login,
    // another Config in line for Match that tells it the
    // screen we want to render is this new MatchStack
    Match: { screen: MatchStack }
}, RouteConfig)

export default AppNavigator;