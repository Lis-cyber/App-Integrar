import React from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

export const GET_ALL_CLASSES_MODULES = gql`
  query GetClassesFromModules($_id: ID) {
    modules(_id: $_id) {
      _id
      name
      classes {
        _id
        name
      }
    }
  }
`;

const StudentListClasses = ({ navigation, route }) => {
  const _id = route.params?.id;
  const { data, loading, error } = useQuery(GET_ALL_CLASSES_MODULES, {
    variables: { _id },
  });

  const colors = [
    "#F61E2B",
    "#F61EA1",
    "#1EE2F6",
    "#1EF669",
    "#1EA4F6",
    "#561EF6",
    "#1EF669",
    "#1E56F6",
    "#F0FB11",
    "#3FF61E",
    "#F9A31E",
    "#1EA4F6",
    "#F91E1E",
    "#DC1EF6",
    "#F61E49",
    "#70CE12",
    "#1CCC71",
    "#CC741C",
    "#35C8B4",
    "#F61E2B",
    "#F61EA1",
    "#1EE2F6",
    "#1EF669",
    "#1EA4F6",
    "#F0FB11",
    "#3FF61E",
    "#F9A31E",
    "#1EA4F6",
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
    const module = data.modules[0];
    return (
      <View style={styles.cont}>
        <Card style={styles.card}>
          <Card.Title>Clases de {module.name}</Card.Title>
          <Card.Divider />
          {module.classes.length ? (
            <FlatList
              data={module.classes}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.cardIn} key={item._id}>
                    <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    <TouchableHighlight
                      style={{
                        backgroundColor: colors[index],
                        padding: 5,
                        borderRadius: 7,
                        minWidth: 95,
                        minHeight: 45,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      activeOpacity={0.6}
                      underlayColor=""
                      onPress={() =>
                        navigation.navigate("StudentClassDetail", {
                          screen: "StudentClassDetail",
                          params: { id: item._id },
                        })
                      }
                    >
                      <Text style={styles.textHigh}>Ver Clase</Text>
                    </TouchableHighlight>
                  </View>
                );
              }}
              keyExtractor={({ _id }) => _id}
            />
          ) : (
            <CenterView>
              <Text>NO HAY CLASES EN ESTA UNIDAD</Text>
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
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    justifyContent: "space-between",
    display: "flex",
    margin: 10,
  },
  textHigh: {
    color: "white",
  },
});
export default StudentListClasses;
