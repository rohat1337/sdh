import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Background(props) {
    function renderBackgroundImage() {
      let theme = localStorage.getItem('theme');

      if (theme === 'odense') {
        let style = {
          width: windowHeight*0.7,
          height: windowHeight*0.7,
          position: 'absolute',
          left: windowWidth / 2 - (windowHeight*0.7 / 2),
          top: windowHeight*0.8 / 2 - (windowHeight*0.7 / 2),
        }

        console.log(props)
        
        if (props.weakerLogo === true) {
          return (<img src={require("../imgs/odense_50.png")} style={style}></img>)
        } else {
          return (<img src={require("../imgs/odense.png")} style={style}></img>)
        }
      }

      else {
        let style = {
          width: windowHeight*0.7*0.635, // 0.635 is the ratio of width to the height of the image
          height: windowHeight*0.7,
          position: 'absolute',
          left: windowWidth / 2 - (windowHeight*0.7*0.635/2),
          top: windowHeight*0.8 / 2 - (windowHeight*0.7/2)
        }

        if (props.weakerLogo === true === true) {
          return (<img src={require("../imgs/sirius_50.png")} style={style}></img>)
        } else {
          return (<img src={require("../imgs/sirius.png")} style={style}></img>)
        }
      }
  }

  return renderBackgroundImage();

}

export default Background;