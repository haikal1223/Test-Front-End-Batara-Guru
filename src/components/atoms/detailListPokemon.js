import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const detailListPokemon = ({name,value}) => {
    return (
            <View style={styles.detailListContainer}>
                <Text style={styles.detailKeyText}>{name}</Text>
                <Text style={styles.detailValueText}>{value}</Text>
            </View>
    )
}

export default detailListPokemon

const styles = StyleSheet.create({
    detailListContainer:{
        flexDirection:'row',
        marginLeft:wp('6%'),
        marginVertical:hp('0.6%')
    },
    detailKeyText:{
        fontSize:wp('4.5%'), 
        color:'#8a998e'
    },
    detailValueText:{
        fontSize:wp('4.5%'), 
        marginLeft:wp('10%'), 
        fontWeight:'600'
    }
})
