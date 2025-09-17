import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../features/cart/cartSlice';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

const ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      {product.image && (
        <Image source={{ uri: product.image }} style={styles.image} />
      )}

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price} ₺</Text>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={decreaseQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityNumber}>{quantity}</Text>
        <TouchableOpacity
          onPress={increaseQuantity}
          style={styles.quantityButton}
        >
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;
