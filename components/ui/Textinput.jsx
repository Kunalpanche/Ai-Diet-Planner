import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Colors from './Colors'

export default function Input({ placeholder, password = false, label = '', style, onChangeText }) {
  return (
    <View style={{
      marginTop: 1,
      // width:'100%'
    }}>
      
      <Text style={{
        fontWeight: '500',
        fontSize: 17
      }}>{label}</Text>

      <TextInput placeholder={placeholder}
        secureTextEntry={password}
        onChangeText={(value) => onChangeText(value)}
        style={{
          padding: 15,
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 17,
          marginTop: 3,
          width: '100%',
          borderColor: Colors.GRAY
        }} />
    </View>
  )
}