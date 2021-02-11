import React, { useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useMutation, gql } from "@apollo/client";
import { GET_ALL_COURSES } from "./SuperAdminListCourses"

const CREATE_COURSE = gql`
  mutation CreateCourse( $input: CourseInput) {
    createCourse(input: $input) {
      name
      grade {
        _id
      }
    }
  }
`;


const AddCourseScreen = ({ navigation, route }) => {
  const _id = route.params.params
  const [createCourse, { data, error }] = useMutation(CREATE_COURSE, {
    variables: { _id },
  });
  
  const [inputs, setInputs] = useState({
    course: "",
  });

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  }


  const handleSubmit = async (name, _id) => {
    try { 
      await createCourse({
      variables: { input: { name, grade: { _id } } },
      refetchQueries: [ { query: GET_ALL_COURSES }]
    })
    alert(`El curso ${name} fue agregado exitosamente!`)
    navigation.navigate("SuperAdminListCourses", { screen: "SuperAdminListCourses" })
  }
    catch (error) {
      console.log(error);
      return false;
    }
  
  }  
  

  return (
    <CenterView>
      <Text style={styles.title}>AGREGAR CURSO</Text>
      <View>
        <Text style={styles.description}>Curso</Text>
        <TextInput
          style={styles.input}
          placeholder="Curso..."
          value={inputs.courseInput}
          onChangeText={(text) => handleChange(text, "course")}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        underlayColor="lightblue"
        style={styles.button}
        onPress={()=>handleSubmit(inputs.course, _id)}
      >
        <Text style={styles.textButton}>AGREGAR</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 45,
  },
  description: {
    //fontFamily: 'roboto',
    fontSize: 20,
    color: "#000000",
    marginBottom: 2,
    marginLeft: 2,
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 60,
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
    // fontFamily: 'roboto',
    fontSize: 16,
    color: "white",
  },
});

export default AddCourseScreen;
