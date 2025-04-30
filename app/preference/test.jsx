import React, { useState } from 'react';
import {StyleSheet,View,Text, TextInput, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../components/ui/Colors'
import Button from '../../components/ui/Button'
export default function Preference({ navigation }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState(null);
  const [goal, setGoal] = useState(null);

  return (
    <View style={styles.container}>

      <View style={{
        flex:1
      }}>
        <Text style={styles.title}>Tell Us About Yourself</Text>
        <Text style={styles.subtitle}>
          This helps us create your personalized meal plan.
        </Text>

        {/* Weight and Height */}
        <View style={styles.measurementsContainer}>
          <View style={styles.measurementItem}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 70"
              keyboardType="numeric"
              value={weight}
              onChangeText={setWeight}
            />
          </View>

          <View style={styles.measurementItem}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 175"
              keyboardType="numeric"
              value={height}
              onChangeText={setHeight}
            />
          </View>
        </View>

        {/* Gender Selection */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderOption, gender === 'male' && styles.selectedGender]}
            onPress={() => setGender('male')}
          >
            <View style={styles.genderIconContainer}>
              <Ionicons name="male" size={24} color="#4285F4" />
            </View>
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderOption, gender === 'female' && styles.selectedGender]}
            onPress={() => setGender('female')}
          >
            <View style={styles.genderIconContainer}>
              <Ionicons name="female" size={24} color="#EA4335" />
            </View>
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.genderOption, gender === 'other' && styles.selectedGender]}
            onPress={() => setGender('other')}
          >
            <View style={styles.genderIconContainer}>
              <Ionicons name="person" size={24} color="#9AA0A6" />
            </View>
            <Text style={styles.genderText}>Other</Text>
          </TouchableOpacity>
        </View>

        {/* Goals */}
        <Text style={styles.label}>What's Your Goal?</Text>
        <View style={styles.goalsContainer}>
          <TouchableOpacity
            style={[styles.goalOption, goal === 'lose' && styles.selectedGoal]}
            onPress={() => setGoal('lose')}
          >
            <View style={[styles.goalIconContainer, { backgroundColor: 'rgba(234, 67, 53, 0.1)' }]}>
              <Ionicons name="trending-down" size={20} color="#EA4335" />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Lose Weight</Text>
              <Text style={styles.goalSubtitle}>Trim down and feel lighter</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.goalOption, goal === 'gain' && styles.selectedGoal]}
            onPress={() => setGoal('gain')}
          >
            <View style={[styles.goalIconContainer, { backgroundColor: 'rgba(66, 133, 244, 0.1)' }]}>
              <Ionicons name="restaurant" size={20} color="#4285F4" />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Gain Weight</Text>
              <Text style={styles.goalSubtitle}>Build mass healthily</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.goalOption, goal === 'muscle' && styles.selectedGoal]}
            onPress={() => setGoal('muscle')}
          >
            <View style={[styles.goalIconContainer, { backgroundColor: 'rgba(52, 168, 83, 0.1)' }]}>
              <Ionicons name="fitness" size={20} color="#34A853" />
            </View>
            <View style={styles.goalTextContainer}>
              <Text style={styles.goalTitle}>Build Muscle</Text>
              <Text style={styles.goalSubtitle}>Increase strength and definition</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue Button */}
      <View style={{
        marginTop:90
      }}>
        <Button title={'Continue'}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop:5,
    textAlign:'center'
  },
  subtitle: {
    color: '#666',
    marginBottom: 24,
    textAlign:'center'
  },
  measurementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  measurementItem: {
    width: '48%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  genderOption: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  selectedGender: {
    borderColor: '#6200EE',
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
  },
  genderIconContainer: {
    marginBottom: 8,
  },
  genderText: {
    color: '#333',
  },
  goalsContainer: {
    marginBottom: 24,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  selectedGoal: {
    borderColor: '#6200EE',
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalTextContainer: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  goalSubtitle: {
    color: '#666',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor:Colors.PRIMARY,
    borderRadius: 8,
    padding: 16,
    marginBottom:1
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});