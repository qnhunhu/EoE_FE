// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// import { BlurView } from 'expo-blur';
// import { StyleSheet } from 'react-native';

// export default function BlurTabBarBackground() {
//   return (
//     <BlurView
//       // System chrome material automatically adapts to the system's theme
//       // and matches the native tab bar appearance on iOS.
//       tint="systemChromeMaterial"
//       intensity={100}
//       style={StyleSheet.absoluteFill}
//     />
//   );
// }

// export function useBottomTabOverflow() {
//   return useBottomTabBarHeight();
// }
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Platform, StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  if (Platform.OS === 'android') {
    // Trả về View trong suốt trên Android để tránh crash
    return <View style={[StyleSheet.absoluteFill, { backgroundColor: 'transparent' }]} />;
  }

  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
