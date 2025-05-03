import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import Colors from '../../components/ui/Colors'
import Input from '../../components/ui/Textinput'
import { HugeiconsIcon } from '@hugeicons/react-native';
import { BodyPartMuscleFreeIcons, BodyWeightFreeIcons, FemaleSymbolFreeIcons, Jsx01FreeIcons, MaleSymbolFreeIcons, SpoonAndKnifeFreeIcons } from '@hugeicons/core-free-icons';
import Button from '../../components/ui/Button'
import { SafeAreaView } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Alert } from 'react-native';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'expo-router';
import { CalculateCaloriesAI } from '../../services/AiModel';
import Prompt from '../../services/Prompt';
import { jsonToConvex } from 'convex/values';
export default function Preference() {

  const [weight, setWeight] = useState()
  const [height, setheight] = useState()
  const [gender, setGender] = useState()
  const [goal, setGoal] = useState()
  const { user, setUser } = useContext(UserContext)
  const UpdateUserPreference = useMutation(api.Users.UpdateUserPreference)
  const router = useRouter();
  const Oncontinue = async () => {
    if (!weight || !height || !goal || !gender) {
      Alert.alert("Oops!", "Some fields are still empty.");
      return;
    }

    const data = {
      uid: user?._id,
      weight: weight,
      height: height,
      gender: gender,
      goal: goal,
    }

    const PROMPT = JSON.stringify(data) + Prompt.CALORIES_PROMPT
    // console.log(PROMPT);
    const AIResult = await CalculateCaloriesAI(PROMPT);
    // console.log(AIResult.text)
    const AIResponse =AIResult.text
    const JSONContent = JSON.parse(AIResponse.replace('```json', '').replace('```',  ''))
    console.log(JSONContent)
  

    const result = await UpdateUserPreference({
      ...data,
      ...JSONContent
    })

    setUser(prev=>({
      ...prev,
      ...data
    }))

    router.replace('/(tabs)/Home')

  }

  return (

    <SafeAreaView style={{
      padding: 20,
      flex: 1
    }}>
      <View style={{

      }}>
        <Text style={{
          marginTop: 5,
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 25,
          color: Colors.PRIMARY

        }}>Tell us about yourself</Text>

        <Text style={{
          marginTop: 5,
          textAlign: 'center',
          color: Colors.GRAY,
          fontSize: 16,

        }}>This help us create your personalized meal plan</Text>
      </View>
      <View style={{
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 10

      }}>
        <View style={{
          flex: 1,

        }}>
          <Input
            placeholder={'e.g 60'} label='Weight (kg)' onChangeText={setWeight} />
        </View>
        <View style={{
          flex: 1
        }}>
          <Input
            placeholder={'e.g 60'} label='Height (ft)' onChangeText={setheight} />
        </View>
      </View>


      {/* Gender */}
      <View style={{
        marginTop: 20,

      }}>
        <Text style={{
          fontSize: 17,
          fontWeight: '500'
        }}>
          Gender
        </Text>

        <View style={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 10
        }}>
          <TouchableOpacity onPress={() => setGender('Male')} style={{
            borderWidth: gender == 'Male' ? 1.7 : 1,
            borderColor: gender == 'Male' ? Colors.PRIMARY : Colors.GRAY,
            borderRadius: 10,
            padding: 10,
            flex: 1,
            alignItems: 'center'
          }}>
            <HugeiconsIcon icon={MaleSymbolFreeIcons}
              size={44}
              color={Colors.BLUE}
              strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setGender('Female')} style={{
            borderWidth: gender == 'Female' ? 1.7 : 1,
            borderColor: gender == 'Female' ? Colors.PRIMARY : Colors.GRAY,
            borderRadius: 10,
            padding: 10,
            flex: 1,
            alignItems: 'center'
          }}>
            <HugeiconsIcon icon={FemaleSymbolFreeIcons}
              size={44}
              color={Colors.PINK}
              strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>


      {/* Goals */}
      <View style={{
        marginTop: 20
      }}>
        <Text style={{
          fontWeight: '500',
          fontSize: 17,
        }}>
          What's Your Goal ?
        </Text>

        {/* Lose Weight */}
        <TouchableOpacity onPress={() => setGoal('Lose Weight')} style={{
          padding: 13,
          marginTop: 10,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: goal == 'Lose Weight' ? 1.7 : 1,
          borderColor: goal == 'Lose Weight' ? Colors.PRIMARY : Colors.GRAY,

        }}>
          <HugeiconsIcon icon={BodyWeightFreeIcons}
            size={24}
            color={Colors.RED} />
          <View style={{
            marginLeft: 20
          }}>
            <Text style={{
              fontSize: 19,
              fontWeight: 'bold'
            }}>Lose Weight</Text>
            <Text>Trim down and feel lighter</Text>
          </View>
        </TouchableOpacity>

        {/* Gain Weight */}
        <TouchableOpacity onPress={() => setGoal('Gain Weight')} style={{
          padding: 13,
          marginTop: 10,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: goal == 'Gain Weight' ? 1.7 : 1,
          borderColor: goal == 'Gain Weight' ? Colors.PRIMARY : Colors.GRAY,

        }}>
          <HugeiconsIcon icon={SpoonAndKnifeFreeIcons}
            size={24}
            color={Colors.BLUE} />
          <View style={{
            marginLeft: 20
          }}>
            <Text style={{
              fontSize: 19,
              fontWeight: 'bold'
            }}>Gain Weight</Text>
            <Text>Increase healthy body mass</Text>
          </View>
        </TouchableOpacity>

        {/* Build Muscle */}
        <TouchableOpacity onPress={() => setGoal('Muscle gain')} style={{
          borderWidth: 1,
          padding: 13,
          marginTop: 10,
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: goal == 'Muscle gain' ? 1.7 : 1,
          borderColor: goal == 'Muscle gain' ? Colors.PRIMARY : Colors.GRAY,

        }}>
          <HugeiconsIcon icon={BodyPartMuscleFreeIcons}
            size={24}
            color={Colors.THI} />
          <View style={{
            marginLeft: 20
          }}>
            <Text style={{
              fontSize: 19,
              fontWeight: 'bold'
            }}>Muscle Gain</Text>
            <Text>Build Muscle & get stronger</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{
        marginTop: 20
      }}>
        <Button title={"Continue"} onPress={Oncontinue} />
      </View>
    </SafeAreaView>
  )
}