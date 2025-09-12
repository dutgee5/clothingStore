import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';

const Product = ({ item }) => {
  return (
    <TouchableOpacity style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} ₺</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    elevation: 3, // Android gölge
    shadowColor: '#000', // iOS gölge
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
  },
  name: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e91e63',
  },
});

export default Product;
