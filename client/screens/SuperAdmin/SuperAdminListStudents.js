import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { Icon } from "react-native-elements";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Card } from "react-native-paper";

export const GET_STUDENTS = gql`
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

const DELETE_STUDENT = gql`
  mutation DeleteStudent($_id: ID) {
    deleteStudent(_id: $_id) {
      name
    }
  }
`;

function SuperAdminListStudents({ navigation }) {
  const { loading, data, error } = useQuery(GET_STUDENTS);
  const [deleteStudent, mutationData] = useMutation(DELETE_STUDENT);

  if (loading || mutationData.loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (error || mutationData.error) {
    console.log(error);
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  } else if (data || mutationData.data) {
    const { students } = data;
    return (
      <View style={styles.centerView}>
        <View style={styles.principal}>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor=""
              style={{ width: 180 }}
              onPress={() => navigation.navigate("AddStudent")}
            >
              <Text style={styles.touchText}>AGREGAR ALUMNO</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.touch}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor=""
              style={{ width: 230 }}
              onPress={() => navigation.navigate("CreateStudentsCsv")}
            >
              <Text style={styles.touchText2}>AGREGAR ALUMNOS CON CSV</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={students}
            renderItem={({ item: { _id, name, lastname, dni, course } }) => {
              return (
                <Card key={_id} style={styles.card}>
                  <View style={styles.first}>
                    <Text style={styles.name}>{`${name} ${lastname}`}</Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor=""
                      onPress={() => {
                        navigation.navigate("AdminStudentDetail", {
                          _id: _id,
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
                      style={styles.imgCont}
                      onPress={() => {
                        navigation.navigate("EditStudent", {
                          studentId: _id,
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
                      style={styles.onPress}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar usuario",
                          `¿Está seguro que desea eliminar al alumno ${name}?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteStudent({
                                  variables: { _id },
                                  refetchQueries: [{ query: GET_STUDENTS }],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.img2}>X</Text>
                    </TouchableHighlight>
                  </View>
                  <View style={styles.desc}>
                    {course?.name ? (
                      <Text>
                        DNI: {dni} | Curso: {course.name}
                      </Text>
                    ) : (
                      <Text>DNI: {dni}</Text>
                    )}
                  </View>
                </Card>
              );
            }}
            keyExtractor={({ _id }) => _id}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  first: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 14,
  },
  card: {
    minWidth: 360,
    minHeight: 70,
    margin: 5,
    alignItems: "flex-start",
    flexDirection: "column",
  },
  img: {
    width: 14,
    height: 14,
    marginTop: 10,
    marginRight: 25,
  },

  img2: {
    color: "white",
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    width: 230,
    color: "#000000",
    margin: 10,
    fontWeight: "bold",
  },
  desc: {
    flexDirection: "row",
    marginLeft: 10,
  },
  description: {
    fontSize: 14,

    color: "#000000",
    marginLeft: 10,
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touchText2: {
    marginTop: 5,
    marginBottom: 20,
    // fontFamily: "roboto",
    fontSize: 14,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  onPress: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginTop: 5,
    width: 30,
    height: 32,
    justifyContent: "center",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
  },
});
export default SuperAdminListStudents;

// <ScrollView>
//   <View style={styles.principal}>
//     <Text
//       style={{
//         fontSize: 25,
//         // marginBottom: 20,
//         // marginTop: 20,
//         marginLeft: 20,
//       }}
//     >
//       Estudiantes
//     </Text>
//     {data.students ? (
//       <FlatList
//         data={data.students}
//         keyExtractor={({ _id }) => _id}
//         renderItem={({ item: { _id, name, dni } }) => {
//           return (
//             <Card
//             key={_id}
//             style={{
//               margin: 5,
//               backgroundColor: "#00aadd",
//               borderRadius: 10,
//               padding: 20,
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             >
//               <Text
//                 style={{
//                   fontSize: 20,
//                   padding: 10,
//                 }}
//               >
//                 Nombre: {name}
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   padding: 10,
//                 }}
//               >
//                 Apellido: {lastname}
//               </Text>
//             </Card>
//           );
//         }}
//       />
//     ) : (
//       <View>
//         <Text>Nada</Text>
//       </View>
//     )}
//   </View>
// </ScrollView>
