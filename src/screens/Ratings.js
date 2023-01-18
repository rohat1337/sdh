import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native'
import Header from '../components/Header'
import { getPlayerRating, roundMarketValue, getPlayerRanking, fixPlayerPositions } from '../data'
import CircularProgress from '../components/CircularProgress'
import PositionRanking from '../components/PositionRanking'
import TopList from '../components/TopList'
import './background.css'
import Background from '../components/Background'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function Ratings (props) {
  const playerID = props.navigation.getParam('player_id', 'default')
  const [ratingObj, setRatingObj] = useState(null)
  const [rankingObj, setRankingObj] = useState(null)

  useEffect(() => {
    console.log('getting ratings for player_id: ', playerID)
    getPlayerRating(playerID)
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then((data) => {
        data = data[1][0]
        setRatingObj(data)
      })
    getPlayerRanking(playerID)
      .then((response) => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then((data) => {
        data = data[1][0]
        setRankingObj(data)
      })
  }, [])

  if (ratingObj == null) {
    return (
      <View style={styles.root}>
        <Header header={styles.header} stackIndex={1} nav={props.navigation} />
        <View style={styles.content_root}>
          <Background weakerLogo={true}/>
          <View>
            <Text style={styles.loading}>Loading...</Text>
          </View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.root}>
        <Header header={styles.header} stackIndex={1} nav={props.navigation} />
        <View style={styles.content_root}>

          <Background weakerLogo={true}/>
          <View style={{ flexDirection: 'row', height: '100%' }}>

            <View style={{ flex: 0.4, flexDirection: 'column', margin: '2%' }}>

              <View style={{ flex: 0.4, textAlign: 'center' }}>
                <Text style={styles.small_text}>{ratingObj.Player}, {ratingObj.Team}</Text>
                <Text style={styles.small_text}>Ålder: {ratingObj.Age}</Text>
                <Text style={styles.small_text}>Position(er): {fixPlayerPositions(ratingObj.Position)}</Text>
                <Text style={styles.small_text}>Längd: {ratingObj.Height}cm</Text>
                <Text style={styles.small_text}>Vikt: {ratingObj.Weight}kg</Text>
                <Text style={styles.small_text}>Marknadsvärde: {'\u20AC'}{roundMarketValue(ratingObj['Market value'])}M</Text>
              </View>

              <View style={{ flex: 0.6, height: '100%' }}>
                <View style={{ width: '100%', alignItems: 'center' }}>
                  <Text style={styles.small_text}>Jämförelse:</Text>
                </View>
                {rankingObj == null
                  ? <Text>Loading....</Text>
                  : null}

                {ratingObj['Rating as CB'] != null && rankingObj != null
                  ? <PositionRanking position='CB' value={rankingObj['Ranking as CB']} total={rankingObj['CB TOTAL']} />
                  : null}

                {ratingObj['Rating as WB'] != null && rankingObj != null
                  ? <PositionRanking position='WB' value={rankingObj['Ranking as WB']} total={rankingObj['WB TOTAL']} />
                  : null}

                {ratingObj['Rating as SIX'] != null && rankingObj != null
                  ? <PositionRanking position='6' value={rankingObj['Ranking as SIX']} total={rankingObj['SIX TOTAL']} />
                  : null}

                {ratingObj['Rating as SEVEN'] != null && rankingObj != null
                  ? <PositionRanking position='7' value={rankingObj['Ranking as SEVEN']} total={rankingObj['SEVEN TOTAL']} />
                  : null}

                {ratingObj['Rating as EIGHT'] != null && rankingObj != null
                  ? <PositionRanking position='8' value={rankingObj['Ranking as EIGHT']} total={rankingObj['EIGHT TOTAL']} />
                  : null}

                {ratingObj['Rating as TEN'] != null && rankingObj != null
                  ? <PositionRanking position='10' value={rankingObj['Ranking as TEN']} total={rankingObj['TEN TOTAL']} />
                  : null}

                {ratingObj['Rating as NINE'] != null && rankingObj != null
                  ? <PositionRanking position='9' value={rankingObj['Ranking as NINE']} total={rankingObj['NINE TOTAL']} />
                  : null}

              </View>

            </View>
            <View style={{ flex: 0.6, flexDirection: 'row', height: '100%', justifyContent: 'space-around' }}>
              {ratingObj['Rating as CB'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>MB</Text>
                    <CircularProgress progress={ratingObj['Rating as CB']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.7, marginTop: '5%' }}>
                    <TopList position='CB' player={ratingObj.Player} />
                  </View>

                  </View>
                : null}

              {ratingObj['Rating as WB'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>WB</Text>
                    <CircularProgress progress={ratingObj['Rating as WB']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.7, marginTop: '5%' }}>
                    <TopList position='WB' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

              {ratingObj['Rating as SIX'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>6</Text>
                    <CircularProgress progress={ratingObj['Rating as SIX']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.70, marginTop: '5%' }}>
                    <TopList position='SIX' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

              {ratingObj['Rating as EIGHT'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>8</Text>
                    <CircularProgress progress={ratingObj['Rating as EIGHT']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.70, marginTop: '5%' }}>
                    <TopList position='EIGHT' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

              {ratingObj['Rating as SEVEN'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>7</Text>
                    <CircularProgress progress={ratingObj['Rating as SEVEN']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.70, marginTop: '5%' }}>
                    <TopList position='SEVEN' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

              {ratingObj['Rating as TEN'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>10</Text>
                    <CircularProgress progress={ratingObj['Rating as TEN']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.70, marginTop: '5%' }}>
                    <TopList position='TEN' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

              {ratingObj['Rating as NINE'] != null
                ? <View style={styles.rating_view}>
                  <View style={styles.rating_content}>
                    <Text style={styles.small_text}>9</Text>
                    <CircularProgress progress={ratingObj['Rating as NINE']} />
                  </View>
                  <View style={{ width: '100%', flex: 0.70, marginTop: '5%' }}>
                    <TopList position='NINE' player={ratingObj.Player} />
                  </View>
                  </View>
                : null}

            </View>
          </View>

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    width: windowWidth,
    height: windowHeight,
    flexDirection: 'column'

  },
  content_root: {
    width: windowWidth,
    height: windowHeight - windowHeight / 10,
    backgroundColor: '#001324',
    flexDirection: 'column'
  },

  header: {
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    height: windowHeight / 10,
    backgroundColor: '#001324',
    textAlign: 'center',
    flexDirection: 'row'
  },

  small_text: {
    fontSize: windowWidth / 50,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'VitesseSans-Book'
  },

  loading: {
    fontSize: 50,
    color: 'white',
    fontFamily: 'VitesseSans-Book'
  },

  rating_view: {
    flexDirection: 'column',
    width: windowWidth / 8,
    justifyContent: 'space-evenly'
  },

  rating_content: {
    textAlign: 'center',
    alignItems: 'center',
    width: '100%',
    flex: 0.3
  }

})

export default Ratings
