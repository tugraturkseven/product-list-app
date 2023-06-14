import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Card, Divider } from 'react-native-paper';
import { Col, Row, Grid } from "react-native-paper-grid";
import { ScrollView } from 'react-native';
const ProductList = () => {
    const [fetchProducts, setFetchProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://northwind.vercel.app/api/products/');
                const products = response.data.slice(0, 10).map(product => product.name);
                setFetchProducts(products);
            } catch (error) {
                console.error('Error fetching list:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <Grid>
            <ScrollView>
                {fetchProducts.map((product, index) => (
                    <Row key={index}>
                        <Col>
                            <Card >
                                <Card.Title title={product} />
                                <Card.Content>
                                    <Text variant="bodyMedium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia non est doloribus autem minus ducimus perferendis quaerat rem, obcaecati quis inventore sequi fuga, quos, excepturi iure itaque quibusdam. Voluptate, eius.</Text>
                                </Card.Content>
                                <Card.Actions>
                                    <Button icon='delete'>Delete</Button>
                                    <Button icon='heart'>Favorite</Button>
                                </Card.Actions>

                            </Card>
                        </Col>
                    </Row>
                ))}
            </ScrollView>
        </Grid>
    )
}

export default ProductList