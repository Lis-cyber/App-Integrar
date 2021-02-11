import React, { useContext, useState } from "react";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useQuery, gql } from "@apollo/client";
import * as ImagePicker from "expo-image-picker";
import UserAvatar from "react-native-user-avatar";

export const GET_A_STUDENT = gql`
  query GetAStudent($dni: String) {
    students(dni: $dni) {
      name
      lastname
      _id
      dni
      email
      whatsapp
      address
      birthday
      picture
      course {
        name
      }
    }
  }
`;

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const { dni } = user;
  const { data, loading, error } = useQuery(GET_A_STUDENT, {
    variables: { dni },
  });

  const [selectedImage, setSelectedImage] = useState(null);

  let openImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Alerta", "Se requiere acceso al Almacenamiento Interno");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
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
    const student = data.students[0];

    return (
      <CenterView>
        <View style={styles.card}>
          <ScrollView>
            <View>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor=""
                onPress={openImage}
              >
                {selectedImage ? (
                  <Image
                    style={styles.user}
                    source={{
                      uri: `${selectedImage?.localUri}`,
                    }}
                  />
                ) : (
                  <UserAvatar
                    size={100}
                    name={`${student.name} ${student.lastname}`}
                    style={{
                      backgroundColor: "#2290CD",
                      width: 140,
                      height: 140,
                      borderRadius: 100,
                      marginTop: 20,
                      alignSelf: "center",
                    }}
                  />
                )}
              </TouchableHighlight>
            </View>

            <Text style={styles.textName}>
              {`${student.name} ${student.lastname}`}
            </Text>
            <Text style={styles.textRole}>Mi Perfil</Text>

            <View style={styles.input}>
              <Text style={styles.touch}>Curso: {`${student.course.name}`}
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>DNI: {`${student.dni}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>Correo: {`${student.email}`}</Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>Whatsapp: {`${student.whatsapp}`}
              </Text>
            </View>
            <View style={styles.input}>
              <Text style={styles.touch}>Dirección: {`${student.address}`}
              </Text>
            </View>
            <View style={[styles.input, styles.inputMateria]}>
              <Text style={styles.touch}>Fecha: {`${student.birthday}`}</Text>
            </View>
          </ScrollView>
        </View>
      </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  principal: {
    backgroundColor: "white",
  },
  touchText: {
    marginTop: 15,
    marginBottom: 10,
    color: "#2290CD",
    width: 90,
    textAlign: "center",
    fontSize: 14,
  },
  touch: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
  },
  touchLink: {
    justifyContent: "flex-start",
    marginTop: 5,
    marginBottom: 5,
    shadowOpacity: 80,

    elevation: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  card: {
    width: `100%`,
    height: `100%`,
    margin: 5,
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  cardcount: {
    width: `100%`,
    height: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  count: {
    fontSize: 20,
    color: "#2290CD",
    marginTop: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  user: {
    backgroundColor: "#2290CD",
    width: 140,
    height: 140,
    borderRadius: 100,
    marginTop: 20,
    alignSelf: "center",
  },
  textName: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "center",
  },
  textRole: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 300,
    padding: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowOpacity: 80,
    elevation: 15,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  inputMateria: {
    marginBottom: 15,
  },
  link: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default StudentProfile;
