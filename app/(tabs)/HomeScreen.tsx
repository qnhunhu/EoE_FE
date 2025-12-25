
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import useEggProducts from '@/hooks/useEggProducts'; // Assuming this hook exists and fetches data
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { products, loading } = useEggProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleCartPress = () => router.push('/ShoppingCart');

  useEffect(() => {
  }, [products]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerTop}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.location}>Ho Chi Minh City, VN</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
            <Ionicons name="notifications-outline" size={24} color={Colors.light.text.primary} />
            <View style={styles.badge}><Text style={styles.badgeText}>2</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
            <Ionicons name="cart-outline" size={24} color={Colors.light.text.primary} />
            <View style={styles.badge}><Text style={styles.badgeText}>5</Text></View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={Colors.light.text.secondary} style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search fresh eggs..."
          placeholderTextColor={Colors.light.text.secondary}
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          returnKeyType="search"
          onSubmitEditing={() => setSearchTerm(query.trim())}
        />
      </View>
    </View>
  );


  const categories = [
    { id: '1', label: 'All', icon: 'apps-outline' },
    { id: '2', label: 'Chicken', icon: 'egg-outline' },
    { id: '3', label: 'Duck', icon: 'egg-outline' },
    { id: '4', label: 'Quail', icon: 'ellipse-outline' },
    { id: '5', label: 'Salted', icon: 'cafe-outline' },
  ];

  // Process products into different sections
  const { popularProducts, freshProducts, specialProducts } = React.useMemo(() => {
    // Create a copy of the products array to avoid mutating the original
    const productsCopy = [...products];
    
    // 1. Popular Products - Top 4 by soldCount (descending)
    const popularProducts = [...productsCopy]
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 4);
    
    // 2. Fresh Everyday - Products with 'fresh' in name (case insensitive)
    const freshProducts = productsCopy.filter(product => 
      product.name?.toLowerCase().includes('fresh')
    );
    
    // 3. Special Choice - Bottom 4 by soldCount (ascending)
    const specialProducts = [...productsCopy]
      .sort((a, b) => (a.soldCount || 0) - (b.soldCount || 0))
      .slice(0, 4);
    
    return { popularProducts, freshProducts, specialProducts };
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = React.useMemo(() => {
    const q = (searchTerm || query || '').toLowerCase();
    return products.filter((p) => {
      const matchesQuery = q ? (p.name || '').toLowerCase().includes(q) : true;
      const matchesCategory = selectedCategory === 'All' ? true : (p.category || '').toLowerCase() === selectedCategory.toLowerCase();
      return matchesQuery && matchesCategory;
    });
  }, [products, searchTerm, query, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 50, backgroundColor: '#fff' }}>
        {renderHeader()}
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Categories */}
          <View style={styles.categorySection}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryChip, selectedCategory === cat.label && styles.categoryChipSelected]}
                  onPress={() => setSelectedCategory(cat.label)}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={20}
                    color={selectedCategory === cat.label ? '#fff' : Colors.light.text.secondary}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={[styles.categoryText, selectedCategory === cat.label && styles.categoryTextSelected]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {(searchTerm || selectedCategory !== 'All') ? (
            <View style={{ paddingHorizontal: 16 }}>
              <Text style={styles.sectionTitle}>Results ({filteredProducts.length})</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {filteredProducts.map((item) => (
                  <ProductCard
                    key={item.eggId}
                    id={item.eggId}
                    image={item.imageURL}
                    title={item.name}
                    oldPrice={item.price * 1.2}
                    newPrice={item.price}
                    sold={item.soldCount || 0}
                  />
                ))}
              </View>
            </View>
          ) : (
            <>
              {/* Popular Section */}
              <View style={{ marginBottom: 24 }}>
                <View style={styles.productListHeader}>
                  <Text style={styles.sectionTitle}>Popular</Text>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/(customer-tabs)/AllProductsScreen', params: { category: 'popular', title: 'Popular Products' } })}>
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                  {popularProducts.map((item) => (
                    <ProductCard
                      key={item.eggId}
                      id={item.eggId}
                      image={item.imageURL}
                      title={item.name}
                      oldPrice={item.price * 1.2}
                      newPrice={item.price}
                      sold={item.soldCount || 0}
                    />
                  ))}
                </View>
              </View>

              {/* Fresh Section */}
              <View style={{ marginBottom: 24 }}>
                <View style={styles.productListHeader}>
                  <Text style={styles.sectionTitle}>Fresh Everyday</Text>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/(customer-tabs)/AllProductsScreen', params: { category: 'fresh', title: 'Fresh Products' } })}>
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 16 }}>
                  {freshProducts.slice(0, 4).map((item) => (
                    <ProductCard
                      key={item.eggId}
                      id={item.eggId}
                      image={item.imageURL}
                      title={item.name}
                      oldPrice={item.price * 1.2}
                      newPrice={item.price}
                      sold={item.soldCount || 0}
                    />
                  ))}
                </View>
              </View>

              {/* Special Section */}
              <View style={{ marginBottom: 100 }}>
                <View style={styles.productListHeader}>
                  <Text style={styles.sectionTitle}>Special Choice</Text>
                  <TouchableOpacity onPress={() => router.push({ pathname: '/(customer-tabs)/AllProductsScreen', params: { category: 'special', title: 'Special Choice' } })}>
                    <Text style={styles.seeAll}>See All</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingHorizontal: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  {specialProducts.map((item) => (
                    <ProductCard
                      key={item.eggId}
                      id={item.eggId}
                      image={item.imageURL}
                      title={item.name}
                      oldPrice={item.price * 1.2}
                      newPrice={item.price}
                      sold={item.soldCount || 0}
                    />
                  ))}
                </View>
              </View>
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: Colors.light.text.secondary,
    marginBottom: 4,
  },
  location: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text.primary,
  },
  iconRow: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.error,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FAFAFA',
  },
  badgeText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
      android: { elevation: 2 }
    })
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text.primary,
  },
  filterBtn: {
    display: 'none',
  },
  categorySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text.primary,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categoryChipSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text.secondary,
  },
  categoryTextSelected: {
    color: '#fff',
  },
  productListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 12,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600'
  }
});