import { ReactNotificationOptions, store } from 'react-notifications-component'

export default function useNotification() {

  return (notification: Partial<ReactNotificationOptions>) => {
    store.addNotification({
      message: ' ',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
      ...notification,
    })
  }
}
