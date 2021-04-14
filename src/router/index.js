import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { PokemonDetailPage, PokemonListPage, MyPokemonListPage } from '../pages';

const Stack = createStackNavigator();

const Router = () => {
    return ( 
        <Stack.Navigator initialRouteName='PokemonList'>
            <Stack.Screen
             name='PokemonList' 
             component={PokemonListPage} 
             options={{
                 headerShown: false
             }}
             />

            <Stack.Screen
             name='PokemonDetail' 
             component={PokemonDetailPage} 
             options={{
                 headerShown: false
             }}
             />

            <Stack.Screen
             name='MyPokemon' 
             component={MyPokemonListPage} 
             options={{
                 headerShown: false
             }}
             />

        </Stack.Navigator>
    )
}

export default Router