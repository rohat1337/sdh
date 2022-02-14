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
	const [five, set5] = useState(false);
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
	
	if (true) { return (
		<View style={styles.root}>
			{/* Goalkeepers */}
			<Hoverable style={{flex: .08, height: "40%", marginRight: 2.5}}>
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
										<Text style={styles.numberStyle}>WB / V</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* Left wingers */}
						<Hoverable style={{flex: 0.5, margin: "0.5%", height: windowHeight/11}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_left(!seven_left)}}>
									<View style={seven_left ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>7 / V</Text>
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
										<Text style={styles.numberStyle}>WB / H</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>

						{/* Right wingers */}
						<Hoverable style={{flex: 0.5, margin: "0.5%"}}>
							{({ hovered }) => (
								<TouchableOpacity style={{height:"100%"}} onPress={() => {set7_right(!seven_right)}}>
									<View style={seven_right ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
										<Text style={styles.numberStyle}>7 / H</Text>
									</View >
								</TouchableOpacity>
							)}
						</Hoverable>
					</View>
			</View>
		</View>
	)} else {
	
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
					<TouchableOpacity style={{height:"100%"}} onPress={() => {setlwb(!lwb)}}>
						<View style={lwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>WB / V</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>
			

			{/* Centre backs */}
			<Hoverable style={{flex: 0.50, height: "100%", width: "100%", marginTop: 2.5, marginBottom: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {setmb(!mb)}}>
						<View style={mb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>MB</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

			{/* Right backs */}
			<Hoverable style={{flex: 0.25, height: "100%", width: "100%", marginTop: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {setrwb(!rwb)}}>
						<View style={rwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>WB / H</Text>
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
  )}}

const styles = StyleSheet.create({
	fieldRoot: {
		flex: 1-0.08,
		flexDirection: "column",
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
		fontFamily: "VitesseSans-Book"
	}
})

export default PlayerField;