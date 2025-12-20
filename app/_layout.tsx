import { AuthProvider } from '@/contexts/AuthContent';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import M_StartScreen from './StartScreen'; // Your mobile start/splash screen
import W_StartScreen from './W_StartScreen';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(Platform.OS !== 'web');

  // useEffect(() => {
    
  // }, []);

  useEffect(() => {
    if (Platform.OS !== 'web') {
      const timer = setTimeout(() => setShowSplash(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <AuthProvider>
        {showSplash ? <M_StartScreen /> : <Slot />}
      </AuthProvider>
    );
  } else {
    if (showSplash) {
      return <W_StartScreen />;
    }
    return (
      <AuthProvider>
        <Slot />
      </AuthProvider>
    );
  }
}