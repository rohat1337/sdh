import React, { useEffect } from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native"
import { fakeData } from "../tempfakedata.js" // Temporärt, testar
import { getSpecificStats } from "../data"

function ChoosePlayer() {
    return (
        <View>
            <TouchableOpacity
            onPress={() => {
                getSpecificStats(0, ["Player", "Team", "Position", "Age"])
                .then((response) => {
                    const statusCode = response.status;
                    const data = response.json();
                    return Promise.all([statusCode, data]);
                })
                .then((data) => {
                    console.log(data[1])
                })
            }}>
                <Text>fekfoe</Text>
            </TouchableOpacity>
            <FlatList 
                data={fakeData}
                renderItem={({ item }) => {
                    return (
                        <>
                        <Text>{item.name}</Text>
                        <Text>{item.age}</Text>
                        <Text>{item.team}</Text>
                        <Text>{item.minutesPlayed}</Text>
                        <Text>{item.positions}</Text>
                        </>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default ChoosePlayer;
