import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import styles from './styles';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/auth/authSlice';
import type { AppDispatch } from '../../../store/store';

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation<any>(); // veya tipli kullan: NativeStackNavigationProp<...>
  const dispatch = useDispatch<AppDispatch>();

  function createAccount() {
    navigation.navigate('SignUpPage');
  }

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>,
  ) => {
    try {
      setStatus(undefined);
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        values.email,
        values.password,
      );

      dispatch(
        setUser({
          email: !userCredential.user.email,
          uid: userCredential.user.uid,
        }),
      );

      // Giriş başarılı → Home sayfasına yönlendir
      navigation.getParent()?.replace('Tabs');
    } catch (error: any) {
      console.log(error);
      setStatus(error.message || 'Giriş başarısız');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Geçerli bir email gir').required('Zorunlu'),
        password: Yup.string().min(6, 'En az 6 karakter').required('Zorunlu'),
      })}
      onSubmit={handleFormSubmit}
    >
      {({ values, handleChange, handleSubmit, isSubmitting, status }) => (
        <View style={styles.container}>
          <Input
            value={values.email}
            onChangeText={handleChange('email')}
            placeholder={'Enter your e-mail...'}
          />
          <Input
            value={values.password}
            onChangeText={handleChange('password')}
            placeholder={'Enter your password...'}
            secureTextEntry
          />

          {status && (
            <Text style={{ color: 'red', marginBottom: 10 }}>{status}</Text>
          )}

          {isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button onPress={handleSubmit} title={'Login'} />
          )}

          <TouchableOpacity
            style={styles.touchableText}
            onPress={createAccount}
          >
            <Text style={styles.title}>Don't you have an account?</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Login;
