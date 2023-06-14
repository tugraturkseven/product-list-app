import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProductList from "./ProductList";

const Tab = createBottomTabNavigator();

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const BottomBar = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Product List" component={ProductList} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Settings" component={AlbumsRoute} options={{
                tabBarLabel: 'Add',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
                ),
            }} />
            <Tab.Screen name="Favorites" component={AlbumsRoute} options={{
                tabBarLabel: 'Favorites',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="heart" color={color} size={size} />
                ),
            }} />
        </Tab.Navigator>
    );
};

export default BottomBar