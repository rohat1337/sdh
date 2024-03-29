import React, { useRef, useEffect } from 'react'
import styled from 'styled-components/native'
import { Animated, Text } from 'react-native'

const EMPTY_COLOR = '#a0a0a1'
const PROGRESS_COLOR = '#0085FF'
const SIZE = 150

const CircleBase = styled(Animated.View)`
    width: ${SIZE}px;
    height: ${SIZE}px;
    border-radius: ${SIZE / 2}px;
    border-width: 15px;
`

const EmptyCircle = styled(CircleBase)`
    border-color: ${EMPTY_COLOR};
    justify-content: center
    align-items: center;
    transform: rotate(-45deg);
`

const Indicator = styled(CircleBase)`
    position: absolute;
    border-left-color: ${PROGRESS_COLOR};
    border-top-color: ${PROGRESS_COLOR};
    border-right-color: transparent;
    border-bottom-color: transparent;
`

const CoverIndicator = styled(CircleBase)`
    position: absolute;
    border-left-color: ${EMPTY_COLOR};
    border-top-color: ${EMPTY_COLOR};
    border-right-color: transparent;
    border-bottom-color: transparent;
`

export default function CircularProgress ({ progress = 100 }) {
  const animatedProgress = useRef(new Animated.Value(0)).current

  let backgroundColor = ''

  if (progress < 30) {
    backgroundColor = 'red'
  } else if (progress < 70) {
    backgroundColor = 'orange'
  } else {
    backgroundColor = 'green'
  }

  const animateProgress = useRef(toValue => {
    Animated.spring(animatedProgress, {
      toValue,
      useNativeDriver: true
    }).start()
  }).current

  useEffect(() => {
    animateProgress(progress)
  }, [animateProgress, progress])

  const firstIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp'
  })

  const secondIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp'
  })

  const secondIndicatorVisibility = animatedProgress.interpolate({
    inputRange: [0, 49, 50, 100],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp'
  })

  return (
    <EmptyCircle style={{ backgroundColor }}>
      <Indicator style={{
        transform: [{ rotate: firstIndicatorRotate }]
      }}
      />
      <CoverIndicator />
      <Text style={{ transform: [{ rotate: '45deg' }], fontSize: SIZE / 2, color: 'white', fontFamily: 'VitesseSans-Book' }}>{progress != null ? progress : 0}</Text>
      <Indicator style={{
        transform: [{ rotate: secondIndicatorRotate }],
        opacity: secondIndicatorVisibility
      }}
      />
    </EmptyCircle>
  )
}
