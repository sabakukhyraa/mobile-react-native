import { ActivityIndicator, Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { useState } from 'react';
import { FIREBASE_AUTH } from '@/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, router } from 'expo-router';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [validationError, setValidationError] = useState('');
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.form}>
        <TextInput selectionColor="#fff" value={email} style={styles.input} placeholder='Email' placeholderTextColor="#fff" autoCapitalize='none' onChangeText={text => setEmail(text)}></TextInput>
        <TextInput selectionColor="#fff" value={password} style={styles.input} placeholder='Password' placeholderTextColor="#fff" secureTextEntry={true} autoCapitalize='none' onChangeText={text => setPassword(text)}></TextInput>
        {loading
          ? (<ActivityIndicator size="large" color="#0000ff" />)
          : (<Pressable style={styles.button} onPress={login} >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>)}
        {validationError && <Text style={styles.errorText}>{validationError}</Text>}
      </View>
      <Text style={styles.infoText}>You don't have an account yet? <Link style={styles.link} href="/register">Register now!</Link></Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, .1)',
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: 'white',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, .04)',
    borderRadius: 8,
    padding: 24,
    width: '80%',
    maxWidth: 500,
  },
  input: {
    width: '100%',
    height: 40,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: .2,
    borderBottomColor: 'white',
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  errorText: {
    color: 'red',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  infoText: {
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  link: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: 16,
  },
});