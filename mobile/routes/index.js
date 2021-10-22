import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import TelaPrincipal from '../screens/TelaPrincipal';
import React from 'react';
const { Navigator, Screen } = createStackNavigator();
const Routes = () => {
return (
<Navigator>
<Screen name="Login" component={Login} />
<Screen name="TelaPrincipal" component={TelaPrincipal} />
</Navigator>
)
}
export default Routes;