import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { MilestonesList } from '../../../components/planner/milestoneSection/MilestonesList'
import { OverlayScreen } from '../../overlay/OverlayScreen';
import { OverlayProps } from '../../../interfaces/overlay/overlayInterfaces';
import { NavigationProps } from '../../../interfaces/functionalInterfaces';
import { useIsFocused } from '@react-navigation/native';

export const MilestonesListScreen = ({ route, navigation }: NavigationProps) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayOptions, setOverlayOptions] = useState<OverlayProps[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    setOverlayVisible(false);
  }, [isFocused])
 
  
  return (
    <View style={{ flex: 1 }}>
        <MilestonesList
          workflowId={ route?.params?.workflowId }
          setOverlayOptions={setOverlayOptions}
          setOverlayVisible={setOverlayVisible} />
        
        {overlayVisible && (
        <OverlayScreen
          overlayProps={overlayOptions as OverlayProps[]}
          overlayVisible={overlayVisible}
          setoverlayVisible={setOverlayVisible}
        />
      )}
    </View>
  )
}
