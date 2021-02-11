import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import { Card } from "react-native-paper";
import UserAvatar from "react-native-user-avatar";

export const GET_TEACHER_BY_ID = gql`
  query GetTeacherById($_id: ID) {
    teachers(_id: $_id) {
      _id
      name
      lastname
      dni
      email
      whatsapp
      address
      birthday
      picture
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

function TeacherDetail({ route }) {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_TEACHER_BY_ID, {
    variables: { _id },
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
    const teacher = data.teachers[0];

    return (
      <CenterView>
        <View style={styles.card}>
          <ScrollView>
            <UserAvatar
              size={100}
              name={`${teacher.name} ${teacher.lastname}`}
              style={{
                backgroundColor: "#2290CD",
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: 20,
                alignSelf: "center",
              }}
              src={`${teacher.picture}` }
            />
            <Text style={styles.textName}>
              {`${teacher.name} ${teacher.lastname}`}
            </Text>
            <Text style={styles.textRole}>Profesor</Text>
            <View style={styles.input}>
              <Text style={styles.touch}>Correo: {`${teacher.email}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>DNI: {`${teacher.dni}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>
                Dirección: {`${teacher.address}`}
              </Text>
            </View>

            <View style={styles.input}>
              <Text style={styles.touch}>Fecha: {`${teacher.birthday}`}</Text>
            </View>
            <View style={[styles.input, styles.inputMateria]}>
              <Text style={styles.touch}>
                Materias:{" "}
                {teacher.subjects?.length > 0 ? (
                  teacher.subjects.map((subject, i) => {
                    return (
                      <Text key={i} style={styles.description}>
                        {subject.name}: {subject.course.name}
                        {"  "}
                      </Text>
                    );
                  })
                  ) : (
                    <></>
                    )}
              </Text>
            </View> 
          </ScrollView>
        </View>
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
  },
  card: {
    width: `100%`,
    height: `100%`,
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  user: {
    backgroundColor: "#2290CD",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  textName: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "center",
  },
  textRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  inputMateria: {
    marginBottom: 15,
  },
});

export default TeacherDetail;
