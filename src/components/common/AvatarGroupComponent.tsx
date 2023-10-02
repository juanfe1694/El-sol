import React from 'react'
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Avatar } from 'react-native-paper';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { backgroundColorMap } from '../../helpers/backgroundColorMap';

interface AvatarProps{
    imageProfilePath?: string;
    label: string;
}
interface AvatarGrouprops{
    avatars: AvatarProps[];
}
const windowWidth = Dimensions.get('window').width

export const AvatarGroupComponent = ( { avatars } : AvatarGrouprops ) => {
    

  return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                //paddingHorizontal: '10%',
                width: avatars?.length * RFPercentage(6)
            }}
        >
        <View style={avatarGroupStyles.mainContainer}>
        {
            avatars?.map((avatar, index) => 
                avatar.imageProfilePath 
                    ? (<Avatar.Image
                            style={avatarGroupStyles.avatar}
                            size={RFPercentage(6)} 
                            key={index} 
                            source={{uri: avatar.imageProfilePath}}
                        />)
                    : (<Avatar.Text 
                            style={[avatarGroupStyles.avatar, {backgroundColor: backgroundColorMap[index]}]}
                            labelStyle={avatarGroupStyles.avatarText}
                            size={RFPercentage(6)} 
                            key={index}  
                            label={avatar.label} 
                        />)  
            )
        }
        </View>
        </ScrollView>
  )
}


const avatarGroupStyles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        flexDirection: 'row',
        padding: '3%'
    },
    avatar:{
        marginLeft: '-2%',
        borderColor: 'white',
        borderWidth: 2,
    },
    avatarText:{
        color: 'white', 
        fontWeight: 'bold', 
    },
    scrollViewContent: {
      paddingHorizontal: '5%',
      width: windowWidth 
    },
})
