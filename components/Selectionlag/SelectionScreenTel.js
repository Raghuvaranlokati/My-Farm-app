import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');

const DATA = [
    { id: '1', name: 'open', url: 'https://dharani.telangana.gov.in/agricultureHomepage?lang=te&csrf=' },
    // Add more website data as needed
];

const renderCard = (item, navigation) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('WebView', { uri: item.url })}>
        <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
);

const SelectionScreenEn = ({ navigation }) => {
    const renderCardList = ({ item }) => renderCard(item, navigation);

    return (
<ImageBackground source={{ uri: 'https://w0.peakpx.com/wallpaper/799/204/HD-wallpaper-farmers-agriculture-field-harvesting-farm-farmer-hard-working-workers-cultivation.jpg' }} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>భూమి రికార్డులు</Text>
                <View style={styles.cardContainer}>
                    <FlatList
                        data={DATA}
                        renderItem={renderCardList}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: height * 0.8, // Adjust based on your design
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'white',
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8, // Adjust based on your design
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default SelectionScreenEn;
