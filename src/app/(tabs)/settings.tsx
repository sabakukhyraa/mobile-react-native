import { Pressable, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { Text, View } from '@/src/components/Themed';
import { FIREBASE_AUTH } from '@/Firebase';
export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <View style={styles.listSection}>
        <Pressable
          style={styles.listItem}
          onPress={() => { }}
        >
          {({ pressed }) => (
            <>
              <FontAwesome
                name="sticky-note"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>
                Something
              </Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.listItem}
          onPress={() => { }}
        >
          {({ pressed }) => (
            <>
              <FontAwesome
                name="trash"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>
                Delete All Data
              </Text>
            </>
          )}
        </Pressable>
        <Pressable
          style={styles.listItem}
          onPress={() => FIREBASE_AUTH.signOut()}
        >
          {({ pressed }) => (
            <>
              <FontAwesome
                name="sign-out"
                size={25}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
              <Text>
                Log out
              </Text>
            </>
          )}
        </Pressable>
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
    paddingLeft: 16,
  }
});
