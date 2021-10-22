import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './routes/index';
import AppProvider from './hooks';

const App = () => {


    
 return (
  <AppProvider >

    <NavigationContainer>
      <Routes/>
    </NavigationContainer>
</AppProvider>

 )

}

export default App;