
import ProductCard from '@/components/ProductCard';
import { Colors } from '@/constants/Colors';
import useEggProducts from '@/hooks/useEggProducts'; // Assuming this hook exists and fetches data
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { products, loading } = useEggProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCartPress = () => router.push('/ShoppingCart');

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
        />
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="options-outline" size={20} color="#fff" />
        </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" /> */}
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: '#FAFAFA' }} /> */}

      <SafeAreaView style={styles.content}>
        <FlatList
          ListHeaderComponent={
            <>
              {renderHeader()}

              {/* Banner / Promotion could go here */}

              {/* Categories */}
              <View style={styles.categorySection}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.label;
                    return (
                      <TouchableOpacity
                        key={cat.id}
                        style={[
                          styles.categoryChip,
                          isSelected && styles.categoryChipSelected
                        ]}
                        onPress={() => setSelectedCategory(cat.label)}
                      >
                        <Ionicons
                          name={cat.icon as any}
                          size={16}
                          color={isSelected ? '#fff' : Colors.light.text.secondary}
                          style={{ marginRight: 6 }}
                        />
                        <Text style={[
                          styles.categoryText,
                          isSelected && styles.categoryTextSelected
                        ]}>
                          {cat.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </ScrollView>
              </View>

              <View style={styles.productListHeader}>
                <Text style={styles.sectionTitle}>Popular Products</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>See All</Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={products}
          keyExtractor={(item) => item.eggId.toString()}
          renderItem={({ item }) => (
            <ProductCard
              id={item.eggId}
              sold={item.soldCount}
              title={item.name}
              oldPrice={item.price * 1.2} // Mock old price
              newPrice={item.price}
              image={item.imageURL}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            loading ? <ActivityIndicator size="large" color={Colors.light.primary} style={{ marginTop: 20 }} /> :
              <Text style={{ textAlign: 'center', marginTop: 20 }}>No products found.</Text>
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
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
    backgroundColor: Colors.light.primary,
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
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
    fontWeight: '600',
  }
});