import notifee, { AndroidImportance } from '@notifee/react-native';
export const onDisplayNotification = async (otp: string) => {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'doorbell',
    });
    await notifee.displayNotification({
        title: 'your otp ',
        body: otp,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            pressAction: {
                id: 'default',
            },
            sound: 'doorbell',
        },
        ios: {
            sound: 'default',
        },
    });
};
