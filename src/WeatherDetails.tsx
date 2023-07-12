  import axios from 'axios';
  import React, { useState , useEffect} from 'react';
  import {
    Image,
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    useColorScheme,
  } from 'react-native';
  type formTypes = {
    navigation : any;
    route : any;
  }

  const WeatherDetails = ({navigation,route}:formTypes) => {

    const { capital, temperature , precip , weather_icons , wind_speed  } = route.params;

    console.log(weather_icons,capital);
  if(weather_icons){
    return (
      <SafeAreaView style={styles.sectionContainer}>
        <ImageBackground source={{uri : "https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png"}} resizeMode="cover" style={styles.image}>
        <Text data-testid="capital" style={styles.capitalText}> {capital}</Text>
        <Text data-testid="temp" style={styles.temp} > {temperature}&deg;C</Text>
        <Image
          data-testid="weather-icon"
          style={styles.tinyLogo}
          source={{
            uri: weather_icons[0],
          }}
        />
        <Text style={{color:'#fff', fontSize:20}}>Wind Speed : {wind_speed}KM/hr</Text>
        <Text style={{color:'#fff', fontSize:20}}> precipitation : {precip}</Text>
      </ImageBackground>
      </SafeAreaView>
    );
  }else{
    <Text>Loading</Text>
  }
  }

  const styles = StyleSheet.create({
    sectionContainer: {
      width:'100%',
      height:"100%"
    },
    tinyLogo :{
      width:100, 
      height:100,
      borderRadius:16,
    },
    image :{
      flex:1,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center'
    },
    capitalText : {
      color:"#fff",
      fontSize:24,
      fontWeight:'800',
      alignSelf:'center'
    },
    temp:{
      fontSize:36,
      lineHeight:50,
      fontWeight:'800',
      color : 'orange'
    }

  });


  export default WeatherDetails;
