import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";

const ResetPassScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [emailNotCorrect, setEmailNotCorrect] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { resetpass } = useContext(AuthContext);

  const handleChange = (txt) => {
    setEmail(txt);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      setEmailNotCorrect(true);
      return false;
    }

    resetpass(email);
    navigation.navigate("MailSent", { email });
  };

  return (
    <CenterView>
      <Text style={{ marginBottom: 15 }}>Por favor ingrese su email</Text>
      <TextInput
        style={[
          styles.input,
          { marginBottom: 30 },
          isFocused ? styles.active : null,
        ]}
        placeholder="Email"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(txt) => handleChange(txt)}
        onFocus={() => handleFocus("dni")}
        onBlur={() => handleBlur("dni")}
      />
      {emailNotCorrect && (
        <Text style={{ marginBottom: 20, color: "red" }}>
          Por favor ingrese un email válido
        </Text>
      )}
      <Button title="Enviar email" onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{ marginTop: 10, color: "#2290CD" }}>Volver</Text>
      </TouchableOpacity>
    </CenterView>
  );
};

const styles = StyleSheet.create({
  landingImg: {
    marginBottom: 50,
    width: 250,
    height: 250,
  },
  input: {
    padding: 5,
    width: 300,
    borderBottomColor: "#C2C2C2",
    borderBottomWidth: 2,
  },
  active: {
    borderBottomColor: "#2290CD",
  },
});
export default ResetPassScreen;
