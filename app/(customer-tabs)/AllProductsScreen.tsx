import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  eggId: number;
  name: string;
  price: number;
  soldCount: number;
  imageURL: string;
  category?: string;
};

export default function AllProductsScreen() {
  const router = useRouter();
  const { products, loading } = useEggProducts();
  const { category, title } = useLocalSearchParams<{ category: string, title: string }>();

  const processedProducts = React.useMemo(() => {
    let prods = [...products];
    switch (category) {
      case 'popular':
        return prods.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      case 'fresh':
        return prods.filter(p => (p.name || '').toLowerCase().includes('fresh'));
      case 'special':
        return prods.sort((a, b) => (a.soldCount || 0) - (b.soldCount || 0));
      default:
        return prods;
    }
  }, [products, category]);

  const renderProductItem = ({ item }: { item: Product }) => (
    <ProductCard
      id={item?.eggId}
      sold={item?.soldCount}
      title={item?.name}
      oldPrice={(item?.price || 0) * 1.2}
      newPrice={item?.price}
      image={item?.imageURL}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.light.text.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{title || 'All Products'}</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.light.primary} style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={processedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.eggId.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No products found.</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text.primary,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: Colors.light.text.secondary,
  }
});
