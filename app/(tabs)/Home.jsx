import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function Home() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user?.weight) {
      router.replace('/preference/Preference')
    }
  }, [user])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}