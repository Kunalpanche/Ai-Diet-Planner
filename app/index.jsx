"use client"

import { View, Image, Dimensions, Text } from "react-native"
import Button from "../components/ui/Button"
import { useRouter } from "expo-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../services/FirebaseConfig"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/context/UserContext"
import { useConvex } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function Index() {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)
  const convex = useConvex()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userInfo) => {
      try {
        if (userInfo?.email) {
          console.log(userInfo?.email)
          const userData = await convex.query(api.Users.GetUser, {
            email: userInfo?.email,
          })

          setUser(userData)
          router.replace("/(tabs)/Home")
        } else {
          // User is not logged in
          setLoading(false)
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <View style={{
          flex: 1, justifyContent: "center", alignItems: "center"
        }}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              position: "absolute",
              height: Dimensions.get("screen").height,
              width: "100%",
              display: "flex",
              alignItems: "center",
              padding: 10,
            }}
          >
            <Image
              source={require("../assets/images/icon.png")}
              style={{
                width: 150,
                height: 150,
                marginTop: 300,
              }}
            />

            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                marginTop: 20,
              }}
            >
              AI Diet Planner
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginHorizontal: 20,
                marginTop: 15,
              }}
            >
              {" "}
              Personalized meal plans crafted just for you.
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                marginHorizontal: 20,
                marginTop: 2,
              }}
            >
              {" "}
              Eat smart, live better!
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              alignItems: "center",
              position: "absolute",
              width: "100%",
              bottom: 30,
              padding: 20,
            }}
          >
            <Button title={"Get Started"} onPress={() => router.push("/auth/SignIn")} />
          </View>
        </>
      )}
    </View>
  )
}
