import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CenterView from "../../utils/CenterView";
import { gql, useMutation, useQuery } from "@apollo/client";

const CREATE_SUBJECT_BY_COURSE_ID = gql`
  mutation CreateSubject($name: String, $course: ID) {
    createSubject(input: { name: $name, course: $course }) {
      _id
      name
      course {
        _id
        name
      }
    }
  }
`;

const GET_SUBJECTS_FROM_COURSE_BY_ID = gql`
  query GetSubjectsFromCourseId($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      subjects {
        _id
        name
      }
    }
  }
`;
const AddSubjectScreen = ({ navigation, route }) => {
  const _id = route.params.params;
  const [subject, setSubject] = useState({ materia: "" });
  const [addSubject, { loading, error }] = useMutation(
    CREATE_SUBJECT_BY_COURSE_ID
  );

  const handleChange = (text, input) => {
    setSubject({ materia: text });
  };

  const handleSubmit = async () => {
    const { materia } = subject;

    try {
      if (materia.length) {
        await addSubject({
          variables: { name: materia, course: _id },
          refetchQueries: [
            { query: GET_SUBJECTS_FROM_COURSE_BY_ID, variables: { _id } },
          ],
        });
        alert(`La asignatura ${materia} fue agregada exitosamente!`);
        navigation.pop();
      }
    } catch (err) {
      console.log("ERROR:");
      console.error(err);
    }
  };

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  return (
    <ScrollView>
      <CenterView>
        <Text style={styles.title}>AGREGAR MATERIA</Text>
        <View>
          <Text style={styles.description}>Materia</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la materia..."
            value={subject}
            onChangeText={(text) => handleChange(text, "subject")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          underlayColor="lightblue"
          style={styles.button}
          onPress={() => handleSubmit()}
        >
          <Text style={styles.textButton}>AGREGAR</Text>
        </TouchableOpacity>
      </CenterView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 25,
    marginTop: 25,
  },
  description: {
    //fontFamily: 'roboto',
    fontSize: 20,
    color: "#000000",
    marginBottom: 5,
    marginLeft: 2,
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 40,
  },
  button: {
    margin: 15,
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "center",
    width: 237,
    height: 50,
    padding: 7,
    borderRadius: 7,
  },
  textButton: {
    fontSize: 20,
    color: "white",
  },
  switchsCont: {
    flexDirection: "column",
    margin: 4,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  switch: {
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  switchsCont2: {
    margin: 3,
  },
});

export default AddSubjectScreen;
