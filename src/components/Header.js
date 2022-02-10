import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'

function Header(props) {
    if (props.stackIndex == 0) {
        return(
            <View style={props.header}>
               <View style={{ flex: 0.9, paddingLeft:"10%"}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
               </View>
               <View style={{flex: 0.1}}>  
                   <TouchableOpacity
                   onPress={() => props.nextIsOK == "white" ? props.nav.push("ChooseStats") : {}}>
                       <Text style={{ color: props.nextIsOK, fontWeight: "bold", fontSize: 18, fontFamily: "VitesseSans-Book"}}>
                           Gå vidare -{">"}
                       </Text>
                   </TouchableOpacity>
               </View>
           </View>
       )
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
               <View style={{ flex: 0.9, paddingRight:"10%"}}>
                   <Text style={{fontSize: 50, fontWeight:"bold", color: "white", fontFamily: "VitesseSans-Black"}}>IK Sirius Datahub</Text>
               </View>
               
           </View>
       )
    }
    
}

export default Header;