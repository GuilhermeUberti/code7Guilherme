import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './src/store';
import { SafeAreaView, Text } from 'react-native';

const Teste = () => {
  return (
    <SafeAreaView>
      <Text>...</Text>
    </SafeAreaView>
  );
}

export default () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Teste></Teste>
    </PersistGate>
  </Provider>
)
