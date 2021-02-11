import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
    }
  }
`;

const StudentClassDetail = ({ navigation, route }) => {
  const _id = route.params.params?.id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id: _id },
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
        <Text style={styles.title}>{clase.name}</Text>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() =>
            navigation.navigate("StudentFilesFromClass", {
              _id: clase._id
            })
          }
        >
          <Text style={styles.buttonText}>Archivos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor=""
          style={styles.button}
          onPress={() =>
            navigation.navigate("StudentHomeworkFromClass", {
              _id: clase._id
            })
          }
        >
          <Text style={styles.buttonText}>Tareas</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor=""
          style={styles.button}
          onPress={() =>
            navigation.navigate("StudentCorrectionFromClass", {
              _id: clase._id
            })
          }
        >
          <Text style={styles.buttonText}>Correcciones</Text>
        </TouchableHighlight>
      </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    margin: 15,
    marginBottom: 40,
    fontWeight: "bold",
    color: "#272626",
  },
  button: {
    margin: 25,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 150,
    minHeight: 80,
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "white",
  },
});

export default StudentClassDetail;
