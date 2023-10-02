import { Ionicons } from '@expo/vector-icons';
import { IconProps } from 'react-native-vector-icons/Icon';

export interface OverlayProps{
    option: string;
    icon?: IconName;
    action: () => void;
}

export type IconName = React.ComponentProps<typeof Ionicons>["name"];