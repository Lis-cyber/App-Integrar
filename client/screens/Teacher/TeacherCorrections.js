import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  TextInput
} from "react-native";
import CenterView from "../../utils/CenterView";
import { useQuery, gql } from "@apollo/client";

const TeacherCorrections = ({route, navigation}) => {
    // Agregar al stack de teachers cuando este hecho Corrections en el back
    // Corregir la estructura del componente
    // Id del alumno
    // const _id = route.params._id
    const [input, setInput] = useState("")
    const [score, setScore] = useState()
    const numbers = ['1','2','3','4','5','6','7','8','9','10']
    const setCorrection = (correction) => {
        setScore(correction)
        alert(`La nota es ${correction}`)
      }
      
    return ( 
        <View>
            <CenterView>
                <Text>Corregir Tarea</Text>
                    <TextInput
                    placeholder="Observaciones..."
                    numberOfLines = {10}
                    multiline = {true}
                    value={input}
                    onChangeText={(value) => setInput(value)}
                    />
                    
                    <Text style={{paddingHorizontal: 10, color: 'white', fontSize: 15}} >Nota</Text>
                            <Picker 
                            selectedValue={score}
                            style={{ height: 25, width: 75, color: 'white'}}
                            onValueChange={(value) => setCorrection(value)}
                            >
                              {numbers.map((item, index) => {
                                return (<Picker.Item label={item} value={item} key={index}/>) 
                            })}
                            </Picker>
                <Button title="Enviar Tarea Corregida" onPress={() => alert(input)} />
            </CenterView>
        </View>
    )
}

export default TeacherCorrections;
