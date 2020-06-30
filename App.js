console.disableYellowBox = true;
import React, { Component } from 'react';
// provides stores two various components within the application (splash screen)
import { Provider } from 'mobx-react';
import AppNavigator from './app/app.navigator';
import stores from './app/stores';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import custom from './native-base-theme/variables/custom';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider stores={stores}>
        <StyleProvider style={getTheme(custom)}>
          <AppNavigator />
        </StyleProvider>
      </Provider>
    );
  }
}