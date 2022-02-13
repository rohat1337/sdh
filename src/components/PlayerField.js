import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Hoverable } from 'react-native-web-hover'

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function PlayerField(props) {
	const [one, set1] = useState(null);
	const [two, set2] = useState(false);
	const [three, set3] = useState(false);
	const [four, set4] = useState(false);
	const [five, set5] = useState(false);
	const [six, set6] = useState(false);
	const [seven_right, set7_right] = useState(false);
	const [seven_left, set7_left] = useState(false);
	const [eight, set8] = useState(false);
	const [nine, set9] = useState(false);
	const [ten, set10] = useState(false);
	const [eleven, set11] = useState(false);

	useEffect(() => { one ? props.func("gk") : props.func("0gk") }, [one]); 
	useEffect(() => { two ? props.func("cb, lcb, rcb") : props.func("0cb, lcb, rcb") }, [two]);
	useEffect(() => { three ? props.func("lb, lwb") : props.func("0lb, lwb") }, [three]);
	useEffect(() => { four ? props.func("rb, rwb") : props.func("0rb, rwb") }, [four]);
	useEffect(() => { six ? props.func("dmf, ldmf, rdmf") : props.func("0dmf, ldmf, rdmf") }, [six]);
	useEffect(() => { seven_left ? props.func("lwf, lamf, lw") : props.func("0lwf, lamf, lw")}, [seven_left]);
	useEffect(() => { seven_right ? props.func("rwf, ramf, rw") : props.func("0rwf, ramf, rw")}, [seven_right]);
	useEffect(() => { eight ? props.func("lcmf, hcmf") : props.func("0lcmf, hcmf") }, [eight]);
	useEffect(() => { nine ? props.func("cf") : props.func("0cf")}, [nine]);
	useEffect(() => { ten ? props.func("amf") : props.func("0amf") }, [ten]);
	
	return (
    <View style={styles.root}>
		{/* Goalkeepers */}
		<Hoverable style={{flex: 0.10, height: "40%", marginRight: 2.5}}>
			{({ hovered }) => (
				<TouchableOpacity style={{height:"100%"}} onPress={() => {set1(!one)}}>
					<View style={one ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
						<Text style={styles.numberStyle}>1</Text>
					</View>
				</TouchableOpacity>
			)}
		</Hoverable>

		{/* Defenders section */}
		<View style={[styles.smallSection, {marginLeft: 2.5, marginRight: 2.5}]}>

			{/* Left backs */}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%", marginBottom: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set3(!three)}}>
						<View style={three ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>3</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>
			

			{/* Centre backs */}
			<Hoverable style={{flex: 0.50, height: "100%", width: "100%", marginTop: 2.5, marginBottom: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set2(!two)}}>
						<View style={two ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>2</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

			{/* Right backs */}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%", marginTop: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set4(!four)}}>
						<View style={four ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>4</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

		</View>

		{/* Midfielders section*/}
		<View style={[styles.bigSection, {marginLeft:2.5, marginRight: 2.5}]}>

			{/* Left midfielders*/}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%", marginBottom:2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set6(!six)}}>
						<View style={six ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>6</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

			{/* Centre midfielder section */}
			<View style={{flex: 0.50, flexDirection: "row", marginTop: 2.5, marginBottom: 2.5}}>

				{/* Sitting midfielder */}
				<Hoverable style={{flex: 0.65, height: "100%", width: "100%", marginBottom: 2.5, marginRight: 2.5}}>
					{({ hovered }) => (
						<TouchableOpacity style={{height:"100%"}} onPress={() => {set8(!eight)}}>
							<View style={eight ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
								<Text style={styles.numberStyle}>8</Text>
							</View >
						</TouchableOpacity>
					)}
				</Hoverable>

				{/* Attacking centre midfielder */}
				<Hoverable style={{flex: 0.35, height: "100%", width: "100%", marginLeft: 2.5, marginBottom: 2.5}}>
					{({ hovered }) => (
						<TouchableOpacity style={{height:"100%"}} onPress={() => {set10(!ten)}}>
						<View style={ten ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
								<Text style={styles.numberStyle}>10</Text>
							</View >
						</TouchableOpacity>
					)}
				</Hoverable>				

			</View>

			{/* Right midfiedler*/}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%", marginTop: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set5(!five)}}>
						<View style={five ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>5</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

		</View>

		{/* Attackers */}
		<View style={[styles.smallSection, {marginLeft: 2.5}]}>

			{/* Left winger */}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%"}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_left(!seven_left)}}>
						<View style={seven_left ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>7</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>
		

			{/* Striker */}
			<Hoverable style={{flex: 0.50, height: "100%", width: "100%", marginTop: 5, marginBottom: 5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set9(!nine)}}>
						<View style={nine ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>9</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

			{/* Right Winger */}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%"}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_right(!seven_right)}}>
						<View style={seven_right ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>7</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

		</View>
    </View>
  )}

const styles = StyleSheet.create({
	fieldRoot: {
		flex: 1,
		flexDirection: "column"
	},
	root: {
		width: windowWidth/2.5, 
		height: windowHeight/2.5, 
		flexDirection: "row", 
		alignItems: "center",
		opacity: .7,
	},

	bigSection: {
		flex: 0.40, 
		width: "100%", 
		height: "100%", 
		flexDirection: "column",
	},

	smallSection: {
		flex: 0.25, 
		width:"100%", 
		height:"100%", 
		flexDirection: "column",
	},

	pressed: {
		borderWidth: 2,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#0059a1",
		alignItems:"center",
		justifyContent:"center",

	},

	hovered: {
		borderWidth: 2,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#DEF2FF",
		alignItems:"center",
		justifyContent:"center"
	},
	notHovered: {
		borderWidth: 1,
		borderColor: "black",
		height:"100%",
		backgroundColor: "white",
		alignItems:"center", 
		justifyContent:"center",
	},

	numberStyle: {
		fontSize: 20,
		fontFamily: "VitesseSans-Book"
	}
})

export default PlayerField;