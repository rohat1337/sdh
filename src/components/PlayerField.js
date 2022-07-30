import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import { Hoverable } from 'react-native-web-hover'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function PlayerField (props) {
  const [one, set1] = useState(null)
  const [mb, setmb] = useState(false)
  const [lwb, setlwb] = useState(false)
  const [rwb, setrwb] = useState(false)
  const [six, set6] = useState(false)
  const [sevenRight, setSevenRight] = useState(false)
  const [sevenLeft, setSevenLeft] = useState(false)
  const [eight, set8] = useState(false)
  const [nine, set9] = useState(false)
  const [ten, set10] = useState(false)

  useEffect(() => {
    if (one) {
      props.func('gk')
      setmb(false)
      setlwb(false)
      setrwb(false)
      set6(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [one])

  useEffect(() => {
    if (mb) {
      props.func('cb, lcb, rcb')
      set1(false)
      setlwb(false)
      setrwb(false)
      set6(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [mb])

  useEffect(() => {
    if (lwb) {
      props.func('lb, lwb')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [lwb])

  useEffect(() => {
    if (rwb) {
      props.func('rb, rwb')
      set1(false)
      setmb(false)
      setlwb(false)
      set6(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [rwb])

  useEffect(() => {
    if (six) {
      props.func('dmf, rdmf, ldmf')
      set1(false)
      setmb(false)
      setrwb(false)
      setlwb(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [six])

  useEffect(() => {
    if (lwb) {
      props.func('lb, lwb')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setSevenLeft(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [lwb])

  useEffect(() => {
    if (sevenLeft) {
      props.func('lwf, lamf, lw')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setlwb(false)
      setSevenRight(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [sevenLeft])

  useEffect(() => {
    if (sevenRight) {
      props.func('rwf, ramf, rw')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setlwb(false)
      setSevenLeft(false)
      set8(false)
      set9(false)
      set10(false)
    }
  }, [sevenRight])

  useEffect(() => {
    if (eight) {
      props.func('lcmf, rcmf')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setlwb(false)
      setSevenLeft(false)
      setSevenRight(false)
      set9(false)
      set10(false)
    }
  }, [eight])

  useEffect(() => {
    if (nine) {
      props.func('cf')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setlwb(false)
      setSevenLeft(false)
      set8(false)
      setSevenRight(false)
      set10(false)
    }
  }, [nine])

  useEffect(() => {
    if (ten) {
      props.func('amf, lamf, ramf')
      set1(false)
      setmb(false)
      setrwb(false)
      set6(false)
      setlwb(false)
      setSevenLeft(false)
      set8(false)
      setSevenRight(false)
      set9(false)
    }
  }, [ten])

  useEffect(() => {
    if (!one && !mb && !rwb && !lwb && !six && !sevenLeft && !sevenRight && !eight && !nine && !ten) {
      props.clearField()
    }
  }, [one, mb, rwb, lwb, six, sevenLeft, sevenRight, eight, nine, ten])

  return (
    <View style={styles.root}>
      {/* Goalkeepers */}
      <Hoverable style={{ flex: 0.08, height: '40%', marginRight: '0.5%', marginTop: '15%' }}>
        {({ hovered }) => (
          <TouchableOpacity style={{ height: '100%' }} onPress={() => { set1(!one) }}>
            <View style={one ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
              <Text style={styles.numberStyle}>1</Text>
            </View>
          </TouchableOpacity>
        )}
      </Hoverable>

      <View style={styles.fieldRoot}>
        <View style={styles.left}>

          {/* Left backs */}
          <Hoverable style={{ flex: 0.5, margin: '0.5%', height: windowHeight / 11 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { setlwb(!lwb) }}>
                <View style={lwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>WB (v)</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* Left wingers */}
          <Hoverable style={{ flex: 0.5, margin: '0.5%', height: windowHeight / 11 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { setSevenLeft(!sevenLeft) }}>
                <View style={sevenLeft ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>7 (v)</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

        </View>

        <View style={styles.mid}>
          {/* Centre backs */}
          <Hoverable style={{ flex: 1 / 6, margin: '0.5%', height: windowHeight / 4.5 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { setmb(!mb) }}>
                <View style={mb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>MB</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* DM */}
          <Hoverable style={{ flex: 1 / 4, margin: '0.5%', height: windowHeight / 4.5 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { set6(!six) }}>
                <View style={six ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>6</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* CM */}
          <Hoverable style={{ flex: 1 / 4, margin: '0.5%', height: windowHeight / 4.5 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { set8(!eight) }}>
                <View style={eight ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>8</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* CAM */}
          <Hoverable style={{ flex: 1 / 6, margin: '0.5%', height: windowHeight / 4.5 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { set10(!ten) }}>
                <View style={ten ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>10</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* CF */}
          <Hoverable style={{ flex: 1 / 6, margin: '0.5%', height: windowHeight / 4.5 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { set9(!nine) }}>
                <View style={nine ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>9</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>
        </View>

        <View style={styles.right}>

          {/* Right backs */}
          <Hoverable style={{ flex: 0.5, margin: '0.5%', height: windowHeight / 11 }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { setrwb(!rwb) }}>
                <View style={rwb ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>WB (h)</Text>
                </View>
              </TouchableOpacity>
            )}
          </Hoverable>

          {/* Right wingers */}
          <Hoverable style={{ flex: 0.5, margin: '0.5%' }}>
            {({ hovered }) => (
              <TouchableOpacity style={{ height: '100%' }} onPress={() => { setSevenRight(!sevenRight) }}>
                <View style={sevenRight ? styles.pressed : hovered ? styles.hovered : styles.notHovered}>
                  <Text style={styles.numberStyle}>7 (h)</Text>
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
  fieldRoot: {
    flex: 1 - 0.08,
    flexDirection: 'column',
    marginTop: '15%'
  },
  root: {
    width: windowWidth / 2.5,
    height: windowHeight / 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9
  },
  left: {
    flex: 0.25,
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  mid: {
    flex: 0.5,
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  right: {
    flex: 0.25,
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  pressed: {
    borderWidth: 2,
    borderColor: 'black',
    height: '100%',
    backgroundColor: '#00bb53',
    alignItems: 'center',
    justifyContent: 'center'

  },

  hovered: {
    borderWidth: 2,
    borderColor: 'black',
    height: '100%',
    backgroundColor: '#00bb53',
    alignItems: 'center',
    justifyContent: 'center'
  },
  notHovered: {
    borderWidth: 1,
    borderColor: 'black',
    height: '100%',
    backgroundColor: '#006e31',
    alignItems: 'center',
    justifyContent: 'center'
  },

  numberStyle: {
    fontSize: 20,
    fontFamily: 'VitesseSans-Book',
    color: 'white'
  }
})

export default PlayerField
