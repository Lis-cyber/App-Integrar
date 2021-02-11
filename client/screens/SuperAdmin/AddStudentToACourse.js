import React from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { Card } from "react-native-elements";
import { gql, useQuery, useMutation } from "@apollo/client";
import CenterView from "../../utils/CenterView";

// export const GET_STUDENTS_WHITIN_COURSES = gql`
//   query GetStudentsWhitinCourses($_id: ID) {
//     students {
//       _id
//       name
//       courses {
//         _id
//         name
//       }
//     }
//   }
// `;
// mutation {
//   editCourse(_id: "6010d7eeb32b4b37a0877eb5",
//     input: { students: {_id: "6009f729f07df02f7c214b3c" }}) {
//     name
//     students {
//       _id
//       name
//     }
//   }
// }
export const GET_ALL_STUDENTS = gql`
  {
    students {
      _id
      name
      lastname
      dni
      course {
        _id
        name
      }
    }
  }
`;

const GET_STUDENTS_BY_COURSE = gql`
  query GetSubjectById($_id: ID) {
    courses(_id: $_id) {
      _id
      name
      students {
        _id
        name
        lastname
        dni
        course{
          _id
          name
        }
      }
    }
  }
`


//ADD_STUDENT_TO_A_COURSE
const EDIT_COURSE = gql`
  mutation EditCourse($_id: ID!, $studentId: ID!) {
    editCourse(_id: $_id, studentId: $studentId) {
      _id
      name
      students{
        _id
        name
        lastname
        dni
        course{
          _id
          name
        }
      }
    }
  }
`;

export default function AddStudentToACourse({ navigation, route }) {
  const id = route.params.params.id;
  const courseName = route.params.params.name;
  const { data, loading, error } = useQuery(GET_ALL_STUDENTS);
  const [
    editCourse,
    { data: mutationData, loading :mutationLoading, error: mutationError },
  ] = useMutation(EDIT_COURSE);
  const handleOnPress = async (studentId, id, name, lastname) => {
    try {
      await editCourse({
        variables: {
          _id: id,
          studentId: studentId,
        },
        refetchQueries: [{ query: GET_STUDENTS_BY_COURSE, variables: {_id: id} }]
      });
      navigation.pop();
      if (mutationError) {
        console.log(mutationError);
        return false;
      }
      return Alert.alert(
        `El alumno ${name} ${lastname} fue agregado exitosamente a ${courseName}!`
      );
    } catch (err) {
      console.error("soy el catch", err);
    }
  };

  if (loading || mutationLoading){
    return (
      <CenterView>
        <ActivityIndicator />
      </CenterView>
    );
  }

  if (data) {
    const { students } = data;
    return (
      <ScrollView>
          <View style={styles.principal}>
            <Card key="01">
              <Card.Title>Agregar Alumno a {courseName}</Card.Title>
              <Card.Divider />
              {students.map((student) => {
                //console.log(student)
                {
                  if (!student.course) {
                    return (
                      <Card key={student._id}>
                        <Text style={styles.prof}>
                          {student.name} {student.lastname}
                        </Text>
                        <Text style={styles.prof}>
                          DNI: {student.dni}
                        </Text>
                        <TouchableHighlight
                          style={styles.onPress}
                          activeOpacity={0.2}
                          underlayColor=""
                          onPress={() =>
                            handleOnPress(
                              student._id,
                              id,
                              student.name,
                              student.lastname,
                              courseName
                            )
                          }
                        >
                          <Text style={styles.cardT}>Agregar</Text>
                        </TouchableHighlight>
                      </Card>
                    );
                  }
                }
              })}
            </Card>
          </View>
      </ScrollView>
    );
  } else if (error || mutationError) {
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
  prof: {
    fontSize: 17,
  },
  onPress: {
    backgroundColor: "#2290CD",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5, 
    maxWidth: 300
  },
  cardT: {
    color: "white",
  },
});
