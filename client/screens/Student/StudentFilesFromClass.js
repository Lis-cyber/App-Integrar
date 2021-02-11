import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-elements";
import { LOCAL_IP } from "@env";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      files
    }
  }
`;

const StudentFilesFromClass = ({ navigation, route }) => {
  const _id = route.params?._id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });

  const handleFilePress = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/teachers/${_id}/${name}`
    );
  };

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
         <Card >
          <Card.Title>Archivos de la {clase.name}</Card.Title>
          <Card.Divider />
        {clase.files.length ? (
          <FlatList
            data={clase.files}
            renderItem={({ item, index }) => {
              return (
                  <View key={index} style={styles.cardIn}>
                    <TouchableOpacity
                    style={styles.card}
                      onPress={() => handleFilePress(item)}
                    >
                      <Text style={styles.cardText}>{item}</Text>
                    </TouchableOpacity>
                  </View>
              );
            }}
            keyExtractor={(index) => index}
          />
        ) : (
          <CenterView>
            <Text>No hay archivos agregados para esta clase</Text>
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
    minWidth: 265
  },
  cardText: {
    fontSize: 14,
    padding: 10,
    color: "white",
    marginLeft: 20,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 344,
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
    color: "#272626",
  },
});

export default StudentFilesFromClass;
