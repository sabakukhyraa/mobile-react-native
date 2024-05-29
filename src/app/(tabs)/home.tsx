import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Todo App</Text>
      <Image style={styles.image} source={require('@/assets/images/crocodile.png')} />
      <Text style={styles.text}>This is a Todo app developed by <Text style={styles.highlighted}>Ali Kerem Ata</Text> for educative reasons. But you can use it when you go to grocery shopping if you want to!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
  },
  title: {
    marginTop: '25%',
    textAlign: 'center',
    fontSize: 45,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 24,
    textAlign: 'center',
  },
  highlighted: {
    fontWeight: '900',
    fontSize: 16
  },
  image: {
    marginTop: 24,
    resizeMode: 'contain',
    width: '100%',
    height: '40%',
  }
});
