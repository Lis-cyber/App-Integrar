import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import { GET_ALL_MODULES_SUBJECT } from "./TeacherListModules"
import CenterView from "../../utils/CenterView"



const ADD_MODULE = gql`
  mutation CreateModule($input: ModuleInput) {
    createModule(input: $input) {
      name
      test
      subject {
        _id 
      }
    }
  },
`

function AddModuleToSubject({ navigation, route }) {
  const { _id } = route.params;
  const [createModule, {error, loading, data}] = useMutation(ADD_MODULE);
  const [unit, setUnit] = useState({
    name: "",
  });
 
    
  const handleChange = (prop, value) => {
    setUnit({ ...unit, [prop]: value});
  };
  
  const handleOnPress = async ({
    name,
  }) => {
    try {
      await createModule({
        variables: {
          input:{
            name,
            subject: _id
          }
        },
        refetchQueries: [{ query: GET_ALL_MODULES_SUBJECT }]
      });
      

      Alert.alert(
        "Excelente!",
        `La unidad ${name} fue agregada exitosamente!`,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("TeacherListSubjects")
          }
        ]
      )
    } catch (err) {
      console.error(err);
    }
  }

  if (error) {
    console.log(error);
    return <View><Text>{JSON.stringify(error)}</Text></View>;
  }

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos de la Unidad</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={unit.moduleInput}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Unidad"
            onPress={() => handleOnPress(unit, _id)}
          />
        </View>
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginTop: 2,
  },
  title: {
    fontSize: 15,
    margin: 10,
  },
  input: {
    width: 200,
    height: 50,
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: "#2290CD",
  },
  button: {
    backgroundColor: "skyblue",
  },
});


export default AddModuleToSubject;
