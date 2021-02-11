import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { Card } from "react-native-paper";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";

export const GET_ALL_TEACHERS = gql`
  {
    teachers {
      _id
      name
      lastname
      subjects {
        name
        course {
          name
          _id
        }
      }
    }
  }
`;

const DELETE_TEACHER = gql`
  mutation DeleteTeacher($_id: ID) {
    deleteTeacher(_id: $_id) {
      name
    }
  }
`;

const SuperAdminListTeachers = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_ALL_TEACHERS);
  const [deleteTeacher, mutationData] = useMutation(DELETE_TEACHER);

  if (loading || mutationData.loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (data) {
    const { teachers, courses, subjects } = data;
    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor=""
              onPress={() => {
                navigation.navigate("AddTeacher");
              }}
            >
              <Text style={styles.touchText}>AGREGAR PROFESOR</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor=""
              onPress={() => {
                navigation.navigate("CreateTeachersCsv");
              }}
            >
              <Text style={styles.touchText}>AGREGAR PROFESORES CON CSV</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={teachers}
            renderItem={({ item: teacher }) => {
              return (
                <Card key={teacher._id} style={styles.card}>
                  <View style={styles.cardcont}>
                    <View style={styles.prof}>
                      <Text style={styles.name}>
                        {teacher.name} {teacher.lastname}
                      </Text>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() => {
                          navigation.navigate("TeacherDetail", {
                            _id: teacher._id,
                          });
                        }}
                      >
                        <Icon
                          name="info"
                          type="font-awesome"
                          size={17}
                          color={`#696969`}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() => {
                          navigation.navigate("EditTeacher", {
                            teacherId: teacher._id,
                          });
                        }}
                      >
                        <Image
                          source={require("../../assets/edit.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() =>
                          Alert.alert(
                            "Eliminar usuario",
                            `¿Está seguro que desea eliminar al profesor ${teacher.name}?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: () =>
                                  deleteTeacher({
                                    variables: { _id: teacher._id },
                                    refetchQueries: [
                                      { query: GET_ALL_TEACHERS },
                                    ],
                                  }),
                              },
                            ]
                          )
                        }
                      >
                        <Image
                          source={require("../../assets/x.png")}
                          style={styles.img}
                        />
                      </TouchableHighlight>
                    </View>
                    <View style={styles.desc}>
                      {teacher.subjects?.length > 0 ? (
                        teacher.subjects.map((subject, i) => {
                          return (
                            <Text key={i} style={styles.description}>
                              {subject.name}: {subject.course?.name}
                              {"  "}|
                            </Text>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
      </View>
    );
  } else if (error || mutationData.error)
    return (
      <View>
        <Text>ERROR</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  card: {
    minWidth: 360,
    minHeight: 70,
    marginTop: 5,
    margin: 5,
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: 'center'
  },
  cardcont: {
    display: "flex",
    flexDirection: "column",
  },
  prof: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  img: {
    width: 14,
    height: 14,
    marginTop: 10,
    marginRight: 20,
  },
  name: {
    fontSize: 16,
    width: 250,
    color: "#000000",
    margin: 10,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
  },
  description: {
    fontSize: 14,
    // fontFamily: "roboto",
    color: "#000000",
    marginLeft: 10,
  },
  touchText: {
    marginTop: 5,
    marginBottom: 5,
    // fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});

export default SuperAdminListTeachers;
