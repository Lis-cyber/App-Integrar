import React from "react";
import CenterView from "../../utils/CenterView";
import { Card } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

export const GET_ALL_MODULES_SUBJECT = gql`
  query GetModulesFromSubjects($_id: ID) {
    subjects(_id: $_id) {
      _id
      name
      modules {
        _id
        name
      }
      teacher {
        name
        lastname
      }
    }
  }
`;

const SutudentSubjectDetail = ({ navigation, route }) => {
  const _id = route.params?.id;
  const { data, loading, error } = useQuery(GET_ALL_MODULES_SUBJECT, {
    variables: { _id },
  });

  const colors = [
    "#561EF6",
    "#1EF669",
    "#1E56F6",
    "#F0FB11",
    "#3FF61E",
    "#F9A31E",
    "#1EA4F6",
    "#F61E2B",
    "#F61EA1",
    "#1EE2F6",
    "#1EF669",
    "#1EA4F6",
    "#F91E1E",
    "#DC1EF6",
    "#F61E49",
    "#70CE12",
    "#1CCC71",
    "#CC741C",
    "#35C8B4",
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
    const { modules } = data.subjects[0];

    return (
      <ScrollView>
        <View style={styles.cont}>
          <Text style={styles.title}>{data.subjects[0].name}</Text>
          <Text style={styles.sTitle}>
            Profesor: {data.subjects[0].teacher?.name}{" "}
            {data.subjects[0].teacher?.lastname}
          </Text>
          <Card>
            <Card.Title>Unidades</Card.Title>
            <Card.Divider />
            {modules.length ? (
              <FlatList
                data={modules}
                renderItem={({ item, index }) => {
                  return (
                    <View key={item._id} style={styles.cardIn}>
                      <TouchableHighlight
                        style={{
                          backgroundColor: colors[index],
                          padding: 5,
                          borderRadius: 7,
                          minWidth: 100,
                          minHeight: 57,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        activeOpacity={0.6}
                        underlayColor=""
                        onPress={() =>
                          navigation.navigate("StudentListClasses", {
                            id: item._id,
                          })
                        }
                      >
                        <Text style={styles.textHigh}>{item.name}</Text>
                      </TouchableHighlight>
                    </View>
                  );
                }}
                keyExtractor={({ _id }) => _id}
              />
            ) : (
              <CenterView>
                <Text>NO HAY UNIDADES EN ESTA ASIGNATURA</Text>
              </CenterView>
            )}
          </Card>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  title: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    margin: 18,
    fontWeight: "bold",
    color: "#272626",
  },
  sTitle: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 18,
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#272626",
  },

  cont: {
    flex: 1,
    padding: 5,
  },
  cardIn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
  },
  textHigh: {
    color: "white",
  },
});
export default SutudentSubjectDetail;
