import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Input from '../../components/Input';
import auth from '@react-native-firebase/auth';
import Product from '../../components/Product';
import firestore from '@react-native-firebase/firestore';

const Home = () => {
  const user = auth().currentUser;
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('Firestore’dan gelen ürünler:', items); // 🔍 burada kontrol et
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
    console.log('Search value:', search);
  }, [search, products]);

  return (
    <View>
      <View>
        <Text>Hello, Welcome 👋</Text>
        <Text>{user?.email}</Text> {/*logged in user*/}
        {/*
      profile image
      */}
      </View>

      <View>
        <Input
          value={search}
          placeholder={'Search clothes. . . '}
          onChangeText={text => setSearch(text)}
        />
      </View>

      <View>
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <Product item={item} />}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;
