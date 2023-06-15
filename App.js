import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './components/BottomBar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductDetail from './components/ProductDetail';

const Stack = createNativeStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
      <BottomBar></BottomBar>
    </NavigationContainer>

  );
}