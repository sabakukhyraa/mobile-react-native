import { Alert, Image, Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Text, View } from '@/src/components/Themed';
import { FIREBASE_AUTH } from '@/Firebase';
export default function SettingsScreen() {
  const colorScheme = useColorScheme();

  const logout = () => {
    // const alertResponse = Alert.alert('Question', 'Are you sure you want to log out?', [
    //   { text: 'Cancel', onPress: () => { } },
    //   { text: 'Sure', onPress: () => FIREBASE_AUTH.signOut() }
    // ])
    FIREBASE_AUTH.signOut()
  }

  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        <Pressable
          style={styles.listItem}
          onPress={() => { }}
        >
          {({ pressed }) => (
            <View style={styles.listItemInside}>
              <FontAwesome
                name="sticky-note"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={styles.listText}>
                Something
              </Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={styles.listItem}
          onPress={() => { }}
        >
          {({ pressed }) => (
            <View style={styles.listItemInside}>
              <FontAwesome
                name="trash"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={styles.listText}>
                Delete All Data
              </Text>
            </View>
          )}
        </Pressable>
        <Pressable
          style={styles.listItem}
          onPress={logout}
        >
          {({ pressed }) => (
            <View style={styles.listItemInside}>
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text style={styles.listText}>
                Log out
              </Text>
            </View>
          )}
        </Pressable>
        <Image style={styles.image} source={require('@/assets/images/surfing.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listSection: {
    width: '100%',
  },
  listItem: {
    color: 'white',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderBottomWidth: .5,
    borderColor: 'white',
  },
  listItemInside: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listText: {
    fontSize: 20,
  },
  image: {
    marginTop: '25%',
    resizeMode: 'contain',
    width: '100%',
    height: '45%',
  },
});
