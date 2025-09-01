import { View, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';

interface InputProps {
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const Input = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default Input;
