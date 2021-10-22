import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Modal, KeyboardAvoidingView, TouchableOpacity , Keyboard, ScrollView, AsyncStorage} from 'react-native';
import Task from '../components/Task';
import api from '../services/api';


function initialState() {
  return {
  marca: "", 
  valor: 0, 
  quantidade: 0,
  } }
const TelaPrincipal = () => {
  const [task, setTask] = useState();
  const [modalVisibility, setmodalVisibility] = useState(false);
  const [taskItems, setTaskItems] = useState([]);
  const [purchases, setPurchases] = useState([])
  const [values, setValues] = useState(initialState);
  const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzE4OWNkNmE2YTQ0MTRhYTQ5MTM4YyIsImlhdCI6MTYzNDgzNzYxMiwiZXhwIjoxNjM0OTI0MDEyfQ.a6yEfMMt1cTJYUY5U3WK9Ah-E9DNXDGTPg25m2cmdT0")
  const ttSave = async () => {
    token = await AsyncStorage.getItem('@Zeus:token');
 
  }
  
  useEffect(()=>{
    ttSave();
  }, [])


  useEffect(() => {
    console.log("fndhfsfdjshfj")
    api.get("/secondpage/get_many", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data)
        setPurchases(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])


  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const sendTransaction = async () => {
    console.log(token);
    const data = values;
    console.log(data, "aaa", token)
try {
    await api.post("/secondpage/create", data, {
        headers: {
            Authorization: `Bearer ${token}`,
          },
        });  
    } catch (err) {
        console.log(err);
  
    }

    Keyboard.dismiss();

}



  return (
    <View style={styles.container}>
         <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      <View style={styles.tasksWrapper}>
        <View style={styles.itemss}>
          
     <Text style={styles.it}> Marca</Text>
     <Text style={styles.it}> Qtd de ração</Text>
     <Text style={styles.it}> Valor</Text>
     <Text style={styles.it}> Data</Text>

        </View>
        <View>
     {purchases.map((purchase) => {
 return (
 <View  key={purchase._id} style={styles.items}>
 <Text style={styles.it}>  {purchase.marca}</Text>
 <Text style={styles.it}> {purchase.quantidade}</Text>
 <Text style={styles.it}>  {purchase.valor}</Text>
   <Text style={styles.it}>  {`${purchase.data.slice(5, 7)}/${purchase.data.slice(8, 10)}/${purchase.data.slice(0, 4)}`}</Text>
 </View>
  )})}
        </View>
      </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.inputGroup}>
        <TextInput style={styles.input} placeholder={'marca'}  onChangeText={(e) => {setValues({...values, marca:e})}} />
        <TextInput style={styles.input} placeholder={'valor'}  onChangeText={(e) => {setValues({...values, valor:e})}} />
        <TextInput style={styles.input} placeholder={'data'}  onChangeText={(e) => {setValues({...values, data:e})}} />

        <TextInput style={styles.input} placeholder={'quantidade'}  onChangeText={(e) => {setValues({...values, quantidade:e})}} />
        </View>

            



        <TouchableOpacity onPress={sendTransaction}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              +
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    textAlign: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  it: {
    width: '20%',
    textAlign: 'center'
  },
  itemss: {
    alignItems: 'center',

    textAlign: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'column',

  },
});

export default TelaPrincipal;