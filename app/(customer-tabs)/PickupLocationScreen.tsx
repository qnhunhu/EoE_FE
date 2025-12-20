
import globalStyles from '@/assets/styles/GlobalStyle';
import { Colors } from '@/constants/Colors';
import usePickupPoints from '@/hooks/usePickupPoints';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PickupLocationScreen() {
    const router = useRouter();
    const { callbackKey } = useLocalSearchParams();

    const { pickupPoints, loading, error } = usePickupPoints();

    const [searchQuery, setSearchQuery] = React.useState('');
    const [filteredLocations, setFilteredLocations] = React.useState(pickupPoints);

    useEffect(() => {
        setFilteredLocations(pickupPoints);
    }, [pickupPoints]);

    const handleLocationSelect = (location: any) => {
        if (callbackKey) {
            router.replace({
                pathname: '/TransactionInformationScreen',
                params: { selectedLocation: JSON.stringify(location) },
            });
        } else {
            router.back();
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setFilteredLocations(pickupPoints);
        } else {
            const filtered = pickupPoints.filter(location =>
                location.name.toLowerCase().includes(query.toLowerCase()) ||
                location.address.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredLocations(filtered);
        }
    };

    const renderLocationItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={[styles.locationItem, globalStyles.shadow]} onPress={() => handleLocationSelect(item)}>
            <Image
                source={require('../../assets/images/logoNormal.png')}
                style={styles.locationImage}
                resizeMode="cover"
            />
            <View style={styles.locationDetails}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationAddress} numberOfLines={2}>{item.address}</Text>
                <View style={styles.contactRow}>
                    <Ionicons name="call-outline" size={14} color={Colors.light.text.secondary} />
                    <Text style={styles.locationContact}>{item.phone}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.light.text.light} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Select Location</Text>
                </View>
                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color={Colors.light.text.secondary} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Search for your location"
                        placeholderTextColor={Colors.light.text.secondary}
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            {loading ? (
                <View style={globalStyles.center}>
                    <ActivityIndicator size="large" color={Colors.light.primary} />
                </View>
            ) : error ? (
                <View style={globalStyles.center}>
                    <Text style={{ color: Colors.light.error }}>{error || 'Failed to load locations'}</Text>
                </View>
            ) : (
                <FlatList
                    data={filteredLocations}
                    keyExtractor={(item) => item.userId.toString()}
                    renderItem={renderLocationItem}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={
                        <View style={[globalStyles.center, { marginTop: 40 }]}>
                            <Text style={{ color: Colors.light.text.secondary }}>No locations found</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    header: {
        backgroundColor: Colors.light.primary,
        padding: 16,
        paddingBottom: 24,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    backBtn: {
        marginRight: 16,
        padding: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchBar: {
        flex: 1,
        height: '100%',
        color: Colors.light.text.primary,
        fontSize: 16,
    },
    listContainer: {
        padding: 16,
        paddingTop: 20,
    },
    locationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    locationImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#f5f5f5',
    },
    locationDetails: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    locationName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.light.text.primary,
        marginBottom: 4,
    },
    locationAddress: {
        fontSize: 14,
        color: Colors.light.text.secondary,
        marginBottom: 6,
        lineHeight: 20,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    locationContact: {
        fontSize: 13,
        color: Colors.light.text.secondary,
    },
});