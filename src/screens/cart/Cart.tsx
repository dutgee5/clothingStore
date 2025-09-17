import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../features/cart/cartSlice';
import Button from '../../components/Button';

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price} ₺</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity(item.id))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantityNumber}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity(item.id))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
        <Text style={styles.removeText}>🗑</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your Cart is Empty</Text>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: {totalPrice} ₺</Text>
          <Button title="Payment" onPress={() => {}} />
        </View>
      )}
    </View>
  );
};

export default Cart;
