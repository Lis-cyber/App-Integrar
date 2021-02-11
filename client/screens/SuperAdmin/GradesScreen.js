import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import { gql, useQuery, useMutation } from "@apollo/client";
import CenterView from "../../utils/CenterView";

export const GET_ALL_GRADES = gql`
  {
    grades {
      _id
      name
    }
  }
`;

const DELETE_GRADE = gql`
  mutation DeleteGrade($_id: ID) {
    deleteGrade(_id: $_id) {
      name
    }
  }
`;

const GradesScreen = ({ navigation }) => {
  const { data, loading, error } = useQuery(GET_ALL_GRADES);
  const [deleteGrade, mutationData] = useMutation(DELETE_GRADE);

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (data) {
    const { grades } = data;
    return (
      <View>
        <TouchableHighlight
          style={styles.touch}
          activeOpacity={0.6}
          underlayColor=""
          onPress={() => navigation.navigate("SuperAdminAddGrade")}
        >
          <Text style={styles.touchText}>Agregar Grado</Text>
        </TouchableHighlight>
        <FlatList
          data={grades}
          renderItem={({ item: grade }) => {
            return (
              <Card key={grade._id} style={styles.card}>
                <View style={styles.cardIn}>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor=""
                    onPress={() =>
                      navigation.navigate("SuperAdminListCourses", {
                        screen: "SuperAdminListCourses",
                        params: { id: grade._id },
                      })
                    }
                  >
                    <Text style={styles.cardText}>{grade.name}</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor=""
                    style={styles.onPress}
                    onPress={() =>
                      Alert.alert(
                        "Eliminar grado",
                        `¿Está seguro que desea eliminar este grado ${grade.name}?`,
                        [
                          {
                            text: "Cancelar",
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () =>
                              deleteGrade({
                                variables: { _id: grade._id },
                                refetchQueries: [{ query: GET_ALL_GRADES }],
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
            );
          }}
          keyExtractor={({ _id }) => _id}
        />
      </View>
    );
  } else if (error)
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 15,
    // fontFamily: "roboto",
    fontSize: 20,
    alignItems: "flex-start",
    color: "#2290CD",
  },
  touch: {
    justifyContent: "flex-start",
    margin: 5,
    marginLeft: 12,
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
    fontSize: 20,
    padding: 10,
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
  img: {
    color: "white",
    fontSize: 18,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 345,
  },
});
export default GradesScreen;
