import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { CardPokemon } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';


// connection to API
import axios from 'axios';
import { BASE_URL } from '../../utils';




const PokemonList = ({navigation}) => {

    const [pokemonList, setPokemonList] = useState([])
    const [offset,setOffset] = useState(0)
    const [loading,setLoading] = useState(false)

    const fetchPokemonList = async () => {
        try {
            const resultPokemonList = await axios.get(
                `${BASE_URL}/pokemon-species?offset=${offset}&limit=20`
            );

            let objPokemon = resultPokemonList.data.results

            for(let objItem of objPokemon){
                try {
                    // console.log(objItem)
                        const colorPokemon = await axios.get(
                          `${objItem.url}`
                        )
                        const numberFromURL = objItem.url.split('/')[6]
                        const pokemonType = await axios.get(
                            `https://pokeapi.co/api/v2/pokemon/${numberFromURL}/`
                          );
                        const {types} = pokemonType.data
                        const {name} = colorPokemon.data.color
                        objItem["color"] = name
                        objItem["types"] = types

                } catch {
                    console.log('err')
                }
            }


            // console.log(objPokemon)
            setPokemonList(objPokemon)
            
        } catch {
            console.log(err)
        }
    }

    const fetchPokemonNextList = async () => {
        try {
            setLoading(true)
            const resultPokemonList = await axios.get(
                `${BASE_URL}/pokemon-species?offset=${offset}&limit=20`
            );

            let objPokemon = resultPokemonList.data.results

            for(let objItem of objPokemon){
                try {
                    // console.log(objItem)
                    const colorPokemon = await axios.get(
                        `${objItem.url}`
                      )
                      const numberFromURL = objItem.url.split('/')[6]
                      const pokemonType = await axios.get(
                          `https://pokeapi.co/api/v2/pokemon/${numberFromURL}/`
                        );
                      const {types} = pokemonType.data
                      const {name} = colorPokemon.data.color
                      objItem["color"] = name
                      objItem["types"] = types
                } catch {
                    console.log('err')
                }
            }
            let listNextPokemon = [...pokemonList, ...objPokemon]
            setPokemonList(listNextPokemon)
            setLoading(false)
            
        } catch {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(offset){
            fetchPokemonNextList()
        }
    },[offset])

    const RenderCardPokemon = () => {
        return pokemonList.map((list,index) => {

            const capitalizedFirstLetter = (string) => {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            const getLastNumberFromURL = (string) => {
                return string.split('/')[6]
                
            }

            return (
                <CardPokemon 
                key={index} 
                name={capitalizedFirstLetter(list.name)} 
                image={getLastNumberFromURL(list.url)} 
                bgColor={list.color} 
                types={list.types}
                onPress={() => navigation.navigate('PokemonDetail', {name: list.name, types: list.types, url: getLastNumberFromURL(list.url), color:list.color})}
                />
            )
        })
    }

    useEffect(() => {
       fetchPokemonList()
    },[])

    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        return (
          layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
        );
      };


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
            <TouchableOpacity onPress={() => navigation.navigate('MyPokemon')} style={{ alignItems:'flex-end', marginRight:wp('2%'), marginTop:hp('2%')}}>
                <Icon name='bars' size={wp('5%')} />
            </TouchableOpacity>
          
            <Text style={styles.AppsNameText}>Pokedex</Text>
                <View style={styles.ListContainer}>
                    <RenderCardPokemon />
                    
                </View>
                {
                        loading ? 
                        <View style={{justifyContent:'center', flex:1, flexDirection:'row'}}>
                            <ActivityIndicator size="large" color="red" />
                        </View>
                        :
                        null
                    }
              
        </ScrollView>
        </View>
    )
}

export default PokemonList

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
