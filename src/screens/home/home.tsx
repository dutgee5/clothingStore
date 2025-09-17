import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import auth from '@react-native-firebase/auth';
import Product from '../../components/Product';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styles from './styles';

const Home = () => {
  const user = auth().currentUser;
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
        setFilteredProducts(items);
      });

    return () => unsubscribe(); // cleanup
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredProducts(products);
    } else {
      const result = products.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredProducts(result);
    }
  }, [search, products]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Hello, Welcome 👋</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Input
          value={search}
          placeholder={'Search clothes...'}
          onChangeText={text => setSearch(text)}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            item={item}
            onPress={() =>
              navigation.navigate('ProductDetail', { product: item })
            }
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;
