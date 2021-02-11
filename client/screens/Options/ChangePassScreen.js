import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../providers/AuthProvider";
import CenterView from "../../utils/CenterView";
import { CHANGE_PASSWORD } from "../../utils/graphql";

const ChangePassword = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [resetPassword, { error, loading }] = useMutation(CHANGE_PASSWORD);
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });
  const [passError, setPassError] = useState();

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  };

  const handleSubmit = () => {
    if (inputs.newPassword !== inputs.newPassword2) {
      setPassError("Las contraseñas nos coinciden.");
    } else {
      try {
        console.log("pass: ", inputs.newPassword);
        console.log("id: ", user._id);
        resetPassword({
          variables: {
            newPassword: inputs.newPassword,
            userId: user._id,
          },
        });
        Alert.alert("Excelente!", `La contraseña fue cambiada exitosamente!`, [
          {
            text: "Volver",
            onPress: () => navigation.pop(),
          },
        ]);
      } catch (err) {
        console.log(JSON.stringify(error));
      }
    }
  };

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (error)
    return (
      <CenterView>
        {console.log(JSON.stringify(error))}
        <Text>{JSON.stringify(error)}</Text>
      </CenterView>
    );

  return (
    <CenterView>
      <Text style={styles.title}>CAMBIAR CONTRASEÑA</Text>
      <Text style={styles.description}>Vieja contraseña:</Text>
      <TextInput
        style={styles.input}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Vieja contraseña..."
        value={inputs.oldPassword}
        onChangeText={(text) => handleChange(text, "oldPassword")}
      />
      {passError && <Text style={{ color: "red" }}>{passError}</Text>}
      <Text style={styles.description}>Nueva contraseña:</Text>
      <TextInput
        style={styles.input}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Nueva contraseña..."
        value={inputs.newPassword}
        onChangeText={(text) => handleChange(text, "newPassword")}
      />
      <Text style={styles.description}>Por favor repita su contraseña:</Text>
      <TextInput
        style={styles.input}
        textContentType="password"
        secureTextEntry={true}
        placeholder="Nueva contraseña..."
        value={inputs.newPassword2}
        onChangeText={(text) => handleChange(text, "newPassword2")}
      />
      <Button title="Cambiar contraseña" onPress={handleSubmit} />
    </CenterView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "#000000",
    marginBottom: 25,
  },
  description: {
    fontSize: 20,
    color: "#000000",
    marginBottom: 2,
    marginLeft: 2,
  },
  input: {
    padding: 5,
    width: 237,
    height: 50,
    borderColor: "#2290CD",
    borderWidth: 2,
    marginBottom: 20,
  },
  button: {
    margin: 15,
    backgroundColor: "#006DEE",
    justifyContent: "center",
    alignItems: "center",
    width: 237,
    height: 50,
    padding: 7,
    borderRadius: 7,
  },
  textButton: {
    fontSize: 16,
    color: "white",
  },
});

export default ChangePassword;
