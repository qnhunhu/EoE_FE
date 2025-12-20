import usePickupPoints from '@/hooks/usePickupPoints';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
        <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
            <Image source={require('../../assets/images/logoNormal.png')} style={styles.locationImage} />
            <View style={styles.locationDetails}>
                <Text style={styles.locationName}>{item.name}</Text>
                <Text style={styles.locationAddress}>{item.address}</Text>
                <Text style={styles.locationDistance}>Liên hệ: {item.phone}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for your location"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {loading ? (
                <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading...</Text>
            ) : error ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
            ) : (
                <FlatList
                    data={filteredLocations}
                    keyExtractor={(item) => item.userId.toString()}
                    renderItem={renderLocationItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    header: {
        backgroundColor: '#006D5B',
        padding: 16,
    },
    searchBar: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 40,
        color: '#333',
    },
    listContainer: {
        padding: 16,
    },
    locationItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    locationImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    locationDetails: {
        flex: 1,
        marginLeft: 12,
    },
    locationName: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    locationAddress: {
        fontSize: 14,
        color: '#666',
        marginVertical: 4,
    },
    locationDistance: {
        fontSize: 12,
        color: '#999',
    },
});