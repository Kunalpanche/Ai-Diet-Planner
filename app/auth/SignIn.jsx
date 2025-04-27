import { View, Text, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import Input from '../../components/ui/Textinput';
import Button from '../../components/ui/Button';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/FirebaseCongif';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import Colors from '../../components/ui/Colors';

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);  // State for loading animation
    const convex = useConvex();
    const { user, setUser } = useContext(UserContext);

    const onSignIn = () => {
        if (!email || !password) {
            Alert.alert('Missing Fields!', 'Please enter all fields.');
            return;
        }

        setIsLoading(true); // Start loading animation

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const userData = await convex.query(api.Users.GetUser, {
                    email: email,
                });

                console.log(userData);
                setUser(userData);
                setIsLoading(false); // Stop loading animation
                router.replace('/(tabs)/Home');
            })
            .catch((error) => {
                const errorMessage = error.message;
                setIsLoading(false); // Stop loading animation
                Alert.alert('Sign In Failed', 'Incorrect email or password. Please try again.');
            });
    };

    return (
        <View style={{ display: 'flex', alignItems: 'center', padding: 20 }}>
            <Image
                source={require('./../../assets/images/icon.png')}
                style={{ height: 150, width: 150, marginTop: 70 }}
            />
            <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 10 }}>
                Welcome Back 🙏
            </Text>
            <View
                style={{
                    marginTop: 20, width: '100%'

                }}>
                <Input placeholder={"Email"} onChangeText={setEmail} />
                <Input placeholder={"Password"} password={true} onChangeText={setPassword} />
            </View>

            <View style={{ width: '100%' }}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                ) : (
                    <Button title={'Sign In'} onPress={onSignIn} />
                )}

                <Text style={{ marginTop: 15, fontSize: 17, textAlign: 'center' }}>
                    Don't have an account?
                </Text>
                <Pressable onPress={() => router.push('auth/SignUp')}>
                    <Text style={{
                        marginTop: 3,
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}>
                        Create New Account
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
