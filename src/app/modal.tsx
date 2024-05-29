import { Pressable, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/src/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <TextInput multiline={true} placeholder='Type here...' placeholderTextColor="rgba(255,255,255,.7)" style={styles.input} />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    height: '100%',
    padding: 16,
    color: 'white',
    textAlignVertical: 'top',
  },
  button: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'black'
  }
});
