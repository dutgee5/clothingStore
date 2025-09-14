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
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import { View } from 'react-native';
import ProductDetail from './src/screens/home/ProductDetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

type Props = {
  name: string;
  focused: boolean;
  color: string;
  size: number;
  iconStyle?: string;
};

function TabBarIcon({ name, focused, color, size, iconStyle }: Props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <FontAwesome6
        name={name}
        size={size}
        color={color}
        iconStyle={iconStyle}
      />
    </View>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Clothing Store', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={({ route }) => ({
          headerTitleAlign: 'center',
          title: route.params.product.name,
        })}
      />
    </Stack.Navigator>
  );
};
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderRadius: 44,
          backgroundColor: '#292526',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: props => (
            <TabBarIcon name={'house-chimney'} iconStyle="solid" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: props => (
            <TabBarIcon name={'shop'} iconStyle="solid" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: props => (
            <FontAwesome6
              name="heart-circle-plus"
              iconStyle="solid"
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: props => <TabBarIcon name={'user'} {...props} />,
        }}
      />
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
    const subscriber = onAuthStateChanged(getAuth(), firebaseUser => {
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
