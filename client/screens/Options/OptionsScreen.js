import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";
import UserAvatar from "react-native-user-avatar";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../providers/AuthProvider";

export const GET_ADMIN = gql`
  {
    admin {
      _id
      name
      lastname
      dni
      email
      whatsapp
      address
      birthday
      picture
    }
  }
`;

const Options = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  const { data, loading, error } = useQuery(GET_ADMIN);

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
    const admin = data.admin[0];

    return (
      // <CenterView>
      // <View style={styles.card}>
      <CenterView style={styles.card}>
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
                name={`${admin.name} ${admin.lastname}`}
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
        <Text style={styles.textName}>{`${admin.name} ${admin.lastname}`}</Text>
        <Text style={styles.textRole}>Preceptor</Text>

        <View style={styles.link}>
          <TouchableHighlight
            style={styles.touchLink}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.touchText}>EDITAR PERFIL</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchLink}
            activeOpacity={0.6}
            underlayColor=""
            onPress={() => navigation.navigate("ResetPass")}
          >
            <Text style={styles.touchText}>EDITAR CLAVE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.touchLink}
            activeOpacity={0.6}
            underlayColor=""
            onPress={logout}
          >
            <Text style={styles.touchText}>CERRAR SESIÓN</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.input}>
          <Text style={styles.touch}>Correo: {`${admin.email}`}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.touch}>DNI: {`${admin.dni}`}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.touch}>Dirección: {`${admin.address}`}</Text>
        </View>
        {/* <View style={[styles.input, styles.inputMateria]}>
              <Text style={styles.touch}>Fecha: {`${admin?.birthday}`}</Text>
            </View> */}
      </CenterView>
      // </View>
      // </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "space-around",
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
    marginHorizontal: 7,
  },
  card: {
    padding: 10,
    flex: 1,
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
    elevation: 10,
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

export default Options;
