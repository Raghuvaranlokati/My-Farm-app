import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
    { id: '1', name: 'Website 1', url: 'https://dharani.telangana.gov.in/agricultureHomepage?lang=te&csrf=' },
    // Add more website data as needed
];

const renderCard = (item, navigation) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WebView', { uri: item.url })}>
        <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
);

const SelectionScreenEn = ({ navigation }) => {
    const renderTwoColumns = ({ item }) => (
        <View style={styles.columnContainer}>
            {renderCard(item, navigation)}
        </View>
    );

    return (
        <ImageBackground source={{ uri: 'https://w0.peakpx.com/wallpaper/799/204/HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg' }} style={styles.backgroundImage}>
            <View style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderTwoColumns}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        },
    contentContainer: {
        paddingHorizontal:110,
    },
    columnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0', // Border color
       // width: CARD_WIDTH,
        padding: 15,
       // alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Add shadow
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333', // Text color
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
});

export default SelectionScreenEn;
