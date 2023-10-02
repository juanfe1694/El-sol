import React from 'react';
import { StyleSheet } from "react-native";
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 2,
        backgroundColor: 'white'
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: 'white'
    },
    heroContainer: {
        flexDirection: 'row',
        margin: 5
    },
    titleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
    },
    titleOrange: {
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
        color: '#f79530',
    },
    subtitle: {
        fontSize: RFPercentage(1.8),
        marginLeft: 6,
    },
    modulesContainer: {
        flexDirection: 'row',
        margin: 20,
        paddingHorizontal: 10,
        alignItems: 'flex-start', // Cambio para alinear en la parte superior izquierda
    },
    modulesText: {
        fontSize: RFPercentage(2),
        textAlign: 'left', // Alineación del texto a la izquierda
    },
    searchContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#F7F8FA',
    },
    image: {
        width: RFPercentage(5), // Cambio para reducir el tamaño de la imagen
        height: RFPercentage(5), // Cambio para reducir el tamaño de la imagen
        borderRadius: 100,
    },
});
