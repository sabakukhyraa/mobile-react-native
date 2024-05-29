import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Button, Platform, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { useState } from 'react';
import { FIREBASE_AUTH } from '@/Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password)
      console.log(response);
    } catch (error: any) {
      console.log(error)
      alert('Login failed ' + error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const register = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      console.log(response);
      alert('Check your email!')
    } catch (error: any) {
      console.log(error)
      alert('Register failed ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.form}>
        <TextInput value={email} style={styles.input} placeholder='Email' autoCapitalize='none' onChangeText={text => setEmail(text)}></TextInput>
        <TextInput value={password} style={styles.input} placeholder='Password' secureTextEntry={true} autoCapitalize='none' onChangeText={text => setPassword(text)}></TextInput>
        {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <></>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'rgba(0,0,0,.2)',
    borderRadius: 10,
    padding: 10,
  },
  input: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});