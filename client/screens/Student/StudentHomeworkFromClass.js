import React, { useContext } from "react";
import CenterView from "../../utils/CenterView";
import { useQuery, gql, useMutation } from "@apollo/client";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  Image,
} from "react-native";
import { Card } from "react-native-elements";
import { AuthContext } from "../../providers/AuthProvider";
import { LOCAL_IP } from "@env";
import * as WebBrowser from "expo-web-browser";

export const GET_CLASS_BY_ID = gql`
  query GetClassById($_id: ID) {
    classes(_id: $_id) {
      _id
      name
      homework
      deliveries
    }
  }
`;

const DELETE_DELIVERY = gql`
  mutation DeleteDelivery($classId: ID!, $filename: String!) {
    deleteDelivery(classId: $classId, filename: $filename)
  }
`;

const StudentHomeworkFromClass = ({ navigation, route }) => {
  const _id = route.params?._id;
  const type = route.params?.type;
  const { data, loading, error } = useQuery(GET_CLASS_BY_ID, {
    variables: { _id },
  });
  const { user } = useContext(AuthContext);
  const { dni } = user;
  let typeExist = false;
  let mapExist = false

  const [
    deleteDelivery,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_DELIVERY);

  const handleFilePress = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/teachers/${_id}/${name}`
    );
  };

  const handleFilePress2 = (name) => {
    WebBrowser.openBrowserAsync(
      `http://${LOCAL_IP}:4000/download/students/${_id}/${name}`
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
    const studentFile = dni + "." + type;
    clase.deliveries?.forEach((student) =>
      student === studentFile ? (typeExist = true) : (typeExist = false)
    );
    clase.deliveries?.map((el) => {
      if (el.split(".", 1)[0] === dni) mapExist=true })

    return (
      <ScrollView>
        <View style={styles.cont}>
          {console.log(clase)}
          <Card>
            <Card.Title>Tarea de la {clase.name}</Card.Title>
            <Card.Divider />
            {clase.homework ? (
              <View>
                <TouchableHighlight
                  activeOpacity={0.6}
                  underlayColor=""
                  style={styles.card}
                  onPress={() => handleFilePress(clase.homework)}
                >
                  <Text style={styles.cardText}>{clase.homework}</Text>
                </TouchableHighlight>
                {typeExist ? (
                  
                  <View style={styles.hwkUp}>
                    <TouchableHighlight
                      style={styles.touch2}
                      activeOpacity={0.2}
                      onPress={() => handleFilePress2(studentFile)}
                    >
                      <Text style={styles.hmkUpTxt}> TAREA SUBIDA!</Text>
                    </TouchableHighlight>
                    <Image
                      source={require("../../assets/job.gif")}
                      style={styles.img}
                    />
                    <TouchableHighlight
                      activeOpacity={0.6}
                      style={styles.delete}
                      onPress={() =>
                        Alert.alert(
                          "Eliminar archivo",
                          `¿Está seguro que desea eliminar esta tarea?`,
                          [
                            {
                              text: "Cancelar",
                              style: "cancel",
                            },
                            {
                              text: "OK",
                              onPress: () =>
                                deleteDelivery({
                                  variables: {
                                    classId: _id,
                                    filename: studentFile,
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
                      <Text style={styles.deleteTxt}>Eliminar</Text>
                    </TouchableHighlight>
                  </View>
                ) : mapExist ? (
              <View style={styles.hwkUp}>
                    <TouchableHighlight
                      style={styles.touch2}
                      activeOpacity={0.2}
                      onPress={() => handleFilePress2(el)}
                    >
                      <Text style={styles.hmkUpTxt}> TAREA SUBIDA!</Text>
                    </TouchableHighlight>
                    <Image
                      source={require("../../assets/job.gif")}
                      style={styles.img}
                    />
                  </View>) : (
                  <TouchableHighlight
                    style={styles.touch}
                    activeOpacity={0.2}
                    onPress={() =>
                      navigation.navigate("UploadDelivery", {
                        dni: dni,
                        classId: _id,
                      })
                    }
                  >
                    <Text style={styles.cardText}>Subir Tarea</Text>
                  </TouchableHighlight>
                )}
             </View>
            )
            : (
              <CenterView>
                <Text>No hay tarea para esta clase</Text>
              </CenterView>
            )}
          </Card>
        </View>
      </ScrollView>
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
  card: {
    margin: 5,
    backgroundColor: "#00aadd",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardSee: {
    fontSize: 17,
    padding: 10,
    color: "white",
  },
  cardText: {
    fontSize: 14,
    color: "white",
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
  delete: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    marginRight: 15,
    width: 100,
    height: 40,
    justifyContent: "center",
    marginTop: 12,
  },
  deleteTxt: {
    color: "white",
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    margin: 5,
    backgroundColor: "#DE2525",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  touch2: {
    margin: 5,
    backgroundColor: "darkgreen",
    borderRadius: 10,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  hwkUp: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  hmkUpTxt: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  hmkUpTxt2: {
    color: "darkgreen",
    fontWeight: "bold",
    fontSize: 16,
  },
  img: {
    width: 290,
    height: 250,
  },
});

export default StudentHomeworkFromClass;
