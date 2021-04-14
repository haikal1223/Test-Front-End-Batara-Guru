import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, Image, useWindowDimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { DetailPokemonList, ProgressPokemonData } from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';



const PokemonDetail = ({route, navigation}) => {
    const [name,setName] = useState('')
    const [types,setTypes] = useState([])
    const [url,setUrl] = useState('')
    const [bgColor,setBgColor] = useState('')
    const [id,setId] = useState('')
    const [height,setHeight] = useState('')
    const [weight,setWeight] = useState('')
    const [abilities, setAbilities] = useState([])
    const [abilitiesName, setAbilitiesName] = useState([])
    const [overallStats,setOverallStats] = useState([])
    const [pokemonHp, setPokemonHp] = useState(0)
    const [pokemonAttack, setPokemonAttack] = useState(0)
    const [pokemonDeffense, setPokemonDeffense] = useState(0)
    const [pokemonSpAttack,setPokemonSpAttack] = useState(0)
    const [pokemonSpDeffense,setPokemonSpDeffense] = useState(0)
    const [pokemonSpeed,setPokemonSpeed] = useState(0)
    const [totalPokemonStats, setTotalPokemonStats] = useState(0)
    const [aboutLoading, setAboutLoading] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likedPokemon,setLikedPokemon] = useState([])
    
   
    const totalStats = (hp,att,def,spAttack,spDeff,speed) => {
        let value = hp + att + def + spAttack + spDeff + speed
        setTotalPokemonStats(value)
    }

    const convertID =  (str) => {
            let IDLength =  str.split('')
            if(IDLength.length === 1){
               setId('00' + str)
            }
            else if(IDLength.length === 2){
               setId('0' + str)
            }
            else {
                setId(id)
            }
    }
    
    const LoopingAbilities = (data) => {
        return data.forEach((ability) => {
            // console.log(ability.ability.name)
            // setAbilitiesName(ability.ability.name)
            abilitiesName.push(ability.ability.name)
            // console.log(abilitiesName)
        })
    }

    const fetchPokemonDetail = async (id) => {
        try {
            setAboutLoading(true)
            const resultPokemonDetail = await axios.get(
                `${BASE_URL}/pokemon/${id}`
            )
            let data = resultPokemonDetail.data
            setWeight(data.weight)
            setHeight(data.height)
            setAbilities(data.abilities)
            setOverallStats(data.stats)
            setAboutLoading(false)

            
        }catch {
            console.log('Error on Catch Data')
        }
    }

    const loopingStats = (data) => {
        return data.forEach((stat) => {
            if(stat.stat.name === 'hp'){
                setPokemonHp(stat.base_stat)
            }
            if(stat.stat.name === 'attack'){
                setPokemonAttack(stat.base_stat)
            }
            if(stat.stat.name === 'defense'){
                setPokemonDeffense(stat.base_stat)
            }
            if(stat.stat.name === 'special-attack'){
                setPokemonSpAttack(stat.base_stat)
            }
            if(stat.stat.name === 'special-defense'){
                setPokemonSpDeffense(stat.base_stat)
            }
            if(stat.stat.name === 'speed'){
                setPokemonSpeed(stat.base_stat)
            }
        })
    }

    const AboutRoute = () => (
          
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop:hp('3.5%') }} >
                {
                    aboutLoading  ?
                        <View style={{justifyContent:'center', flex:1, flexDirection:'row'}}>
                            <ActivityIndicator size="large" color="red" />
                        </View>
                        :
                        <View>
                            <DetailPokemonList name={'Height'} value={`${height}"`} />
                            <DetailPokemonList name={'Weight'} value={`${weight} Kg`} />
                            <DetailPokemonList name={'Abilities'} value={abilitiesName.join(', ')} />
                        </View>
                }
               
            </View>
        
       
      );
      const BaseRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white', paddingTop:hp('3.5%') }} >
           <ProgressPokemonData name={'HP'} value={pokemonHp} color={'red'} />
           <ProgressPokemonData name={'Attack'} value={pokemonAttack} color={'green'}  />
           <ProgressPokemonData name={'Deffense'} value={pokemonDeffense} color={'red'} />
           <ProgressPokemonData name={'Sp.Attack'} value={pokemonSpAttack} color={'green'} />
           <ProgressPokemonData name={'Sp.Deffense'} value={pokemonSpDeffense} color={'green'} />
           <ProgressPokemonData name={'Speed'} value={pokemonSpeed} color={'red'} />
            {totalStats(pokemonHp, pokemonAttack, pokemonDeffense, pokemonSpAttack, pokemonSpDeffense, pokemonSpeed)}
           <ProgressPokemonData name={'Total'} value={totalPokemonStats} color='green' />



        </View>
      );
    
      const EvolutionRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} />
      );
      
      const MovesRoute = () => (
        <View style={{ flex: 1, backgroundColor: 'white' }} />
      );
        
    
    useEffect(() => {
        const {name, types,url, color} = route.params
        setName(name)
        setTypes(types)
        setUrl(url)
        setBgColor(color)
        convertID(url)
        fetchPokemonDetail(url)
    }, [])

    useEffect(() => {
        onCheckingLocalStorage(name)
    },[name])
    
    useEffect(() => {
        loopingStats(overallStats)
    },[overallStats])

    useEffect(() => {
        LoopingAbilities(abilities)
    },[abilities])

    const RenderTypes = () => {
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

    

      const layout = useWindowDimensions();

      const [index, setIndex] = React.useState(0);
      const [routes] = React.useState([
        { key: 'first', title: 'About' },
        { key: 'second', title: 'Base Stats' },
        { key: 'third', title: 'Evolution' },
        { key: 'fourth', title: 'Moves' },
      ]);

      const renderScene = SceneMap({
        first: AboutRoute,
        second: BaseRoute,
        third: EvolutionRoute,
        fourth: MovesRoute
      });

      const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'blue' }}
          style={{ backgroundColor: 'white', paddingTop:hp('3%') }}
          activeColor={'#000000'}
          inactiveColor={'#706c6c'}
          labelStyle={{fontSize:wp('3.15%'), fontWeight:'600'}}
        />
      );

      const capitalizedFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const onCheckingLocalStorage = async (pokemonName) => {
        const data = await AsyncStorage.getItem('myPokemon');
        console.log('Get Data ' + data)

        if (data !== null) {
            return JSON.parse(data).forEach((item) => {
                if(item.name === name){
                    return setIsLiked(true)
                }
                return setIsLiked(false)
            })
        }
    }

    

    const onLikePress = async () => {
        const obj ={
            name: name,
            types: types,
            url: url,
            bgColor: bgColor
        }
        try {
            await AsyncStorage.setItem('myPokemon', JSON.stringify([obj]))
            setIsLiked(true)

        } catch (e) {
            console.log(e)
        }
    }

    const onUnlikePress = async () => {
        try {
            await AsyncStorage.removeItem('myPokemon')
            setIsLiked(false)

          } catch(e) {
            console.log(e)
          }
    }


    

    return (
        <View style={{
            ...styles.pageContainer,
            backgroundColor: bgColor
            }}>
            <View style={styles.topContainer}>
                <View style={{paddingBottom:hp('3%'), flexDirection:'row', justifyContent:'space-between'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('PokemonList') }>
                        <Icon name="arrow-left" size={wp('5%')}  />
                    </TouchableOpacity>
                    {
                        isLiked ?
                        <TouchableOpacity onPress={onUnlikePress}>
                            <MIcon name="favorite" size={wp('8%')} color={'red'}  />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={onLikePress}>
                            <MIcon name="favorite-border" size={wp('8%')} color={'black'}  />
                        </TouchableOpacity>

                    }

                </View>
                <Text style={{
                    ...styles.pokemonNameText,
                    color: bgColor === 'white'|| bgColor === 'yellow' ? 'black' : 'white'
                    }}>{capitalizedFirstLetter(name)}</Text>
                {/* Pokemon ID */}
                <View style={styles.pokemonIDContainer}>
                    <Text style={{
                        ...styles.pokemonIDText,
                        color: bgColor === 'white'|| bgColor === 'yellow' ? 'black' : 'white'
                        }}>#{id}</Text>
                </View>
                {/* Category Pill */}
                <View style={styles.categoryPillContainer} >
                   <RenderTypes />
                </View>
            </View>
            {/* Pokemon Image */}
            <View style={styles.pokemonImageContainer}>
                <Image style={styles.pokemonImage} source={{uri:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${url}.png`}} />
            </View>
            {/* Pokemon Detail Start */}
                <View style={styles.pokemonDetailContainer}>
                <TabView
                    renderTabBar={renderTabBar}
                    style={{borderTopRightRadius:wp('10%'), borderTopLeftRadius: wp('10%')}}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={{ width: layout.width }}
                />
                </View>
            {/* Pokemon Detail End */}
                

        </View>
    )
}

export default PokemonDetail

const styles = StyleSheet.create({
    pageContainer: {
        flex:1,
    },
    topContainer: {
        marginHorizontal:wp('5%'),
        marginTop:hp('3%')
    },
    pokemonNameText: {
        fontSize:wp('8%'),
        fontWeight:'bold',
    },
    categoryPillContainer:{
        marginTop:hp('-1%'),
        flexDirection:'row',
    },
    categoryPillCard: {
        width: wp('18%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:wp('5%'),
        marginBottom:hp('0.5%'),
        backgroundColor:'rgba(255, 255, 255,0.4)',
        marginRight: wp('2%'),
        paddingVertical:hp('1%')
    },
    categoryNameText:{
        color:'white'
    },
    pokemonImageContainer:{
        alignItems:'center',
        top: hp('3%'),
        zIndex: 1
    },
    pokemonImage: {
        width:wp('40%'),
        height: hp('20%'),
    },
    pokemonIDContainer: {
    }, 
    pokemonIDText: {
        fontSize:wp('5%'),
        fontWeight:'bold',
        textAlign:'right'
    },
    pokemonDetailContainer: {
        width:wp('100%'),
        flex:1,
        backgroundColor:'white',
        borderTopLeftRadius:wp('10%'),
        borderTopRightRadius:wp('10%'),
        borderColor:'#d1e3d6',
        borderWidth:wp('0.1%')
    }
    
})
