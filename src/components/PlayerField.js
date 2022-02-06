import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { Hoverable } from 'react-native-web-hover'

function PlayerField() {
	const [one, set1] = useState(false);
	const [two, set2] = useState(false);
	const [three, set3] = useState(false);
	const [four, set4] = useState(false);
	const [five, set5] = useState(false);
	const [six, set6] = useState(false);
	const [seven, set7] = useState(false);
	const [eight, set8] = useState(false);
	const [nine, set9] = useState(false);
	const [ten, set10] = useState(false);
	const [eleven, set11] = useState(false);

	const [selectedPositions, setSelectedPositions] = useState([])

	function arrayRemove(arr, value) {
		return arr.filter(function (ele) {
		  return ele != value;
		});
	}

	useEffect(() => {
		if (one) {
			setSelectedPositions([...selectedPositions, "GK"])
		} else {
			if (selectedPositions.includes("GK")) {
				setSelectedPositions(arrayRemove(selectedPositions, "GK"))
			}
		}
		}, [one]);

	useEffect(() => {	  }, [two]);
	useEffect(() => {	  }, [three]);
	useEffect(() => {	  }, [four]);
	useEffect(() => {	  }, [five]);
	useEffect(() => {	  }, [six]);
	useEffect(() => {	  }, [seven]);
	useEffect(() => {	  }, [eight]);
	useEffect(() => {	  }, [nine]);
	useEffect(() => {	  }, [ten]);
	useEffect(() => {	  }, [eleven]);

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
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set2(!two)}}>
						<View style={two ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>2</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>
			

			{/* Centre backs */}
			<Hoverable style={{flex: 0.50, height: "100%", width: "100%", marginTop: 2.5, marginBottom: 2.5}}>
				{({ hovered }) => (
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set3(!three)}}>
						<View style={three ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>3</Text>
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
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set11(!eleven)}}>
						<View style={eleven ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>11</Text>
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
					<TouchableOpacity style={{height:"100%"}} onPress={() => {set7(!seven)}}>
						<View style={seven ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
							<Text style={styles.numberStyle}>7</Text>
						</View >
					</TouchableOpacity>
				)}
			</Hoverable>

		</View>
    </View>
  );
}

const styles = StyleSheet.create({
	root: {
		width: 600, 
		height: 400, 
		flexDirection: "row", 
		alignItems: "center"
	},

	bigSection: {
		flex: 0.40, 
		width: "100%", 
		height: "100%", 
		flexDirection: "column"
	},

	smallSection: {
		flex: 0.25, 
		width:"100%", 
		height:"100%", 
		flexDirection: "column"
	},

	pressed: {
		borderWidth: 2,
		borderColor: "black",
		height:"100%",
		backgroundColor: "#0059a1",
		alignItems:"center",
		justifyContent:"center"

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
		fontSize: 20
	}
})

export default PlayerField;