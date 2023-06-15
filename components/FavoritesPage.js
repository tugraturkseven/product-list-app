import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-paper-grid";
import { useIsFocused } from '@react-navigation/native';
const FavoritesPage = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favoriteProducts');
                if (storedFavorites) {
                    const favoriteIds = JSON.parse(storedFavorites);
                    // Fetch favorite items from API based on the favoriteIds
                    const favoriteItemsFromAPI = await fetchFavoriteItemsFromAPI(favoriteIds);
                    setFavoriteItems(favoriteItemsFromAPI);
                }
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [isFocused]);

    const fetchFavoriteItemsFromAPI = async (favoriteIds) => {
        try {
            const favoriteItems = [];
            for (const item of favoriteIds) {
                const id = item.id;
                const response = await axios.get(`https://northwind.vercel.app/api/products/${id}`);
                const product = response.data;
                favoriteItems.push(product);
            }
            return favoriteItems;
        } catch (error) {
            console.error('Error fetching favorite items:', error);
            return [];
        }
    };


    const handleRemoveFavorite = async (id) => {
        try {
            // Remove the item from AsyncStorage
            const storedFavorites = await AsyncStorage.getItem('favoriteProducts');
            if (storedFavorites) {
                const favoriteIds = JSON.parse(storedFavorites);
                const updatedFavorites = favoriteIds.filter(favoriteId => favoriteId.id !== id);
                await AsyncStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
            }

            // Remove the item from the favoriteItems state
            const updatedItems = favoriteItems.filter(item => item.id !== id);
            setFavoriteItems(updatedItems);
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <ScrollView>
            <Grid>
                {favoriteItems.map(item => (
                    <Row key={item.id}>
                        <Col>
                            <Card>
                                <Card.Title title={item.name} />
                                <Card.Content>
                                    <Text variant="bodyMedium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non est doloribus autem minus ducimus perferendis quaerat rem, obcaecati quis inventore sequi fuga, quos, excepturi iure itaque quibusdam. Voluptate, eius.</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon='heart-broken' onPress={() => handleRemoveFavorite(item.id)}>Unfavorite</Button>
                                </Card.Actions>
                            </Card>
                        </Col>
                    </Row>
                ))}

            </Grid>

        </ScrollView>
    );
};

export default FavoritesPage;
