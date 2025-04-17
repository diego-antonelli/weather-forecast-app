import {Notifier} from 'react-native-notifier';
import {fonts} from '../ui-components/theme.ts';

export function showMessage(message: string) {
  Notifier.showNotification({
    description: message,
    duration: 4000,
    showAnimationDuration: 800,
    hideOnPress: false,
    componentProps: {
      descriptionStyle: {
        ...fonts.regularBodySmall,
        color: '#000',
        textAlign: 'auto',
      },
      containerStyle: {
        borderRadius: 10,
        paddingVertical: 16,
      },
    },
  });
}
