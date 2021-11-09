import React from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements'

export default function Info () {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Info!</Text>
            <Card>
                <Card.Title>Title</Card.Title>
                <Card.Divider/>
                <Text style={{ marginBottom: 10}}>
                    Reiciendis rem sequi occaecati. Nesciunt dolores hic saepe neque nisi.
                    Rerum voluptatem autem et. lias voluptatem fugit sunt id repellat.
                    At pariatur quisquam assumenda possimus aut. Sunt delectus officiis voluptate rerum.
                    Eum fugiat accusamus ut. Error nostrum maxime omnis et quos occaecati consequuntur.
                    Repellat omnis autem labore sit ex sequi quia consequatur.
                </Text>
            <Button
                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Learn more' />
            </Card>            
        </View>
    )
}