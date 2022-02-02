import React, { useEffect } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"
import { fakeData } from "../tempfakedata.js" // Temporärt, testar

function ChoosePlayer() {
    return (
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
    )
}

const styles = StyleSheet.create({
    
})

export default ChoosePlayer;
