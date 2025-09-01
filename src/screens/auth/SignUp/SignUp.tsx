import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {
  getAuth,
  createUserWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { Formik } from 'formik';

const initialValues = {
  email: '',
  password: '',
  repassword: '',
};

const SignUp = () => {
  const navigation = useNavigation();

  function alreadAccount() {
    navigation.navigate('LoginPage');
  }
  function handleFormSubmit(formValues) {
    try {
      createUserWithEmailAndPassword(
        getAuth(),
        formValues.email,
        formValues.password
      );
      console.log(formValues);
    } catch (error) {}
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleSubmit }) => (
        <View style={styles.container}>
          <Input
            value={values.email}
            placeholder={'Enter your e-mail...'}
            onChangeText={handleChange('email')}
          />
          <Input
            value={values.password}
            placeholder={'Enter your password...'}
            onChangeText={handleChange('password')}
          />
          <Input
            value={values.repassword}
            placeholder={'Enter your password...'}
            onChangeText={handleChange('repassword')}
          />
          <Button onPress={handleSubmit} title={'Sign Up'} />

          <TouchableOpacity
            style={styles.touchableText}
            onPress={alreadAccount}
          >
            <Text style={styles.title}>Already account</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
