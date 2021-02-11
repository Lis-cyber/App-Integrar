import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Divider } from 'react-native-paper';

export const GET_A_STUDENT_SUBJECTS = gql`
  query GetAStudentSubjects($dni: String) {
    students(dni: $dni) {
      name
      lastname
      _id
      course {
        name
        _id
        subjects {
          name
          _id
        }
      }
    }
  }
`;

const colors = [
  "#70CE12",
  "#35C8B4",
  "#1EA4F6",
  "#F91E1E",
  "#F61EA1",
  "#DC1EF6",
  "#561EF6",
  "#1EE2F6",
  "#1EF669",
  "#1CCC71",
  "#1EA4F6",
  "#1E56F6",
  "#F9A31E",
  "#F61E49",
  "#F61E2B",
  "#1EF669",
  "#3FF61E",
  "#1EF669",
  "#CC741C",
];

const StudentsSubjects = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_A_STUDENT_SUBJECTS, {
    variables: { dni },
  });

  if (loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    const student = data.students[0];

    return (
      <CenterView>
        <Text style={styles.text}>{student.course.name}</Text>
        {student.course.subjects.length ? (
          <FlatList
            data={student.course.subjects}
            renderItem={({ item, index }) => {
              return (
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor=""
                  key={item._id}
                  onPress={() =>
                    navigation.navigate("StudentSubjectDetail", {
                      id: item._id
                    })
                  }
                  style={{
                    backgroundColor: colors[index],
                    margin: 5,
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: 300,
                    fontWeight: "bold",
                  }}
                >
                  <Text style={styles.touchText}>{item.name}</Text>
                </TouchableHighlight>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>Este curso no tiene materias asignadas</Text>
          </CenterView>
        )}
      </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    padding: 5,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    color: "#443F3F",
    fontWeight: "bold",
    textShadowColor: "#C6B5B5",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  touchText: {
    fontSize: 16,
    color: "#ECDBDB",
    fontWeight: "bold",
    textShadowColor: "#232121",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  
});

export default StudentsSubjects;
