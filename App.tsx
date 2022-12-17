import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined,
  LessonsModal: undefined
}
const RootStack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Group>
            <RootStack.Screen name="Home" component={HomeScreen} />
            <RootStack.Screen name="LessonsModal" component={LessonsModal} options={{ presentation: 'modal' }} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>
const HomeScreen = ({ navigation }: HomeProps) => {
  return (
    <View style={styles.container}>
      <Text>What's up Dave!</Text>
      <StatusBar style="auto" />
      <Button title='Go to lesson 1' 
        onPress={() => navigation.navigate("LessonsModal")}
      />
    </View>
  )
}

type LessonsModalProps = NativeStackScreenProps<RootStackParamList, 'LessonsModal'>
const LessonsModal = ({ navigation }: LessonsModalProps) => {
  return (
    <View style={styles.container}>
      <Text>In the modal!</Text>
      <Button onPress={() => navigation.goBack()} title="Dismiss" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
