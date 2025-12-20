import { Platform } from 'react-native';
import StartScreen from './StartScreen';
import W_StartScreen from './W_StartScreen';


export default function IndexPage() {
    if (Platform.OS === 'web') {
      return <W_StartScreen />;
    }
  
    return (
       <StartScreen />
    );
  }