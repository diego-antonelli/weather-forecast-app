import {Notifier} from 'react-native-notifier';
import {colors, fonts} from '../ui-components/theme.ts';

export function showMessage(message: string, image?: string) {
  Notifier.showNotification({
    description: message,
    duration: 4000,
    showAnimationDuration: 800,
    hideOnPress: false,
    componentProps: {
      ...(image ? {imageSource: {uri: image}} : {}),
      descriptionStyle: {
        ...fonts.regularBodySmall,
        color: colors.black,
        textAlign: image ? 'auto' : 'center',
      },
      containerStyle: {borderRadius: 10, paddingVertical: image ? 8 : 16},
    },
  });
}
