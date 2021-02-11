import React, { useState } from "react";
import { Text, TextInput, StyleSheet, Button, View } from "react-native";
import CenterView from "../../utils/CenterView";

const AddCourseScreen = () => {
  const [inputs, setInputs] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (text, input) => {
    setInputs({
      ...inputs,
      [input]: text,
    });
  };

  return (
    <CenterView>
      <Text style={styles.title}>EDITAR PERFIL</Text>
      <View>
        <Text style={styles.description}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nuevo email..."
          value={inputs.email}
          onChangeText={(text) => handleChange(text, "email")}
        />
      </View>
      <View>
        <Text style={styles.description}>Dirección:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva dirección..."
          value={inputs.adress}
          onChangeText={(text) => handleChange(text, "adress")}
        />
      </View>
      <View>
        <Text style={styles.description}>Whatsapp:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nueva número..."
          value={inputs.whatsapp}
          onChangeText={(text) => handleChange(text, "whatsapp")}
        />
      </View>
      <Button title="Actualizar perfil" />
    </CenterView>
  );
};

const styles = StyleSheet.create({
  title: {
    //fontFamily: 'roboto',
    fontSize: 25,
    color: "#000000",
    marginBottom: 35,
  },
  description: {
    //fontFamily: 'roboto',
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
    marginBottom: 50,
  },

});

export default AddCourseScreen;
