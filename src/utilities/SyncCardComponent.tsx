import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { SyncIcon } from './SyncIcon';
import { SyncStates } from '../interfaces/functionalInterfaces';

type Props = {
    title: string, 
    date: string, 
    state: SyncStates, 
    showMenu: boolean
}
export const SyncCardComponent = (
        {
            title,
            date,
            state,
            showMenu
        } : Props
    ) => {
  return (
        <View key={title} style={styles.card}>
            <View style={styles.cardContainer}>
                <View
                    style={{
                        width: "100%",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.cardTitle}>
                            { title }
                        </Text>
                        { showMenu &&
                            <IconButton
                                icon="dots-horizontal"
                                size={RFPercentage(3)}
                                //onPress={() => displayOverlay(form)}
                                style={{
                                    borderRadius: RFPercentage(1),
                                }}
                            />
                        }
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={styles.creationDate}>
                            <Ionicons
                                name="calendar-outline"
                                size={RFPercentage(2.5)}
                            />{" "}
                            { date }
                        </Text>
                        <View style={{marginRight: RFPercentage(1.5),}}>
                            <SyncIcon
                                state={state}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: RFPercentage(2),
      marginTop: RFPercentage(22),
    },
    title: {
      fontSize: RFPercentage(2.3),
    },
    card: {
      marginVertical: RFPercentage(1),
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#F0F0F0",
      borderRadius: 8,
      height: "auto",
    },
    cardContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: "auto",
    },
    cardText: {
      fontSize: RFPercentage(2.2),
      marginLeft: RFPercentage(2.5),
      marginTop: RFPercentage(1),
      flexWrap: "wrap",
      width: "80%",
      height: "auto"
    },
    cardTitle:{
    fontSize: RFPercentage(2.5),
      marginLeft: RFPercentage(2.5),
      marginTop: RFPercentage(1),
      flexWrap: "wrap",
      width: "80%",
      height: "auto",
      fontWeight: '500'
    },
    creationDate: {
      fontSize: RFPercentage(2),
      marginLeft: RFPercentage(2),
      marginTop: RFPercentage(2),
      width: "60%",
    },
  });
  