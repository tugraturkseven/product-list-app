import { Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import { ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductList = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [fetchProducts, setFetchProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://northwind.vercel.app/api/products/');
                const products = await Promise.all(response.data.slice(0, 10).map(async (product) => {
                    const isFavorite = await getFavoriteStatus(product.id);
                    return {
                        id: product.id,
                        name: product.name,
                        isFavorite: isFavorite,
                    };
                }));
                setFetchProducts(products);
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        };
        fetchData();
    }, [isFocused]);

    const getFavoriteStatus = async (id) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteProducts');
            if (storedFavorites) {
                const favoriteProducts = JSON.parse(storedFavorites);
                const favoriteProduct = favoriteProducts.find(item => item.id === id);
                return !!favoriteProduct; // Return true if favoriteProduct exists, false otherwise
            }
            return false; // Return false if favoriteProducts is empty
        } catch (error) {
            console.error('Error updating favorite status:', error);
            return false; // Return false in case of an error
        }
    };

    const handleToggleFavorite = async (productId) => {
        setFetchProducts(prevProducts => {
            return prevProducts.map(product => {
                if (product.id === productId) {
                    const updatedProduct = { ...product, isFavorite: !product.isFavorite };
                    updateFavoriteStorage(updatedProduct);
                    return updatedProduct;
                }
                return product;
            });
        });
    };

    const updateFavoriteStorage = async (product) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favoriteProducts');
            if (storedFavorites) {
                const favoriteProducts = JSON.parse(storedFavorites);
                const existingIndex = favoriteProducts.findIndex(item => item.id === product.id);
                if (existingIndex > -1) {
                    favoriteProducts.splice(existingIndex, 1);
                } else {
                    favoriteProducts.push(product);
                }
                await AsyncStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
            } else {
                const favoriteProducts = [product];
                await AsyncStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
            }
        } catch (error) {
            console.error('Error updating favorite products:', error);
        }
    };

    const handleDelete = (productId) => {
        setFetchProducts(prevProducts => {
            return prevProducts.filter(product => product.id !== productId);
        });
    };

    return (
        <Grid>
            <ScrollView>
                {fetchProducts.map((product, index) => (
                    <Row key={index}>
                        <Col>
                            <Card>
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: product.id })}>
                                    <Card.Title title={product.name} />
                                    <Card.Content>
                                        <Text variant="bodyMedium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non est doloribus autem minus ducimus perferendis quaerat rem, obcaecati quis inventore sequi fuga, quos, excepturi iure itaque quibusdam. Voluptate, eius.</Text>
                                    </Card.Content>
                                </TouchableOpacity>
                                <Card.Actions>
                                    <Button
                                        icon={product.isFavorite ? 'heart-broken' : 'heart'}
                                        onPress={() => handleToggleFavorite(product.id)}
                                    >
                                        {product.isFavorite ? 'Unfavorite' : 'Favorite'}
                                    </Button>
                                    <Button icon='delete' onPress={() => handleDelete(product.id)}>
                                        Delete
                                    </Button>
                                </Card.Actions>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </ScrollView>
        </Grid>
    );
}

export default ProductList;
