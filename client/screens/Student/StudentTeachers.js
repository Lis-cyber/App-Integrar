import React, { useContext, useState, useEffect } from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { Linking } from "react-native";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { AuthContext } from "../../providers/AuthProvider";
import AsyncStorage from "@react-native-community/async-storage";

export const GET_TEACHERS_FROM_STUDENT = gql`
  query GetTeachersFromStudent($dni: String) {
    students(dni: $dni) {
      _id
      name
      course {
        name
        subjects {
          name
          teacher {
            name
            _id
            lastname
            whatsapp
          }
        }
      }
    }
  }
`;

const StudentTeachers = () => {
  const { user } = useContext(AuthContext);
  const dni = user.dni;
  const { data, loading, error } = useQuery(GET_TEACHERS_FROM_STUDENT, {
    variables: { dni },
  });
  const [storageTeachers, setStorageTeachers] = useState();

  useEffect(() => {
    AsyncStorage.getItem("teachers")
      .then((value) => {
        setStorageTeachers(JSON.parse(value));
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(storageTeachers, "soy storage");

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

  if (data || storageTeachers) {
    // console.log(data.students[0].course.subjects, "soy data");
    const teachers = data ? data.students[0].course.subjects : storageTeachers;
    let profes = {};
    
    return (
      <View style={styles.cont}>
        <Card style={styles.card}>
          <Card.Title>Mis Profesores</Card.Title>
          <Card.Divider />
          {teachers.length ? (
            <FlatList
              data={teachers}
              key={teachers._id}
              renderItem={({ item, index }) => {
                if (item.teacher && !profes[item.teacher._id]) {
                  profes[item.teacher._id] = true
                  return (
                    <View style={styles.cardIn} key={item._id}>
                      {/* <Text style={{ fontSize: 18 }}>{item.name}</Text> */}
                      <Text style={{ fontSize: 18 }}>
                        {item.teacher?.name} {item.teacher?.lastname}
                      </Text>
                      
                      <TouchableHighlight
                        style={styles.button}
                        activeOpacity={0.2}
                        underlayColor=""
                        onPress={ () => {
                          Alert.alert(
                            `Profesor: ${item.teacher.name} ${item.teacher.lastname}`,
                            `Numero de celular: ${item.teacher.whatsapp}`,
                            [
                              {
                                text: 'Cancelar',
                                style: 'cancel'
                              },
                              { 
                                text: 'Ver Materias', 
                                onPress: () => {
                                  let subjects = teachers.map(el => {
                                    if(el.teacher?._id === item.teacher._id) return el.name;
                                  }).join(`\n`)
                                  alert(`${subjects}`) 
                                }
                              },
                              { 
                                text: 'Ir a Whatsapp', 
                                onPress: async () =>  await Linking.openURL(`https://wa.me/${item.teacher?.whatsapp}`) 
                              }
                            ],
                          )
                        }
                        }
                      >
                       <Text style={{color: 'white'}} >OPCIONES</Text> 
                      </TouchableHighlight>
                    </View>
                  );
                } 
              }}
              keyExtractor={({ index }) => index}
            />
          ) : (
            <CenterView>
              <Text>NO HAY MATERIAS ASIGNADAS</Text>
            </CenterView>
          )}
        </Card>
      </View>
    );
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
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
  },
  button: {
    backgroundColor: "#00aadd",
    padding: 8,
    borderRadius: 13,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 30,
    height: 30,
  },
});
export default StudentTeachers;
