import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import FavoritesPage from "./FavoritesPage";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AlbumsRoute = () => <Text>Albums</Text>;

const BottomBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Product List"
                component={ProductListStack}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Settings"
                component={AlbumsRoute}
                options={{
                    tabBarLabel: "Add",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name="plus-circle"
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesPage}
                options={{
                    tabBarLabel: "Favorites",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="heart" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const ProductListStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProductList"
                component={ProductList}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetail}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default BottomBar;
