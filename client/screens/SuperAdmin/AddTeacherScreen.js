import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import { GET_ALL_TEACHERS } from "./SuperAdminListTeachers";

const ADD_TEACHER = gql`
  mutation AddTeacher(
    $dni: String!
    $name: String!
    $lastname: String!
    $email: String!
    $whatsapp: String!
    $address: String
  ) {
    createTeacher(
      input: {
        dni: $dni
        name: $name
        lastname: $lastname
        email: $email
        whatsapp: $whatsapp
        address: $address
      }
    ) {
      name
    }
  }
`;

function AddTeacherScreen({ navigation }) {
  const [teacher, setTeacher] = useState({
    name: "",
    lastname: "",
    address: "",
    email: "",
    birthdate: "",
    whatsapp: "",
    course: "",
    dni: "",
  });

  const handleChange = (name, value) => {
    setTeacher({ ...teacher, [name]: value });
  };

  const [createTeacher, { data, error }] = useMutation(ADD_TEACHER);

  const handleOnPress = async ({
    name,
    lastname,
    dni,
    email,
    whatsapp,
    address,
  }) => {
    try {
      await createTeacher({
        variables: {
          name,
          lastname,
          dni,
          email,
          whatsapp,
          address,
        },
        refetchQueries: [{ query: GET_ALL_TEACHERS }],
      });
      if (error) {
        console.log(error);
        return false;
      }
      Alert.alert(
        "Excelente!",
        `El profesor ${name} ${lastname} fue agregado exitosamente!`,
        [
          {
            text: "Ok",
            onPress: () => navigation.navigate("SuperAdminListTeachers")
          }
        ]
      )
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Datos del Profesor</Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(value) => handleChange("name", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Apellido"
            onChangeText={(value) => handleChange("lastname", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => handleChange("email", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefono"
            onChangeText={(value) => handleChange("whatsapp", value)}
          />

          <TextInput
            style={styles.input}
            placeholder="Direccion"
            onChangeText={(value) => handleChange("address", value)}
          />

          {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthdate', valuepicture */}

          <TextInput
            style={styles.input}
            placeholder="DNI"
            onChangeText={(value) => handleChange("dni", value)}
          />
        </View>
        <View>
          <Button
            style={styles.button}
            title="Agregar Profesor"
            onPress={() => handleOnPress(teacher)}
          />
        </View>
      </View>
    </ScrollView>
  );
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
    // padding: 10,
    borderBottomWidth: 2,
    borderColor: "#2290CD",
  },
  button: {
    backgroundColor: "skyblue",
  },
});

export default AddTeacherScreen;
