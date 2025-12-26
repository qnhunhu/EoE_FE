import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContent';
import useAddToCart from '@/hooks/useAddToCart';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { useToast } from '@/components/GlobalToast';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProductCard({
  id,
  image,
  title,
  oldPrice,
  newPrice,
  sold,
}: {
  id: number;
  image: string;
  title: string;
  oldPrice: number;
  newPrice: number;
  sold: number;
}) {
  const router = useRouter();
  const { addToCart } = useAddToCart();
  const {userId} = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    console.log('ProductCard props:', { id, image, title, oldPrice, newPrice, sold });
    console.log('User ID from Auth Context:', userId);
  }, [id, image, title, oldPrice, newPrice, sold, userId]);

  const handlePress = () => {
    router.push({ pathname: '/ProductDetail', params: { id } });
    console.log('Navigating to product with id:', id);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <>
    <TouchableOpacity
      style={[styles.card, globalStyles.shadow]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          // defaultSource={require('../assets/images/logoNormal.png')} 
          resizeMode="cover"
        />
        {/* Discount Badge */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>-50%</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(newPrice)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(oldPrice)}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.soldContainer}>
            <Ionicons name="flame" size={12} color={Colors.light.accent} />
            <Text style={styles.soldText}>Sold {sold}</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={async () => {
              const res = await addToCart({ eggId: id, quantity: 1, buyerId: userId || 7 });
              if (res?.ok) {
                showToast('Added to cart');
              } else {
                showToast(res?.error || 'Failed to add to cart');
              }
            }}
          >
            <Ionicons name="add" size={20} color="#fff"  />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  
  </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: Colors.light.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden', // Required for borderRadius on Image
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: '#f0f0f0',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.light.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text.primary,
    marginBottom: 8,
    minHeight: 40, // Ensure alignment
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
    flexWrap: 'wrap'
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.primary,
    marginRight: 6,
  },
  oldPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: Colors.light.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  soldText: {
    fontSize: 12,
    color: Colors.light.text.secondary,
  },
  addBtn: {
    backgroundColor: Colors.light.primary,
    borderRadius: 20,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
