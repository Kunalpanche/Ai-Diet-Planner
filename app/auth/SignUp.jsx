import { View, Text, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useContext, useState } from 'react';
import Input from '../../components/ui/Textinput';
import Button from '../../components/ui/Button';
import { Link, useRouter } from 'expo-router';
import { auth } from '../../services/FirebaseCongif';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import Colors from '../../components/ui/Colors';

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const createNewUser = useMutation(api.Users.CreatNewUser);
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = () => {
    if (!name || !email || !password) {
      Alert.alert('Missing Fields!', 'Please fill all the fields.');
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (user) {
          const result = await createNewUser({
            name: name,
            email: email,
          });
          console.log(result);
          setUser(result);
          setIsLoading(false);
          Alert.alert(
            'Account Created Successfully',
            'Your account has been created. Please sign in using your credentials.'
          );

          router.replace('/auth/SignIn') // Redirect to home or any page
        }
      })
      .catch(() => {
        setIsLoading(false); 
        Alert.alert('Sign Up Failed', 'Please enter a valid email address and a strong password.');
      });
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
      }}>
      <Image
        source={require('../../assets/images/icon.png')}
        style={{
          height: 150,
          width: 150,
          marginTop: 70,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Create a New Account
      </Text>
      <View
        style={{
          marginTop: 20,
          width: '100%',
        }}>
        <Input placeholder="Full Name" onChangeText={setName} />
        <Input placeholder="Email" onChangeText={setEmail} />
        <Input placeholder="Password" password onChangeText={setPassword} />
      </View>

      <View
        style={{
          width: '100%',
          marginTop: 20,
        }}>
          {isLoading? (<ActivityIndicator size='large' color={Colors.PRIMARY}/>) :
          (<Button title="Create Account" onPress={onSignUp} />)}

        <Text
          style={{
            marginTop: 15,
            fontSize: 17,
            textAlign: 'center',
          }}>
          Already have an account?
        </Text>

        <Link href="/auth/SignIn" asChild>
          <Text
            style={{
              marginTop: 3,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: 'bold'
            }}>
            Sign In Here
          </Text>
        </Link>
      </View>
    </View>
  );
}
