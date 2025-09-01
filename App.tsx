import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/auth/Login';
import { useEffect, useState } from 'react';
import Home from './src/screens/home';
import SignUp from './src/screens/auth/SignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Favourite from './src/screens/favourite';
import Cart from './src/screens/cart';
import Account from './src/screens/account';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Favourite" component={Favourite} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={Login} />
      <Stack.Screen name="SignUpPage" component={SignUp} />
    </Stack.Navigator>
  );
}

function RootStack() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (firebaseUser) => {
      setUser(firebaseUser);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, [initializing]);

  if (initializing) return null; // yüklenme ekranı koyabilirsin

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="Tabs" component={Tabs} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
