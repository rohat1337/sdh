import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Background(props) {
    function renderBackgroundImage() {
      let theme = localStorage.getItem('theme');

      if (theme === 'odense') {
        let style = {
          width: '600px',
          height: '600px',
          position: 'absolute',
          left: windowWidth / 2 - 300,
          top: windowHeight*0.8 / 2 - 300,
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
          width: '400px',
          height: '630px',
          position: 'absolute',
          left: windowWidth / 2 - 400 / 2,
          top: windowHeight*0.8 / 2 - 630 / 2
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