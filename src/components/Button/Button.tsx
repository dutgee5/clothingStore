import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';

interface ButtonProps {
  onPress: () => void;
  title: string;
}

const Button = ({ onPress, title }: ButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}
      style={styles.button}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
