import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Progress from 'react-native-progress';


const progressPokemonData = ({name, value, color}) => {
    
    return (
        <View style={styles.progressContainer}>
                <View style={styles.nameSectionContainer}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
                <View style={styles.valueSectionContainer}>
                    <Text  style={styles.valueText}>{value}</Text>
                </View>
                <View style={styles.progressSectionContainer}>
                    <Progress.Bar progress={value < 99 ? `0.${value}` : `${value}`} height={hp('1%')} borderRadius={wp('5%')} color={color}  />
                </View>
            </View>
    )
}

export default progressPokemonData

const styles = StyleSheet.create({
    progressContainer: {
        flexDirection:'row', 
        justifyContent:'space-between',
        alignItems:'center' , 
        height:hp('5%'), 
    },
    progressSectionContainer: {
        marginHorizontal:wp('3%'),
        justifyContent:'center',
        alignItems:'center'
    },
    nameSectionContainer: {
        flex:1,
        marginHorizontal:wp('3%'),
        justifyContent:'flex-start',
    },
    nameText: {
        fontSize:wp('4%'), 
        color:'#8a998e'
    },
    valueText: {
        fontSize:wp('4%'), 
        fontWeight:'700'
    },
    valueSectionContainer: {
        marginHorizontal:wp('3%'),
        justifyContent:'center',
        alignItems:'center',
        flex:1
    }

})
