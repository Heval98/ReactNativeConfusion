import GlobalStyles from './shared/GlobalStyles';
import React from 'react';
import Main from './components/MainComponent';
import { View } from 'react-native';

export default function App() {
  return (
    <View style={GlobalStyles.droidSafeArea}>
      <Main />
    </View>
  );
}

