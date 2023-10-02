import React from 'react';
import { StyleSheet} from "react-native";
import { RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        
        backgroundColor: 'white'
    },
    cardsContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    heroContainer:{
        flexDirection: 'row',
    },
    titleContainer:{      
        alignItems: 'center'
    },

    title:{
        fontWeight: 'bold',
        fontSize: RFPercentage(3)
    },
    titleOrange:{
        fontWeight: 'bold',
        fontSize: RFPercentage(3),
        color: '#f79530'
    },
    subtitle:{
        fontSize:RFPercentage(1.8)
    },
    modulesContainer:{
        flexDirection: 'row',
        margin: 20,
        paddingHorizontal: 10,
    },
    modulesText:{
        fontSize:RFPercentage(2)
    },
    searchContainer:{
        flexDirection: 'row', 
        backgroundColor: 'white', 
        alignItems: 'center', 
        alignSelf: 'center',  
        width: '90%', 
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#F7F8FA',
    },
    image:{
        width:RFPercentage(10), 
        height:RFPercentage(10), 
        borderRadius: 100
    }
})