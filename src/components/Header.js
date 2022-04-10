import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

function Header(props) {
    //ChoosePlayer header
    if (props.stackIndex == 0) {
        return(
            <View style={props.header}>


               <View style={{ flex: 0.67, alignItems:"flex-end"}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
                </View>
            
               <View style={{flex: 0.33, flexDirection: "row", justifyContent: "flex-end"}}>

                   <TouchableOpacity style={{marginRight: "10%"}} onPress={() => props.nav.navigate('Dashboard', {header: props.header, nav: props.nav, players: props.players})}>
                        <Text style={{color: props.nextIsOK, fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>Dashboard</Text>
                   </TouchableOpacity>

                   <TouchableOpacity
                   onPress={() => props.nextIsOK == "white" ? props.nav.push("ChooseStats") : {}}>
                       <Text style={{ color: props.nextIsOK, fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                           Nästa -{">"}
                       </Text>
                   </TouchableOpacity>

               </View>
           </View>
       )
    //ChooseStats header
    } else if (props.stackIndex == 1) {
        return(
            <View style={props.header}>
                <View style={{flex: 0.1}}>  
                   <TouchableOpacity
                   onPress={() => props.nav.goBack()}>
                       <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                           {"<"}- Tillbaks
                       </Text>
                   </TouchableOpacity>
               </View>
               <View style={{ flex: 0.8}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
               </View>
               <View style={{ flex: 0.1}}>
                    <TouchableOpacity
                    onPress={() => props.nav.push("ChooseGraph")}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                            Nästa -{">"}
                        </Text>
                   </TouchableOpacity>

               </View>
               
           </View>
       )
    } else if (props.stackIndex == 2) {
        return(
            <View style={props.header}>
                <View style={{flex: 0.1}}>  
                   <TouchableOpacity
                   onPress={() => props.nav.goBack()}>
                       <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                           {"<"}- Tillbaks
                       </Text>
                   </TouchableOpacity>
               </View>
               <View style={{ flex: 0.8}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
               </View>
               <View style={{ flex: 0.1}}>
                    <TouchableOpacity
                    onPress={() => props.nav.goBack()}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                            Nästa -{">"}
                        </Text>
                   </TouchableOpacity>

               </View>
               
           </View>
       )
    } else if (props.stackIndex == 3) {
        return(
            <View style={props.header}>
                <View style={{flex: 0.1}}>  
                   <TouchableOpacity
                   onPress={() => props.nav.goBack()}>
                       <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                           {"<"}- Tillbaks
                       </Text>
                   </TouchableOpacity>
               </View>
               <View style={{ flex: 0.8}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
               </View>
               <View style={{ flex: 0.1}}>
                    <TouchableOpacity
                    onPress={() => props.nav.goBack()}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                            Nästa -{">"}
                        </Text>
                   </TouchableOpacity>

               </View>
               
           </View>
       )
    }
    
}

export default Header;