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
import { useMutation, gql, useQuery } from "@apollo/client";
import CenterView from "../../utils/CenterView";
import { GET_STUDENTS } from "./SuperAdminListStudents";
import { Picker } from "@react-native-picker/picker";

const EDIT_STUDENT = gql`
  mutation AddStudent(
    $_id: ID!
    $dni: String
    $name: String
    $lastname: String
    $email: String
    $whatsapp: String
    $picture: String
    $address: String
    $course: ID
  ) {
    editStudent(
      _id: $_id
      input: {
        dni: $dni
        name: $name
        lastname: $lastname
        email: $email
        whatsapp: $whatsapp
        picture: $picture
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

const GET_STUDENT = gql`
  query Students($_id: ID) {
    students(_id: $_id) {
      _id
      dni
      name
      lastname
      email
      whatsapp
      address
      birthday
      picture
      course {
        _id
        name
      }
    }
  }
`;
function EditStudentScreen({ route, navigation }) {
  const { studentId } = route.params;
  const [student, setStudent] = useState({
    // dni: "",
    name: "",
    lastname: "",
    email: "",
    whatsapp: "",
    address: "",
    birthday: "",
    picture: "",
    // course: "",
  });

  const { data: dataGet, loading: loadingGet, error: errorGet } = useQuery(
    GET_ALL_COURSES
  );

  const { data, loading: queryLoading, error: queryError } = useQuery(
    GET_STUDENT,
    {
      variables: {
        _id: studentId,
      },
    }
  );
  const [editStudent, { loading, error }] = useMutation(EDIT_STUDENT);

  const handleChange = (name, value) => {
    setStudent({ ...student, [name]: value });
  };

  const handleOnPress = ({
    dni,
    name,
    lastname,
    email,
    whatsapp,
    address,
    picture,
    course,
  }) => {
    Alert.alert(
      "Editar Alumno",
      `Se sobreescribiran los datos del alumno.
        ¿Desea continuar?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              // falta agregar el ID para que funque
              if (course){
              await editStudent({
                variables: {
                  _id: studentId,
                  dni,
                  name,
                  lastname,
                  email,
                  whatsapp,
                  address,
                  picture,
                  course,
                },
                refetchQueries: [{ query: GET_STUDENTS }],
              })}
              else {
                await editStudent({
                  variables: {
                    _id: studentId,
                    dni,
                    name,
                    lastname,
                    email,
                    whatsapp,
                    address,
                    picture,
                  },
                  refetchQueries: [{ query: GET_STUDENTS }],
                }) 
              }
              if (error) {
                console.log(error);
                return false;
              }
              // return alert(`El alumno ${name} fue actualizado exitosamente!`);

              Alert.alert(
                "Excelente!",
                `El alumno ${name} fue actualizado exitosamente!`,
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
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (queryLoading || loading || loadingGet)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (error || queryError || errorGet)
    return (
      <CenterView>
        <Text>{error && JSON.stringify(error)}</Text>
        <Text>{queryError && JSON.stringify(queryError)}</Text>
      </CenterView>
    );

  if (data || dataGet) {
    const [
      { name, lastname, dni, email, whatsapp, address, picture, course },
    ] = data.students;
    const courses = dataGet.courses;

    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Datos del Alumno</Text>

          <View>
            <TextInput
              style={styles.input}
              placeholder={name ? `Nombre: ${name}` : "Agregar nombre..."}
              onChangeText={(value) => handleChange("name", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                lastname ? `Apellido: ${lastname}` : "Agregar apellido..."
              }
              onChangeText={(value) => handleChange("lastname", value)}
            />

            {/* <TextInput
              style={styles.input}
              placeholder={dni ? `DNI: ${dni}` : "Agregar DNI..."}
              onChangeText={(value) => handleChange("dni", value)}
            /> */}

            <TextInput
              style={styles.input}
              placeholder={email ? `Apellido: ${email}` : "Agregar email..."}
              onChangeText={(value) => handleChange("email", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                whatsapp ? `Teléfono: ${whatsapp}` : "Agregar telefono..."
              }
              onChangeText={(value) => handleChange("whatsapp", value)}
            />

            <TextInput
              style={styles.input}
              placeholder={
                address ? `Direccion: ${address}` : "Agregar dirección..."
              }
              onChangeText={(value) => handleChange("address", value)}
            />

            {/* <TextInput style={styles.input} placeholder="Fecha de Nacimiento" onChangeText={(value) => handleChange('birthday', value)}/> */}

            <TextInput
              style={styles.input}
              placeholder={picture ? `Foto: ${picture}` : "Agregar foto..."}
              onChangeText={(value) => handleChange("picture", value)}
            />
          </View>
          {/* <View>
            <Picker
              selectedValue={course}
              style={{ height: 200, width: 150 }}
              onValueChange={(value) => handleChange("course", value)}
            >
              <Picker.Item label="" value="null" />
              {courses.length ? (
                courses.map((course) => {
                  return (
                    <Picker.Item
                      key={course._id}
                      label={course.name}
                      value={course._id}
                    />
                  );
                })
              ) : (
                <CenterView>
                  <Text>No hay cursos agregados</Text>
                </CenterView>
              )}
            </Picker>
          </View> */}
          <View>
            <Button
              style={styles.button}
              title="Actualizar Alumno"
              onPress={() => handleOnPress(student)}
            />
          </View>
        </View>
      </ScrollView>
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
    borderBottomWidth: 2,
    borderColor: "#2290CD",
  },
  button: {
    backgroundColor: "skyblue",
  },
});

export default EditStudentScreen;
