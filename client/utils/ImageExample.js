import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

export default function ImageExample() {

  return(
    <ScrollView centerContent={true} horizontal={true} style={{backgroundColor: '#DEE2E9'}}>
    <Image
    style={styles.imageState}
    source={require("../assets/ejemplocsv.png")}
  />
  </ScrollView>
  )
}

const styles = new StyleSheet.create({
  imageState: {
    width: 700,
    height: 380,
    resizeMode: "center",
    margin: 0
  },
})