import { View, Text } from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../features/auth/authSlice';

const Account = () => {
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await signOut(getAuth()); // Firebase’den çıkış
      dispatch(clearUser()); // Redux’u sıfırla
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };
  return (
    <View>
      <Button onPress={handleSignOut} title={'Sign Out'} />
    </View>
  );
};

export default Account;
