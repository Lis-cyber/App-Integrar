import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery, gql } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_ALL_COURSES_TEACHER = gql`
  query GetCoursesFromATeacher($dni: String) {
    teachers(dni: $dni) {
      _id
      name
      courses {
        _id
        name
      }
      subjects {
        _id
        name
        course {
          _id
          name
        }
      }
    }
  }
`;

const TeacherListCourses = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_ALL_COURSES_TEACHER, {
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
    if (!data.teachers[0].subjects[0]) {
      return (
        <View style={styles.cont}>
          <CenterView>
            <Text>No tienes Cursos asignados</Text>
          </CenterView>
        </View>
      );
    } else {
      const courses = data.teachers[0].subjects[0].course; 

      return (
        <View style={styles.cont}>
          <FlatList
            data={[courses]}
            renderItem={({ item }) => {
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text style={styles.cardText}>{item.name}</Text>
                    <Text
                      style={styles.cardText}
                      onPress={() => {
                        navigation.navigate("TeacherListStudents", {
                          params: { _id: item._id },
                        });
                      }}
                    >
                      Alumnos
                    </Text>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  card: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 325,
  },
});

export default TeacherListCourses;
