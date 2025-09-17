import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleFavorite } from '../../features/favorite/favoriteSlice';

const Product = ({ item, onPress }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const isFavorite = favorites.some(fav => fav.id === item.id);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />

      {/* Favori Butonu */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => dispatch(toggleFavorite(item))}
      >
        <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price} ₺</Text>
    </TouchableOpacity>
  );
};

export default Product;
