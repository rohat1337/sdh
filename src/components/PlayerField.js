import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Hoverable } from 'react-native-web-hover'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function PlayerField(props) {
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

	useEffect(() => { one ? props.func("GK") : props.func("0GK") }, [one]); 
	useEffect(() => { mb ? props.func("CB, LCB, RCB") : props.func("0CB, LCB, RCB") }, [mb]);
	useEffect(() => { lwb ? props.func("LB, LWB") : props.func("0LB, LWB") }, [lwb]);
	useEffect(() => { rwb ? props.func("RB, RWB") : props.func("0RB, RWB") }, [rwb]);
	useEffect(() => { six ? props.func("DMF, LDMF, RDMF") : props.func("0DMF, LDMF, RDMF") }, [six]);
	useEffect(() => { seven_left ? props.func("LWF, LAMF, LW") : props.func("0LWF, LAMF, LW")}, [seven_left]);
	useEffect(() => { seven_right ? props.func("RWF, RAMF, RW") : props.func("0RWF, RAMF, RW")}, [seven_right]);
	useEffect(() => { eight ? props.func("LCMF, RCMF") : props.func("0LCMF, RCMF") }, [eight]);
	useEffect(() => { nine ? props.func("CF") : props.func("0CF")}, [nine]);
	useEffect(() => { ten ? props.func("AMF, RAMF, LAMF") : props.func("0AMF, RAMF, LAMF") }, [ten]);
	
	return (
		<View style={styles.root}>
			{/* Goalkeepers */}
			<Hoverable style={{flex: .08, height: "40%", marginRight: "0.5%", marginTop:"15%"}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set1(!one)}}>
						<View style={one ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>1</Text>
						</View>
					</TouchableOpacity>
				)}
			</Hoverable>

			<View style={styles.fieldRoot}>
					<View style={styles.left}>

						{/* Left backs */}
						<Hoverable style={{flex: 0.5, margin: "0.5%", height: windowHeight/11}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {setlwb(!lwb)}}>
									<View style={lwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>WB (v)</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* Left wingers */}
						<Hoverable style={{flex: 0.5, margin: "0.5%", height: windowHeight/11}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_left(!seven_left)}}>
									<View style={seven_left ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>7 (v)</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

					</View>

					<View style={styles.mid}>
						{/* Centre backs */}
						<Hoverable style={{flex: 1/6, margin: "0.5%", height: windowHeight/4.5}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {setmb(!mb)}}>
									<View style={mb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>MB</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* DM */}
						<Hoverable style={{flex: 1/4, margin: "0.5%", height: windowHeight/4.5}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set6(!six)}}>
									<View style={six ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>6</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* CM */}
						<Hoverable style={{flex: 1/4, margin: "0.5%", height:windowHeight/4.5}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set8(!eight)}}>
									<View style={eight ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>8</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* CAM */}
						<Hoverable style={{flex: 1/6, margin: "0.5%", height: windowHeight/4.5}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set10(!ten)}}>
									<View style={ten ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>10</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* CF */}
						<Hoverable style={{flex: 1/6, margin: "0.5%", height: windowHeight/4.5}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set9(!nine)}}>
									<View style={nine ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>9</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>		
					</View>

					<View style={styles.right}>
						
						{/* Right backs */}
						<Hoverable style={{flex: 0.5, margin: "0.5%", height: windowHeight/11}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {setrwb(!rwb)}}>
									<View style={rwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>WB (h)</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* Right wingers */}
						<Hoverable style={{flex: 0.5, margin: "0.5%"}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_right(!seven_right)}}>
									<View style={seven_right ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>7 (h)</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>
					</View>
			</View>
		</View>
	)}

const styles = StyleSheet.create({
	fieldRoot: {
		flex: 1-0.08,
		flexDirection: "column",
		marginTop: "15%"
	},
	root: {
		width: windowWidth/2.5, 
		height: windowHeight/2.5, 
		flexDirection: "row", 
		alignItems: "center",
		opacity: .9,
	},
	left: {
		flex: 0.25, 
		flexDirection: "row",
		width: "100%", 
		height: "100%",
	},
	mid: {
		flex: 0.5,
		flexDirection: "row",
		width: "100%", 
		height: "100%",
	},
	right: {
		flex: 0.25, 
		flexDirection: "row",
		width: "100%", 
		height: "100%",
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

	numberStyle: {
		fontSize: 20,
		fontFamily: "VitesseSans-Book",
		color: "white"
	}
})

export default PlayerField;