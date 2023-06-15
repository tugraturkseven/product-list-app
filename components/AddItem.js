import { View } from 'react-native'
import React, { useState } from 'react'
import { Col, Row, Grid } from "react-native-paper-grid";
import { TextInput, Button } from 'react-native-paper';

const AddItem = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    return (
        <View>
            <Grid>
                <Row>
                    <Col>
                        <TextInput label='Category' value={category} onChange={value => setCategory(value)} mode='outlined'></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextInput label='Name' value={name} onChange={value => setName(value)} mode='outlined'></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextInput label='Description' value={description} onChange={value => setDescription(value)} mode='outlined'></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextInput label='Price' value={price} onChange={value => setPrice(value)} mode='outlined'></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextInput label='Stock' value={stock} onChange={value => setStock(value)} mode='outlined'></TextInput>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button icon="plus-circle" mode="contained" onPress={() => console.log('Pressed')}>Add</Button>
                    </Col>
                </Row>
            </Grid>
        </View>
    )
}

export default AddItem