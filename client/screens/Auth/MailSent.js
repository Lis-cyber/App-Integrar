import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CenterView from "../../utils/CenterView";

const MailSentScreen = ({ route, navigation }) => {
  const { email } = route.params;
  return (
    <CenterView>
      <Text style={{ marginBottom: 15, padding: 20, textAlign: "center" }}>
        Le hemos enviado instrucciones a {email} para que pueda recuperar su
        contraseña!
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ color: "#2290CD" }}>Volver</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

export default MailSentScreen;
