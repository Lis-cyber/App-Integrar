import React from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import { assertLeafType } from "graphql";

export const GET_ALL_MODULES_SUBJECT = gql`
  query GetModulesFromSubjects($_id: ID) {
    subjects(_id: $_id) {
      _id
      name
      modules {
        _id
        name
      }
    }
  }
`;

const DELETE_MODULE_BY_ID = gql`
  mutation DeleteModule($_id: ID) {
    deleteModule(_id: $_id) {
      _id
      name
    }
  }
`;

const TeacherListModules = ({ navigation, route }) => {
  const { _id, courseId } = route.params.params;
  const { data, loading, error } = useQuery(GET_ALL_MODULES_SUBJECT, {
    variables: { _id },
  });

  const [deleteModule, mutationData] = useMutation(DELETE_MODULE_BY_ID);

  if (loading || mutationData.loading) {
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );
  }

  if (error || mutationData.error) {
    return (
      <CenterView>
        <Text>ERROR</Text>
      </CenterView>
    );
  }

  if (data) {
    const { modules } = data.subjects[0];

    return (
      <ScrollView>
        <View style={styles.cont}>
          <TouchableHighlight
            style={styles.touch}
            underlayColor=""
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("AddModuleToSubject", { _id: _id })
            }
          >
            <Text style={styles.touchText}>Agregar Unidad</Text>
          </TouchableHighlight>

          {modules.length ? (
            <Card>
              <Card.Title>Unidades de {data.subjects[0].name}</Card.Title>
              <Card.Divider />
              {modules.map((module, i) => {
                return (
                  <View key={module._id} style={styles.cardIn}>
                    <Text style={{ fontSize: 18 }}>{module.name}</Text>
                    <TouchableHighlight
                      style={styles.button}
                      activeOpacity={0.6}
                      underlayColor=""
                      onPress={() =>
                        navigation.navigate("TeacherListClasses", {
                          _id: module._id,
                          courseId,
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Clases</Text>
                    </TouchableHighlight>
                    <View>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor=""
                        style={styles.onPress}
                        onPress={async () =>
                          await Alert.alert(
                            "Eliminar Unidad",
                            `¿Está seguro que desea eliminar la unidad: "${module.name}"?`,
                            [
                              {
                                text: "Cancelar",
                                style: "cancel",
                              },
                              {
                                text: "OK",
                                onPress: async () =>
                                  await deleteModule({
                                    variables: { _id: module._id },
                                    refetchQueries: [
                                      { query: GET_ALL_MODULES_SUBJECT },
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
                  </View>
                );
              })}
            </Card>
          ) : (
            <CenterView>
              <Text>NO HAY UNIDADES EN ESTA ASIGNATURA</Text>
            </CenterView>
          )}
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
  touchText: {
    marginTop: 5,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 16,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    marginLeft: 15,
  },
  onPress: {
    backgroundColor: "#DE2525",
    padding: 7,
    borderRadius: 7,
    alignItems: "center",
    width: 38,
    height: 40,
    justifyContent: "center",
  },
  img: {
    color: "white",
    fontSize: 15,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2290CD",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 95,
    minHeight: 40,
    borderRadius: 7,
  },
  textHigh: {
    color: "white",
  },
});
export default TeacherListModules;
