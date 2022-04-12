import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Hoverable } from 'react-native-web-hover'

function Dashboard_PlayerField(props) {

	const [one, set1] = useState(null);
	const [mb, setmb] = useState(false);
	const [lwb, setlwb] = useState(false);
	const [rwb, setrwb] = useState(false);
	const [six, set6] = useState(false);
	const [seven_right, set7_right] = useState(false);
	const [seven_left, set7_left] = useState(false);
	const [eight, set8] = useState(false);
	const [nine, set9] = useState(false);
	const [ten, set10] = useState(false);

    useEffect(() => { one ? props.func("gk") : props.func("0gk") }, [one]); 
	useEffect(() => { mb ? props.func("cb, lcb, rcb") : props.func("0cb, lcb, rcb") }, [mb]);
	useEffect(() => { lwb ? props.func("lb, lwb") : props.func("0lb, lwb") }, [lwb]);
	useEffect(() => { rwb ? props.func("rb, rwb") : props.func("0rb, rwb") }, [rwb]);
	useEffect(() => { six ? props.func("dmf, ldmf, rdmf") : props.func("0dmf, ldmf, rdmf") }, [six]);
	useEffect(() => { seven_left ? props.func("lwf, lamf, lw") : props.func("0lwf, lamf, lw")}, [seven_left]);
	useEffect(() => { seven_right ? props.func("rwf, ramf, rw") : props.func("0rwf, ramf, rw")}, [seven_right]);
	useEffect(() => { eight ? props.func("lcmf, hcmf") : props.func("0lcmf, hcmf") }, [eight]);
	useEffect(() => { nine ? props.func("cf") : props.func("0cf")}, [nine]);
	useEffect(() => { ten ? props.func("amf") : props.func("0amf") }, [ten]);

    return (
        <View style={styles.root}>
            {/* Goalkeeper */}
            <Hoverable style={styles.goalkeeper_style}>
                {({hovered}) => (
                    <TouchableOpacity style={{height:"100%"}} onPress={() => {set1(!one)}}>
                        <View style={one ? styles.pressed : hovered ? styles.hovered : styles.notHovered}> 
                            <Text style={styles.numberStyle}>1</Text>
                        </View>
                    </TouchableOpacity>
                )}   
            </Hoverable>

            <View style={{flexDirection:"row", height:"80%"}}>
                {/* Right side */}
                <View style={{flex:0.2}}>

                    {/* Right wingback */}
                    <Hoverable style={styles.wings}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {setrwb(!rwb)}}>
                                <View style={rwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>WB (h)</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    {/* Right winger */}
                    <Hoverable style={styles.wings}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set7_right(!seven_right)}}>
                                <View style={seven_right ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>7 (h)</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>
                    
                
                </View>

                {/* Centre */}
                <View style={{flexDirection:"column", flex:0.6}}>
                    <Hoverable style={styles.center}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {setmb(!mb)}}>
                                <View style={mb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>MB</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    <Hoverable style={styles.center}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set6(!six)}}>
                                <View style={six ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>6</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    <Hoverable style={styles.center}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set8(!eight)}}>
                                <View style={eight ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>8</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    <Hoverable style={styles.center}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set10(!ten)}}>
                                <View style={ten ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>10</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    <Hoverable style={styles.center}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set9(!nine)}}>
                                <View style={nine ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>9</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>
                </View>

                {/* Left side */}
                <View style={{flex:0.2}}>

                    {/* Left wingback */}
                    <Hoverable style={styles.wings}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {setlwb(!lwb)}}>
                                <View style={lwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>WB (v)</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                    {/* Left winger */}
                    <Hoverable style={styles.wings}>
                        {({hovered}) => (
                            <TouchableOpacity style={{height:"100%"}} onPress={() => {set7_left(!seven_left)}}>
                                <View style={seven_left ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                                    <Text style={styles.numberStyle}>7 (v)</Text>
                                </View>
                            </TouchableOpacity>
                        )} 
                    </Hoverable>

                </View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    root: {
        flexDirection:"column",
        width: "100%",
        height:"100%"
    },

    numberStyle: {
		fontSize: 20,
		fontFamily: "VitesseSans-Book",
		color: "white"
	},

    pressed: {
		borderWidth: 2,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#00bb53",
		alignItems:"center",
		justifyContent:"center",

	},

	hovered: {
		borderWidth: 2,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#00bb53",
		alignItems:"center",
		justifyContent:"center"
	},
	notHovered: {
		borderWidth: 1,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#006e31",
		alignItems:"center", 
		justifyContent:"center",
	},

    goalkeeper_style: {
        marginHorizontal: "30%",
        textAlign: "center",
        alignContent:"center",
        backgroundColor: "green",
        height:"10%",
    },

    wings: {
        flex: 0.5,
        margin: "5%",
        textAlign:"center",
        alignContent:"center",
        backgroundColor:"green"
    },

    center: {
        flex: 0.2,
        margin:"1.5%",
        textAlign:"center",
        alignContent:"center",
        backgroundColor:"green"
    }
});
export default Dashboard_PlayerField;

