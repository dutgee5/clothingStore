import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Input from '../../components/Input';
import auth from '@react-native-firebase/auth';
import Product from '../../components/Product';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    <View>
      <View>
        <Text>Hello, Welcome 👋</Text>
        <Text>{user?.email}</Text>
        {/* profile image*/}
      </View>

      <View>
        <Input
          value={search}
          placeholder={'Search clothes. . . '}
          onChangeText={text => setSearch(text)}
        />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Product
            item={item}
            onPress={() => {
              navigation.navigate('ProductDetail', { product: item });
            }}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      />
    </View>
  );
};

export default Home;
