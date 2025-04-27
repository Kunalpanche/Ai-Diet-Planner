import { View, Text, TextInput} from 'react-native'
import React from 'react'


export default function Input({placeholder, password=false,onChangeText}) {
  return (
    <TextInput placeholder={placeholder} 
    secureTextEntry={password}
    onChangeText={(value)=>onChangeText(value)}
    style={{
      padding:15,
      borderWidth:1,
      borderRadius:10,
      fontSize:17,
      marginTop:15,
      width:'100%'
    }}/>
  )
}