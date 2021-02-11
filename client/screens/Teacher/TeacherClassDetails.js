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
    class(_id: $_id) {
      _id
      name
    }
  }
`;

const TeacherClassDetails = ({ navigation, route }) => {
  const { _id } = route.params;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
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
      <View style={styles.cont}>
        <Text>{clase.name}</Text>
        <TouchableHighlight
          style={styles.button}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() =>
            navigation.navigate("FilesFromClass", { _id: clase._id })
          }
        >
          <Text style={styles.buttonText}>Archivos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor=""
          style={styles.button}
          onPress={() =>
            navigation.navigate("HomeworkFromClass", { _id: clase._id })
          }
        >
          <Text style={styles.buttonText}>Tareas</Text>
        </TouchableHighlight>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    padding: 5,
  },
  button: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
});

export default TeacherClassDetails;
