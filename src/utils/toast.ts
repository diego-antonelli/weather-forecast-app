import {Notifier} from 'react-native-notifier';

export function showMessage(message: string) {
  Notifier.showNotification({
    description: message,
    duration: 4000,
    showAnimationDuration: 800,
    hideOnPress: false,
    componentProps: {
      descriptionStyle: {
        fontSize: 13.5,
        fontWeight: '400',
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
