import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useMutation, useQuery, gql } from "@apollo/client";
import { GET_STUDENTS } from "./SuperAdminListStudents";
import { Picker } from "@react-native-picker/picker";
import CenterView from "../../utils/CenterView";

const ADD_STUDENT = gql`
  mutation AddStudent(
    $dni: String!
    $name: String!
    $email: String!
    $lastname: String!
    $whatsapp: String!
    $address: String
    $course: ID
  ) {
    createStudent(
      input: {
        dni: $dni
        name: $name
        lastname: $lastname
        email: $email
        whatsapp: $whatsapp
        address: $address
        course: $course
      }
    ) {
      name
    }
  }
`;

const GET_ALL_COURSES = gql`
  {
    courses {
      _id
      name
    }
  }
`;

function AddStudentScreen({ navigation }) {
  const { data: dataGet, loading: loadingGet, error: errorGet } = useQuery(
    GET_ALL_COURSES
  );
  const [student, setStudent] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
    whatsapp: "",
    address: "",
    birthday: "",
    course: "",
  });

  const [createStudent, { error, loading }] = useMutation(ADD_STUDENT);

  const handleChange = (name, value) => {
    setStudent({ ...student, [name]: value });
  };

  const handleOnPress = async ({
    name,
    lastname,
    dni,
    email,
    whatsapp,
    address,
    course
  }) => {
    try {
      console.log('variables: ',name,
        lastname,
        dni,
        email,
        whatsapp,
        address,
        course)
      if (course){
      await createStudent({
        variables: {
          name,
          lastname,
          dni,
          email,
          whatsapp,
          address,
          course
        },
        refetchQueries: [{ query: GET_STUDENTS }],
      })}
      else {
        await createStudent({
          variables: {
            name,
            lastname,
            dni,
            email,
            whatsapp,
            address,
          },
          refetchQueries: [{ query: GET_STUDENTS }],
        })
      }
      if (error) {
        console.log(error);
        return false;
      }

      Alert.alert(
        "Excelente!",
        `El alumno ${name} fue agregado exitosamente!`,
        [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("ListStudents"),
          },
        ]
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  
  };

  if (loadingGet || loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (dataGet) {
    const courses = dataGet.courses;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Datos del Alumno</Text>

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

            {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthday', value)}/> */}

            <TextInput
              style={styles.input}
              placeholder="DNI"
              onChangeText={(value) => handleChange("dni", value)}
            />
          </View>
          <View>
            <Picker
              selectedValue={student.course}
              style={{ height: 200, width: 150 }}
              onValueChange={(value) => handleChange("course", value)}
            >
              <Picker.Item label="" value='null' />
              {courses.length ? (
                courses.map((course) => {
                  return (
                  <Picker.Item key={course._id} label={course.name} value={course._id} />);
                })
              ) : (
                <CenterView>
                  <Text>No hay cursos agregados</Text>
                </CenterView>
              )}
            </Picker>
          </View>

          <View>
            <Button
              style={styles.button}
              title="Agregar Alumno"
              onPress={() => handleOnPress(student)}
            />
          </View>
        </View>
      </ScrollView>
    );
  } else if (errorGet || error) {
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
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

export default AddStudentScreen;
