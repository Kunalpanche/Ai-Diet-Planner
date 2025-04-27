import { View, Image, Dimensions, Text } from "react-native";
import Button from "../components/ui/Button"
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../services/FirebaseCongif'
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import { useConvex } from "convex/react";

export default function Index() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const convex = useConvex();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      console.log(userInfo?.email)
      const userData = await convex.query(api.Users.GetUser, {
        email: userInfo?.email,
      });

      setUser(userData)
      console.log(userData)
    })

    return ()=>unsubscribe();
  }, []);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>


      <View style={{
        position: 'absolute',
        height: Dimensions.get('screen').height,
        // backgroundColor: '#0707075e',
        width: '100%',
        display: "flex",
        alignItems: "center",
        padding: 10
      }}>
        <Image source={require('../assets/images/icon.png')}
          style={{
            width: 150,
            height: 150,
            marginTop: 300,
          }} />

        <Text style={{
          fontSize: 30,
          // fontStyle: '',
          fontWeight: 'bold',
          marginTop: 20
        }}>AI Diet Planner</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
            marginHorizontal: 20,
            marginTop: 15
          }}> Personalized meal plans crafted just for you.
        </Text>
        <Text style={{
          textAlign: 'center',
          fontSize: 16,
          marginHorizontal: 20,
          marginTop: 2
        }}> Eat smart, live better!</Text>


      </View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        bottom: 30,
        padding: 20

      }}>
        <Button title={'Get Started'}
          onPress={() => router.push('/auth/SignIn')}
        />
      </View>

    </View>
  );
}
