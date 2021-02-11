import React from "react";
import { FlatList } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import { gql, useQuery, useMutation } from "@apollo/client";
import CenterView from "../../utils/CenterView";

export const GET_ALL_COURSES = gql`
  query GetCoursesFromAGrade($_id: ID) {
    grades(_id: $_id) {
      _id
      name
      courses {
        _id
        name
      }
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($_id: ID) {
    deleteCourse(_id: $_id) {
      name
    }
  }
`;

const SuperAdminListCourses = ({ navigation, route }) => {
  const { id: _id } = route.params.params;
  const { data, loading, error } = useQuery(GET_ALL_COURSES, {
    variables: { _id },
  });
  const [deleteCourse, mutationData] = useMutation(DELETE_COURSE);

  if (loading || mutationData.loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (data) {
    const courses = data.grades[0].courses;

    return (
      <View style={styles.cont}>
        <TouchableHighlight
          activeOpacity={0.6}
          style={styles.touch}
          underlayColor=""
          onPress={() =>
            navigation.navigate("SuperAdminAddCourse", {
              screen: "SuperAdminAddCourse",
              params: _id,
            })
          }
        >
          <Text style={styles.touchText}>Agregar Curso</Text>
        </TouchableHighlight>
        {/* <TouchableHighlight
          activeOpacity={0.6}
          underlayColor=""
          style={styles.touch}
          onPress={() => navigation.navigate("SuperAdminAddSubject")}
        >
          <Text style={styles.touchText}>Agregar Materia</Text>
        </TouchableHighlight> */}
        {courses.length ? (
          <FlatList
            data={courses}
            renderItem={({ item }) => {
              return (
                <Card key={item._id} style={styles.card}>
                  <View style={styles.cardIn}>
                    <Text 
                    style={styles.cardText}
                    onPress={() => {
                      navigation.navigate("ListStudentsByCourse", {
                        params: { _id: item._id },
                      });}}
                    >{item.name}</Text>
                    <Text
                      style={styles.cardSee}
                      onPress={() => {
                        navigation.navigate("SuperAdminListSubjects", {
                          params: { _id: item._id },
                        });
                      }}
                    >
                      Ver materias
                    </Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor=""
                      style={styles.onPress}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar curso",
                          `¿Está seguro que desea eliminar este curso ${item.name}?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteCourse({
                                  variables: { _id: item._id },
                                  refetchQueries: [{ query: GET_ALL_COURSES }],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.img}>X</Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        ) : (
          <CenterView>
            <Text>No hay cursos agregados para este grado</Text>
          </CenterView>
        )}
      </View>
    );
  } else if (error || mutationData.error){
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 12,
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
  cardSee: {
    fontSize: 17,
    padding: 10,
    color: "white",
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    color: "white",
    marginLeft: 20, 
  },
  onPress: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginRight: 15,
    width: 30,
    height: 32,
    justifyContent: "center",
  },
  img: {
    color: "white",
    fontSize: 18,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 344,
  },
});

export default SuperAdminListCourses;
