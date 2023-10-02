import { View } from 'react-native';
import Progress from 'react-native-progress';

export const PasswordStrengthIndicator = ({ strength = 0 }) => {

  let color, progress;
  switch (strength) {
    case 0:
      color = '#ff0000';
      progress = 0.25;
      break;
    case 1:
      color = '#ff8000';
      progress = 0.5;
      break;
    case 2:
      color = '#ffff00';
      progress = 0.75;
      break;
    case 3:
      color = '#00ff00';
      progress = 1;
      break;
    case 4:
      color = '#0000ff';
      progress = 1;
      break;
    default:
      color = '#cccccc';
      progress = 0;
  }

  return (
    <View>
      <Progress.Bar
        color={color}
        progress={progress}
        width={200}
        height={20}
      />
    </View>
  );
}
