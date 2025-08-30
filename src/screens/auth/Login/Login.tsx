import {
  View,
  Text,
  Pressable,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

/*-----------------------------------
   [ App Logo / Text ]

   Welcome Back 👋
   Sign in to continue

   [ Email Input ]
   [ Password Input   👁️ ]

   [ Login Button ]

   Forgot Password?

   Don’t have an account? [Sign Up]
------------------------------------*/

const Login = () => {
  const navigation = useNavigation();

  function createAccount() {
    navigation.navigate('SignUpPage');
  }
  return (
    <View style={styles.container}>
      <Input value={''} placeholder={'Enter your e-mail...'} />
      <Input value={''} placeholder={'Enter your password...'} />
      <Button onPress={() => {}} title={'Login'} />
      <TouchableOpacity style={styles.touchableText} onPress={createAccount}>
        <Text style={styles.title}>Don't you have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
