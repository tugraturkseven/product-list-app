import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Col, Row, Grid } from "react-native-paper-grid";

const ProductDetail = (props) => {
    const navigation = useNavigation();
    const [fetchDetail, setFetchDetail] = useState(null);

    const handleGoBack = () => {
        navigation.goBack();
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://northwind.vercel.app/api/products/${props.route.params.id}`);
                const product = response.data;
                setFetchDetail(product);
            } catch (error) {
                console.error('Error fetching product detail:', error);
            }
        };

        fetchData();
    }, []);

    if (!fetchDetail) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <Grid>
                <Row>
                    <Col>
                        <Card>
                            <Card.Title title={fetchDetail.name} subtitle={fetchDetail?.category?.name} />
                            <Card.Content>
                                <Text variant="titleLarge">ID: {fetchDetail?.id}</Text>
                                <Text variant="bodyMedium">Price: {fetchDetail?.unitPrice}</Text>
                                <Text variant="bodyMedium">Description: {fetchDetail?.category?.description}</Text>
                                <Text variant="bodyMedium">Units In Stock: {fetchDetail?.unitsInStock}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={handleGoBack}>Go Back</Button>
                            </Card.Actions>
                        </Card>
                    </Col>
                </Row>

            </Grid>
        </View>
    )
}

export default ProductDetail;
