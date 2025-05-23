
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import { useState } from "react";
import {UserContext} from './../context/UserContext'
export default function RootLayout() {

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL, {
    unsavedChangesWarning: false,
  });


  const [user, setUser] = useState();
  return (
    <ConvexProvider client={convex}>
      <UserContext.Provider value={{user, setUser}}>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "white" }
      }}>
        <Stack.Screen name="index" />
      </Stack>
      </UserContext.Provider>
    </ConvexProvider>

  );
}
