import { View, Text, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';

interface InputProps {
  value: string;
  placeholder: string;
}

const Input = ({ value, placeholder }: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default Input;
