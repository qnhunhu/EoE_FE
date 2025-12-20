
import ProductCard from '@/components/ProductCard';
import useEggProducts from '@/hooks/useEggProducts';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
  const Router = useRouter();
  const { products, loading } = useEggProducts();
  if (loading) {
    return <Text>Loading...</Text>;
  }
  const handleChangeToShoppingCart = () => {
    Router.push('/ShoppingCart');
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Fixed Header */}
      <SafeAreaView style={{

        backgroundColor: '#034C53',
        paddingTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 8,
        zIndex: 10,
        elevation: 10
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 24 }}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 8,
            }}
          />
          <View style={styles.heartIcons}>
            <TouchableOpacity style={styles.heartIcon} onPress={handleChangeToShoppingCart}>
              <Ionicons name="heart-outline" size={24} color="white" />
              <View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
            </TouchableOpacity>
            <View style={styles.heartIcon}>
              <Ionicons name="chatbubble-outline" size={24} color="white" />
              <View style={styles.badge}><Text style={styles.badgeText}>12</Text></View>
            </View>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView style={{ flex: 1, backgroundColor: '#034C53' }}>
        {/* Categories */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', paddingVertical: 12, gap: 12, paddingHorizontal: 15 }}>
          <Category icon="flash" label="Flash sales" />
          <Category icon="egg-outline" label="Egg" />
          <Category icon="flower-outline" label="Decorated" />
        </View>

        {/* Grid product list */}
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          backgroundColor: '#F4F4F4',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 20,
        }}>
          {loading ? (
              <Text>Loading...</Text>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.eggId}
                  id={product.eggId}
                  sold={product.soldCount} 
                  title={product.name}
                  oldPrice={product.price * 2} 
                  newPrice={product.price}
                  image={product.imageURL}
                />
              ))
            )}


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#fff', borderRadius: 20, padding: 6,
  },
  heartIcons: {
    flexDirection: 'row', gap: 5,
  },
  heartIcon: {

    backgroundColor: '#034C53', borderRadius: 20, padding: 8, position: 'relative',
  },
  badge: {
    position: 'absolute', top: -5, right: -5, backgroundColor: 'red', borderRadius: 10, paddingHorizontal: 5,
  },
  badgeText: { color: 'white', fontSize: 10 },
});

function Category({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 6
      }}>

        <Ionicons name={icon} size={24} color="#034C53" />
      </View>
      <Text style={{ color: 'white' }}>{label}</Text>
    </View>
  );
}