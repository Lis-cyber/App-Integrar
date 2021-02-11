import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { CREATE_STUDENTS_WITH_CSV } from "./graphql";

export default function CreateStudentsWithCsv() {
  const [sendFile, { data, loading, error }] = useMutation(
    CREATE_STUDENTS_WITH_CSV
  );

  const [file, setFile] = useState();
  const [typeError, setTypeError] = useState();

  // The courseId should be received by route params
  const courseId = "601736f613cb4717908902ef";

  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync();

      if (filePicked.type !== "cancel") {
        // We check if the file is .csv if thats not the case we show an error
        if (filePicked.name.slice(-3) !== "csv")
          setTypeError("Please select a .csv file");
        else {
          // If the file is .csv we clear the errors and set the state with a native file
          setTypeError(null);
          const nativeFile = new ReactNativeFile({
            uri: filePicked.uri,
            name: filePicked.name,
            type: "text/csv",
          });

          setFile(nativeFile);
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        {console.log(error)}
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );

  if (data)
    return (
      <View style={styles.center}>
        <Text>Archivo enviado correctamente</Text>
      </View>
    );

  return (
    <View style={styles.center}>
      {/* This img should be clicable and opened in a modal pero ni idea como hacer eso :( */}
      <Image
        style={styles.exampleImg}
        source={require("../assets/ejemplocsv.png")}
      />
      {/* If the file is not .csv we show a error message */}
      {typeError && <Text style={{ color: "red" }}>{typeError}</Text>}
      <TouchableOpacity onPress={pickFile}>
        <Text style={styles.btn}>Get .csv file</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          // First we check that we have a correct file and then we send it
          file &&
          sendFile({
            variables: { file, courseId },
          })
        }
      >
        <Text style={styles.btn}>Send .csv file</Text>
      </TouchableOpacity>
      <View style={styles.instructionBox}>
        <Text style={styles.intruction}>El archivo debe ser .csv</Text>
        <Text style={styles.intruction}>
          La primera fila debe contener solo los titulos de los campos
        </Text>
        <Text style={styles.intruction}>
          Deben estar acomodados en el orden propuesto y sin usar comas
        </Text>
      </View>
    </View>
  );
}

const styles = new StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    textDecorationLine: "underline",
  },
  exampleImg: {
    width: 300,
    height: 50,
    marginBottom: 20,
  },
  instructionBox: {
    marginTop: 20,
    marginRight: "auto",
    marginLeft: "auto",
    width: 250,
  },
  intruction: {
    marginBottom: 10,
  },
});
