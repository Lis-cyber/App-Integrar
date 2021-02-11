import React from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { LOCAL_IP } from "@env";
import { Card } from "react-native-paper";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
    }
  }
`;

const DELETE_HOMEWORK = gql`
  mutation DeleteHomework($classId: ID!, $filename: String!) {
    deleteHomework(classId: $classId, filename: $filename)
  }
`;

const FilesFromHomework = ({ navigation, route }) => {
  // TODO: hacer un boton para descargar todas las tareas
  const { _id, courseId } = route.params.params;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });
  const [
    deleteHomework,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_HOMEWORK);

  const handleFilePress = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/teachers/${_id}/${name}`
    );
  };

  const handleRar = (classId) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/${classId}`
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
    const homework = clase.homework;

    return (
      <View style={styles.cont}>
        {homework ? (
          <View>
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("StudentsHomeworks", {
                _id: clase._id,
                courseId,
              })
            }
          >
            <Text style={styles.touchText}>Ver tareas de Alumnos</Text>
          </TouchableHighlight>
          <TouchableHighlight
          style={styles.touch}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() => handleRar(clase._id)}
        >
          <Text style={styles.touchText}>Descargar .rar con tareas de Alumnos</Text>
        </TouchableHighlight>
        </View>
        ) : (
          <TouchableHighlight
            style={styles.touch}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() =>
              navigation.navigate("UploadHomework", {
                _id: clase._id,
              })
            }
          >
            <Text style={styles.touchText}>Agregar Tareas</Text>
          </TouchableHighlight>
        )}

        <Text style={styles.name}>Tarea de la clase: {clase.name}</Text>
        {clase.homework ? (
          <Card style={styles.card}>
            <View style={styles.cardIn}>
              <TouchableOpacity onPress={() => handleFilePress(homework)}>
                <Text style={styles.cardText}>{homework}</Text>
              </TouchableOpacity>
              <TouchableHighlight
                activeOpacity={0.6}
                style={styles.onPress}
                onPress={() =>
                  Alert.alert(
                    "Eliminar archivo",
                    `¿Está seguro que desea eliminar esta tarea ${homework}?`,
                    [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () =>
                          deleteHomework({
                            variables: {
                              classId: _id,
                              filename: homework,
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
                <Text style={styles.img}>X</Text>
              </TouchableHighlight>
            </View>
          </Card>
        ) : (
          <CenterView>
            <Text>No hay tareas agregadas para esta clase</Text>
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
    height: 32,
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

export default FilesFromHomework;
