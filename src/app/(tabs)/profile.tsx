import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import { getAuth, updateProfile } from 'firebase/auth';

export default function ProfileScreen() {
  const update = {
    displayName: 'Alias',
    photoURL: 'https://my-cdn.com/assets/user/123.png',
  };
  // const auth = getAuth();
  // updateProfile(auth.currentUser, update)


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Image style={styles.image} source={require('@/assets/images/bike-.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    marginTop: '25%',
    resizeMode: 'contain',
    width: '100%',
    height: '45%',
  },
});
