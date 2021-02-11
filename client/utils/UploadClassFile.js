import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { useMutation } from "@apollo/client";
import { UPLOAD_CLASS_FILE } from "./graphql";
import { GET_CLASS_BY_ID } from "../screens/Teacher/FilesFromClass";

export default function UploadClassFile({ navigation, route }) {
  const [sendFile, { data, loading, error }] = useMutation(UPLOAD_CLASS_FILE);
  const [file, setFile] = useState();
  const classId = route.params?._id;

  const pickFile = async () => {
    try {
      const filePicked = await DocumentPicker.getDocumentAsync();

      if (filePicked.type !== "cancel") {
        const nativeFile = new ReactNativeFile({
          uri: filePicked.uri,
          name: filePicked.name,
          type: "*/*",
        });

        setFile(nativeFile);
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
      <View style={styles.indicationsCont}>
        <Text style={styles.instructionsT}>Instrucciones</Text>
        <Text style={styles.instructions}>1) Elije un archivo para subir</Text>
        <Text style={styles.instructions}>
          2) Cuando aparezca el tilde, confirma el nombre del archivo
          seleccionado
        </Text>
        <Text style={styles.instructions}>3) Sube el archivo</Text>
      </View>
      {file ? (
        <></>
      ) : (
        <TouchableOpacity onPress={pickFile} style={styles.btnPick}>
          <Text style={styles.btnPickTxt}>Elegir archivo para subir</Text>
        </TouchableOpacity>
      )}
      {file ? (
        <View style={styles.file}>
          <Text style={styles.fileTxt}>Archivo seleccionado:</Text>
          <Text style={styles.fileTxt}>{file.name}</Text>
          <Image source={require("../assets/tenor.gif")} style={styles.img} />
        </View>
      ) : (
        <></>
      )}
      {file ? (
        <TouchableOpacity
          style={styles.btnUp}
          onPress={() => {
            try {
              sendFile({
                variables: { file, classId },
                refetchQueries: [
                  { query: GET_CLASS_BY_ID, variables: { _id: classId } },
                ],
              });
              navigation.pop();
            } catch (err) {
              console.log(err);
            }
          }}
        >
          <Text style={styles.btnUpTxt}>SUBIR ARCHIVO</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = new StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  btnPick: {
    backgroundColor: "#E97820",
    width: 270,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 35,
  },
  btnPickTxt: {
    fontSize: 16,
    color: "#F5EFEA",
  },
  btnUp: {
    backgroundColor: "green",
    width: 270,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    margin: 35,
  },
  btnUpTxt: {
    fontSize: 16,
    color: "#F5EFEA",
  },
  img: {
    width: 60,
    height: 60,
    margin: 20,
  },
  file: {
    justifyContent: "center",
    alignItems: "center",
  },
  fileTxt: {
    color: "#272727",
    fontSize: 15,
    margin: 2,
  },
  indicationsCont: {
    backgroundColor: "#D0DFF9",
    padding: 12,
    borderRadius: 3,
    marginTop: 15,
  },
  instructionsT: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#272727",
  },
  instructions: {
    color: "#272727",
  },
});
