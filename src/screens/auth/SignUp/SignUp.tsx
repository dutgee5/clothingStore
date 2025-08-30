import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation()


  function alreadAccount(){
    navigation.navigate('LoginPage')
  }
  return (
    <View style={styles.container}>
      <Input value={''} placeholder={'Enter your e-mail...'} />
      <Input value={''} placeholder={'Enter your password...'} />
      <Input value={''} placeholder={'Enter your password...'} />
      <Button onPress={() => {}} title={'Sign Up'} />

      <TouchableOpacity style={styles.touchableText} onPress={alreadAccount}>
        <Text style={styles.title}>Already account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;
