import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../context/redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Llama al grupo de pestañas (tabs) */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}