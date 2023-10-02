import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';

type Props = {
    visible: boolean;
    label?: string;
}
export const OverlaidLoadingScreen = ( { visible, label } : Props ) => {

    return(
        <>
            {
                visible 
                    ?   <View 
                            style={{
                                position: 'absolute',
                                zIndex: 1000,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor:'rgba(255, 255, 255, 0.6)'
                            }}
                        >
                            <View 
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    padding: 10, 
                                    paddingVertical: 35, 
                                    borderRadius: RFPercentage(100)
                                }}
                            >
                                <ActivityIndicator  size={50} color='black'  />
                                <Text> { label } </Text>
                            </View>
                                
                        </View>
                    : null
            }
        </>
    )
}
