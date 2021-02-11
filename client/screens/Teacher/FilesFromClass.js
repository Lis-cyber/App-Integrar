import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { FlatList } from "react-native-gesture-handler";
import { Card } from "react-native-paper";
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

const DELETE_CLASS_FILE = gql`
  mutation DeleteClassFile($classId: ID!, $filename: String!) {
    deleteClassFile(classId: $classId, filename: $filename)
  }
`;

const FilesFromClass = ({ navigation, route }) => {
  const _id = route.params.params.id;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });
  const [
    deleteClassFile,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_CLASS_FILE);

  const handleFilePress = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/teachers/${_id}/${name}`
    );
  };

  if (loading || mutationLoading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error || mutationError) {
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
        <TouchableHighlight
          style={styles.touch}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() =>
            navigation.navigate("UploadClassFile", {
              _id: clase._id,
            })
          }
        >
          <Text style={styles.touchText}>Agregar Archivos</Text>
        </TouchableHighlight>
        <Text style={styles.name}>Archivos de la clase: {clase.name}</Text>
        {clase.files.length ? (
          <FlatList
            data={clase.files}
            renderItem={({ item, index }) => {
              return (
                <Card key={index} style={styles.card}>
                  <View style={styles.cardIn}>
                    <TouchableOpacity onPress={() => handleFilePress(item)}>
                      <Text style={styles.cardText}>{item}</Text>
                    </TouchableOpacity>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor=""
                      style={styles.onPress}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar archivo",
                          `¿Está seguro que desea eliminar este archivo ${item}?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteClassFile({
                                  variables: {
                                    classId: _id,
                                    filename: item,
                                  },
                                  refetchQueries: [
                                    {
                                      query: GET_CLASS_BY_ID,
                                      variables: { _id: _id },
                                    },
                                  ],
                                }),
                            },
                          ]
                        )
                      }
                    >
                      <Text style={styles.img}>x</Text>
                    </TouchableHighlight>
                  </View>
                </Card>
              );
            }}
            keyExtractor={(index) => index}
          />
        ) : (
          <CenterView>
            <Text>No hay archivos agregados para esta clase</Text>
          </CenterView>
        )}
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
  cardText: {
    fontSize: 14,
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
    minHeight: 25,
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
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  name: {
    marginBottom: 5,
    marginLeft: 12,
    fontWeight: "bold",
    fontSize: 15,
    alignItems: "flex-start",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 12,
  },
});

export default FilesFromClass;
