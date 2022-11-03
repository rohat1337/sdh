import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, FlatList } from 'react-native'
import { getStatNames, arrayRemove, filteredPlayers } from '../data'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Filters(props) {

    function addable() {
        if ((selectedStat !== null) && 
        (Number.isInteger(parseInt(statMin))) &&
        (!filters.some((e => e.stat == selectedStat)))) {
            return true
        } else {
            return false
        }
    }

    function applicable() {
        if (filters.length > 0) {
            return true
        } else {
            return false
        }
    }

    const [stats, setStats] = useState([])
    const [selectedStat, setSelectedStat] = useState(null)
    const [statMin, setStatMin] = useState(null)
    const [filters, setFilters] = useState([])

    useEffect(() => {
        getStatNames().then((data) => {
            if (data[0] === 200) {
                data = data[1]
                setStats(data)
            }
        })
    }, [])

    console.log(filters)

    return (
        <View style={styles.container}>
            <View style={styles.top}>

                <View style={styles.topside}>

                    <FlatList
                    data={stats}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={styles.statbutton}
                            onPress={() => setSelectedStat(item)} >
                                <Text style={styles.text}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }} />

                </View>

                <View style={styles.topside}>

                    <View style={{ flex: 1, justifyContent: 'space-evenly' }}>
                        <Text style={[styles.text, {fontSize: windowHeight/50}]}>Nytt filter: {selectedStat}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
                            <TextInput
                            style={styles.input}
                            value={statMin}
                            placeholder='Minimum...'
                            onChangeText={setStatMin}
                            textAlign='center' />
                        </View>
                        <TouchableOpacity disabled={!addable()} 
                        style={[styles.statbutton, { width: windowWidth*0.1, backgroundColor: addable() ? '#0059a1' : '#001a30'}]} 
                        onPress={() => {
                            setFilters([...filters, {
                                'stat': selectedStat,
                                'value': statMin
                            }]);
                            setSelectedStat(null)}}>
                            <Text style={[styles.text, {fontSize: windowHeight/50}]}>Lägg till</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
            <View style={styles.bottom}>

                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={[styles.text, { fontSize: windowHeight/40}]}>Valda filter</Text>
                    <Text style={[styles.text, { fontSize: windowHeight/70}]}>(Klicka för att ta bort)</Text>
                </View>

                <View style={{ flex: 0.6 }}>

                    <FlatList
                    data={filters}
                    numColumns={4}
                    contentContainerStyle={{ flex: 1 }}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => setFilters(arrayRemove(filters, item))}>
                                <Text style={[styles.text, { marginHorizontal: windowWidth*0.03, marginVertical: windowWidth*0.02}]}>{item.stat} {'>'} {item.value}</Text>
                            </TouchableOpacity>
                        )
                    }} />

                </View>

                <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity disabled={!applicable()} 
                    style={[styles.statbutton, { width: windowWidth*0.15, backgroundColor: applicable() ? '#0059a1' : '#001a30'}]}
                    onPress={() => {
                        filteredPlayers(filters)
                    }}>
                        <Text style={[styles.text, {fontSize: windowHeight/40}]}>Tillämpa filter</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flexDirection: 'column'
    },
    top: {
        flex: 0.5,
        flexDirection: 'row'
    },
    bottom: {
        flex: 0.5,
    },
    topside: {
        flex: 0.5,
        flexDirection: 'column'
    },
    statbutton: {
        width: windowWidth*0.2,
        height: windowHeight*0.05,
        backgroundColor:'#001a30',
        marginVertical: windowHeight*0.01,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
        
    },
    text: {
        fontSize: windowHeight / 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: 'VitesseSans-Book'
    },
    input: {
        width: windowWidth*0.05,
        height: windowHeight*0.04,
        backgroundColor: '#bfc4c9',
        borderColor: 'white',
        borderWidth: 1,
        paddingLeft: 2
    }

})