import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const CardPokemon = ({name, image, onPress, bgColor, types}) => {
   
    
    const renderTypes = () => {
      return types.map((item, index) => {
            return(
                <View key={index} style={{
                    ...styles.categoryPillCard,
                    backgroundColor: bgColor === 'white' || bgColor === 'yellow' ? 'rgba(0, 0, 0,0.4)' : 'rgba(255, 255, 255,0.4)'
                }} >
                    <Text style={styles.categoryNameText} >{item.type.name}</Text>
                </View>
            )
        })
    }

    return (
    <TouchableOpacity onPress={onPress} style={{
          ...styles.cardContainer,
          backgroundColor:bgColor,
          elevation:5
      }}>
        <Text style={{
            ...styles.pokemonNameText,
            color: bgColor === 'white' || bgColor === 'yellow' ? 'black' : 'white'
        }}>{name}</Text>
        {/* Flex Row */}
        <View style={{flexDirection:'row'}}>
            {/* Category Pill */}
            <View style={styles.categoryPillContainer}>
                {renderTypes()}
            </View>
        {/* Pokemon Image */}
            <View style={styles.pokemonImageContainer}>
                <Image style={styles.pokemonImage} source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image}.png`}} />
            </View>
        </View>

    </TouchableOpacity>
    )
}

export default CardPokemon

const styles = StyleSheet.create({
    cardContainer: {
        width:wp('40%'),
        height:hp('15%'),
        borderColor:'black',
        borderRadius:wp('5%'),
        paddingVertical:hp('1%'),
        paddingHorizontal:wp('2.5%'),
        marginBottom:wp('2%'),
        marginRight:hp('1.5%'),
    },
    categoryPillContainer: {
        marginTop:hp('1%')
    },
    categoryPillCard: {
        width: 'auto',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('5%'),
        marginBottom:hp('0.5%'),
        // backgroundColor:'rgba(255, 255, 255,0.4)',
    },
    categoryNameText: {
        fontSize:wp('3%'),
        paddingHorizontal:wp('2%'),
        color:'white'
    },
    pokemonNameText: {
        fontSize:wp('4.5%'),
        fontWeight:'bold'
    },
    pokemonImageContainer: {
        left:wp('4%'),
        top:hp('1.5%')
    },  
    pokemonImage: {
        width:wp('17%'),
        height: hp('8.5%'),
    }
})
