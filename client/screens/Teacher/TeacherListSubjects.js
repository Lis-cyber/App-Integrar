import React, { useContext } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "../../providers/AuthProvider";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Card } from "react-native-elements";

export const GET_ALL_SUBJECTS_TEACHER = gql`
  query GetSubjectsFromCourseId($dni: String) {
    teachers(dni: $dni) {
      _id
      name
      dni
      subjects {
        _id
        name
        course {
          name
          _id
        }
      }
    }
  }
`;

const TeacherListSubjects = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_ALL_SUBJECTS_TEACHER, {
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
    const subjects = data.teachers[0].subjects;
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 5,
          }}
        >
          {subjects.length ? (
            <Card>
              <Card.Title>
                MATERIAS DE {data.teachers[0].name.toUpperCase()}
              </Card.Title>
              <Card.Divider />
              {subjects.map((subject, i) => {
                return (
                  <View
                    key={subject._id}
                    style={styles.cont}
                  >
                    <Text style={{ fontSize: 18 }}>{subject.name}</Text>
                    <Text style={{ fontSize: 16 }}>{subject.course?.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      underlayColor=""
                      onPress={() =>
                        navigation.navigate("TeacherListModules", {
                          screen: "TeacherListModules",
                          params: { _id: subject._id, courseId: subject.course._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Unidades</Text>
                    </TouchableHighlight>
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY MATERIAS PARA ESTE CURSO</Text>
            </CenterView>
          )}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
      justifyContent: "space-between",
      alignItems: 'center',
      display: "flex",
      flexDirection: "row",
      marginTop: 20,
      marginBottom: 20,
      maxWidth: 900,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 5,
    borderRadius: 3,
    minWidth: 95,
    minHeight: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7
  },
  textHigh: {
    color: "white",
  },
});
export default TeacherListSubjects;
