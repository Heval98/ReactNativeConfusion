import GlobalStyles from './shared/GlobalStyles';
import React from 'react';
import Main from './components/MainComponent';

export default function App() {
  return (
    <Main style={GlobalStyles.droidSafeArea} />
  );
}

