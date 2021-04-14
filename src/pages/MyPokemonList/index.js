import React, {useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CardPokemon } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';



const MyPokemonList = ({navigation}) => {
    const [myPokemonList, setMyPokemonList] = useState([])


    const getData = async () => {
        try {
          const data = await AsyncStorage.getItem('myPokemon');
          if (data !== null) {
            // return JSON.parse(data).push(myPokemonList);
            return setMyPokemonList(JSON.parse(data))
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getData()
        console.log(myPokemonList)
        
      },[])

      const RenderCardPokemon = () => {
          return myPokemonList.map((list,index) => {
            const capitalizedFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            return (
                <CardPokemon 
                key={index} 
                name={capitalizedFirstLetter(list.name)} 
                image={list.url} 
                bgColor={list.bgColor} 
                types={list.types}
                onPress={() => navigation.navigate('PokemonDetail', {name: list.name, types: list.types, url:list.url, color:list.color})}
                />
            )
          })
      }
    
    return (
        <View style={{backgroundColor:'white', flex:1}}>
        <ScrollView
        onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              let offsetData = offset
              offsetData += 20 
              setOffset(offsetData)
            }
          }}
        style={styles.pageContainer}
        >   
                    <TouchableOpacity onPress={() => navigation.navigate('PokemonList') }>
                        <Icon name="arrow-left" size={wp('5%')}  />
                    </TouchableOpacity>
            <Text style={styles.AppsNameText}>My List Pokemon</Text>
                <View style={styles.ListContainer}>
                    <RenderCardPokemon />
                    
                </View>
                {/* {
                        loading ? 
                        <View style={{justifyContent:'center', flex:1, flexDirection:'row'}}>
                            <ActivityIndicator size="large" color="red" />
                        </View>
                        :
                        null
                    } */}
              
        </ScrollView>
        </View>
    )
}

export default MyPokemonList

const styles = StyleSheet.create({
    pageContainer: {
        marginHorizontal:wp('5%'),
        marginVertical:hp('2%'),
        flex:1,
        backgroundColor:'white'
    },
    AppsNameText: {
        fontSize:wp('6%'),
        fontWeight:'bold'
    },
    ListContainer: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop:hp('5%')

    }
})
