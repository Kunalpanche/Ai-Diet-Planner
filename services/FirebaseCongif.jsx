// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-diet-planner-50a15.firebaseapp.com",
    projectId: "ai-diet-planner-50a15",
    storageBucket: "ai-diet-planner-50a15.firebasestorage.app",
    messagingSenderId: "888144606384",
    appId: "1:888144606384:web:9cb78f1fab7a03e870b775"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = Platform.OS == 'web' ? getAuth(app) : initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});