import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";

export const GET_CLASSES_BY_ID = gql`
  query GetClassesById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      files
      homework
    }
  }
`;

function ClassDetail({ navigation, route }) {
  const { _id, courseId } = route.params;
  const { data, loading, error } = useQuery(GET_CLASSES_BY_ID, {
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
    const clase = data.classes[0];

    return (
      <CenterView>
        <Text style={styles.name}>{`${clase.name}`}</Text>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() =>
            navigation.navigate("FilesFromClass", {
              params: { id: clase._id },
            })
          }
        >
          <Text style={styles.textHigh}>Archivos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() =>
            navigation.navigate("HomeworkFromClass", {
              params: { _id: clase._id, courseId },
            })
          }
        >
          <Text style={styles.textHigh}>Tareas</Text>
        </TouchableHighlight>
      </CenterView>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    marginBottom: 40,
    color: "#272727",
    fontWeight: "bold",
  },
  button: {
    margin: 15,
    backgroundColor: "#00aadd",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 250,
    minHeight: 70,
    padding: 7,
    borderRadius: 7,
  },
  textHigh: {
    color: "white",
    fontSize: 18,
  },
});

export default ClassDetail;
