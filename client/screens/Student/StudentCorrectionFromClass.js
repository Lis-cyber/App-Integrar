import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../../providers/AuthProvider";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      corrections {
        student {
          _id
          name
          dni
        }
        score
        feedback
      }
    }
  }
`;

const StudentCorrectionFromClass = ({ navigation, route }) => {
  const _id = route.params?._id;
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const colors = [
    "",
    "#FA2103",
    "#F4381E",
    "#F65D11",
    "#F6AA11",
    "#F3F611",
    "#C5F611",
    "#9CF611",
    "#7DF611",
    "#61F611",
    "#18F611",
  ];

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
    const clase = data.classes[0];
    const corrections = data.classes[0].corrections;

    return (
      <View style={styles.cont}>
        <Card>
          <Card.Title>Corrección {clase.name}</Card.Title>
          <Card.Divider />
          {corrections.length ? (
            corrections.map((student, i) => {
              console.log(student);
              if (student.student.dni === dni) {
                return (
                  <View key={i} style={styles.card}>
                    <Text style={styles.cardText}>Nota</Text>
                    <TouchableHighlight
                      style={{
                        backgroundColor: colors[student.score],
                        width: 45,
                        height: 45,
                        borderRadius: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 20,
                      }}
                    >
                      <Text style={styles.cardTextScore}>{student.score}</Text>
                    </TouchableHighlight>
                  </View>
                );
              }
              //  else {
              //   return <Text> No hay correcciones en esta clase </Text>;
              // }
            })
          ) : (
            <CenterView>
              <Text>No hay correcciones para esta clase</Text>
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
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    color: "#272727",
    textDecorationLine: "underline",
  },
  cardTextScore: {
    fontSize: 20,
    color: "#ECDBDB",
    fontWeight: "bold",
    textShadowColor: "#232121",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default StudentCorrectionFromClass;
