import { Text } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Tab = createBottomTabNavigator();

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const BottomBar = () => {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MusicRoute} />
            <Tab.Screen name="Settings" component={AlbumsRoute} />
        </Tab.Navigator>
    );
};

export default BottomBar