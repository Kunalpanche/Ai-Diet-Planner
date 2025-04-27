import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from "./Colors"

export default function Button({title, onPress}) {
  return (
    <TouchableOpacity
    onPress={onPress}
    style= {{
      backgroundColor: Colors.PRIMARY,
      padding:12,
      width:'100%',
      marginTop:30,
      borderRadius:15
    }}>
      <Text style= {{
        color:"white",
        fontSize: 20,
        textAlign:'center'
      }}>{title}</Text>
    </TouchableOpacity>
  )
}