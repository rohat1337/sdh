import { Text, View, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

const windowHeight = Dimensions.get('window').height

function Header (props) {
  // ChoosePlayer header
  if (props.stackIndex === 0) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1 }} />

        <View style={{ flex: 0.8 }}>
          <Text style={styles.header}>IK Sirius Datahub</Text>
        </View>

        <View style={{ flex: 0.1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ marginRight: '10%' }} onPress={() => props.nav.navigate('Dashboard', { player_id: props.player_id["ID"] })}>

            <Text style={styles.small_text}>Dashboard / Ratings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginRight:"10%"}}
            onPress={() => props.nextIsOK === 'white' ? props.nav.navigate('ChooseStats', { players: props.players }) : {}}>
            <Text style={styles.small_text}>
              Spindel -{'>'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    )
    // ChooseStats header
  } else if (props.stackIndex === 1) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.1 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={styles.small_text}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.header}>IK Sirius Datahub</Text>
        </View>
        <View style={{ flex: 0.1 }} />

      </View>
    )
    // Dashboard header
  } else if (props.stackIndex === 2) {
    return(
      <View style={props.header}>
          <View style={{flex: 0.1}}>  
             <TouchableOpacity
             onPress={() => props.nav.goBack()}>
                 <Text style={styles.small_text}>
                     {"<"}- Tillbaka
                 </Text>
             </TouchableOpacity>
         </View>
         <View style={{flex: 0.8}}>
             <Text style={styles.header}>IK Sirius Datahub</Text>
         </View>
         <View style={{flex:0.1}}>
             <TouchableOpacity onPress={() => {
                props.nav.navigate('Ratings', {player_id: props.player_id});
                console.log("ratings page for Player: " + props.player_id) 
             }}>
                 <Text style={styles.small_text}>Ratings {'->'}</Text>
             </TouchableOpacity>
         </View>
         
     </View>
 )
  } else if (props.stackIndex === 3) {
    return (
      <View style={props.header}>
        <View style={{ flex: 0.2 }}>
          <TouchableOpacity
            onPress={() => props.nav.goBack()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: windowHeight * 0.025, fontFamily: 'VitesseSans-Book' }}>
              {'<'}- Tillbaka
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 0.6, paddingRight: '10%' }}>
          <Text style={{ fontSize: windowHeight * 0.04, fontWeight: 'bold', color: 'white', fontFamily: 'VitesseSans-Black' }}>IK Sirius Datahub</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({

  small_text: {
      color: "white",
      fontWeight: "bold",
      fontSize: 18,
      fontFamily: "VitesseSans-Book"
  },

  header: {
      fontSize: 50,
      fontWeight:"bold",
      color: "white",
      fontFamily: "VitesseSans-Black",
      justifyContent:"center",
      textAlign:"center"
  }
});

export default Header
