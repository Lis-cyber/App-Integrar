import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import CenterView from "../../utils/CenterView";
import { AuthContext } from "../../providers/AuthProvider";
import { gql, useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-community/async-storage";

const LOG_USER = gql`
  mutation Login($dni: String!, $password: String!) {
    login(dni: $dni, password: $password) {
      token
      error {
        password
        dni
      }
      user {
        _id
        name
        role
        email
        dni
      }
    }
  }
`;

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({});
  const [inputError, setInputError] = useState(false);
  const [isFocused, setIsFocused] = useState({
    dni: false,
    password: false,
  });
  const { setUser } = useContext(AuthContext);
  const [logUser, { loading, data, error }] = useMutation(LOG_USER);

  const handleChange = (txt, input) => {
    setInputs({
      ...inputs,
      [input]: txt,
    });
  };

  const handleFocus = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: true,
    });
  };

  const handleBlur = (input) => {
    setIsFocused({
      ...isFocused,
      [input]: false,
    });
  };

  const handleSubmit = () => {
    if (isNaN(inputs.dni)) {
      setInputError(true);
    } else {
      logUser({
        variables: {
          dni: inputs.dni,
          password: inputs.password,
        },
      });
    }
  };

  if (loading)
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Cargando...</Text>
      </CenterView>
    );

  if (data?.login?.token && data?.login?.user) {
    (async () => {
      await AsyncStorage.setItem("token", data.login.token);
      await AsyncStorage.setItem("user", JSON.stringify(data.login.user));
      setUser(data.login.user);
    })();
    return (
      <CenterView>
        <ActivityIndicator size="large" color="#2290CD" />
        <Text>Inicio de sesión exitoso!</Text>
      </CenterView>
    );
  }

  if (!data || data?.login?.error.password || data?.login?.error.dni) {
    const error = data?.login ? data.login.error : undefined;
    return (
      //<ScrollView>
      <CenterView>
        <Image
          source={require("../../assets/login_splash.png")}
          style={styles.landingImg}
        />
        <Image
          source={require("../../assets/title.png")}
          style={styles.title}
        />
        
        <Text style={{ color: "red" }}>
          {error?.dni && "No encontramos un usuario asociado a ese DNI"}
        </Text>
        <Text style={{ color: "red" }}>
          {error?.password && "Contraseña incorrecta"}
        </Text>
        <Text style={{ color: "red" }}>
          {inputError && "Por favor ingrese un DNI válido"}
        </Text>
        <TextInput
          style={[
            styles.input,
            { marginBottom: 30 },
            isFocused.dni ? styles.active : null,
          ]}
          placeholder="DNI"
          keyboardType="number-pad"
          value={inputs.dniInput}
          onChangeText={(txt) => handleChange(txt, "dni")}
          onFocus={() => handleFocus("dni")}
          onBlur={() => handleBlur("dni")}
        />
        <View style={{ marginBottom: 30 }}>
          <TextInput
            style={[
              styles.input,
              { marginBottom: 10 },
              isFocused.password ? styles.active : null,
            ]}
            placeholder="Contraseña"
            value={inputs.passInput}
            secureTextEntry={true}
            onChangeText={(txt) => handleChange(txt, "password")}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("ResetPass")}>
            <Text style={{ color: "#2290CD" }}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
        <Button title="Ingresar" onPress={handleSubmit} />
      </CenterView>
      //</ScrollView>
    );
  }

  if (error) {
    return (
      <CenterView>
        {console.log(JSON.stringify(error))}
        <Text>{JSON.stringify(error)}</Text>
      </CenterView>
    );
  }
};

const styles = StyleSheet.create({
  landingImg: {
    marginBottom: 20,
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
  title: {
    width: 150,
    height: 80,
  }
});

export default LoginScreen;
