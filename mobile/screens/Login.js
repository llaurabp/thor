import React , {useEffect, useState} from 'react';
import { Button, View, Text, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from "../hooks/auth";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import api from '../services/api';
const Login = ({navigation}) => {
  function initialState() {
    return { 
        email: "",
        senha: "",
    }
}

const [values, setValues] = useState(initialState);
const { signIn } = useAuth();
const validateCheckin = async () => {
  const data = values;

  await signIn({
      email: data.email,
      senha: data.senha,
    });

    navigation.navigate('TelaPrincipal')
 console.log(AsyncStorage.getItem('@Zeus:token'));
}
  return (
  <View style={styles.login}>
    <Text title={'Projeto Thor'}/>
  <TextInput
  style={styles.input}
  placeholder={'E-mail'}
  onChangeText={(text) => {setValues({...values, email:text})}}
>    
  </TextInput>

<TextInput
  style={styles.input}
  placeholder={'Senha'}
  onChangeText={(text) => {setValues({...values, senha:text})}}
>
  </TextInput>
  
  <Button
  title={'Entrar'}
  onPress={validateCheckin}
  // onPress={console.log(values)}
  />
 
  </View>
)
}

const styles = StyleSheet.create({
    login: {
         flex: 1, 
         justifyContent: 'center', 
         alignItems: 'center',
    },
    input: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderRadius: 60,
      borderColor: '#c0c0c0',
      borderWidth: 1,
      width: 250,
  
    },
})
export default Login;