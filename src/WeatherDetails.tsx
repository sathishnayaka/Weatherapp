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

  import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

  type formTypes = {
    navigation : any;
    route : any;
  }

  const WeatherDetails = ({navigation,route}:formTypes) => {
    const [temp, setTemp] = useState("");
    const [weatherIcon, setWeatherIcon] = useState("");
    const [precip, setPrecip] = useState("");
    const [windSpeed, setWindSpeed] = useState("");

    const { capital } = route.params;

    const getWeatherDetails = async() => {
          const response =  await axios.get(
              `http://api.weatherstack.com/current?access_key=6f6fd10b21078247ac9030d5cebe1908&query=${capital}`
            );
          const { temperature , precip , weather_icons , wind_speed } = response.data.current;
          setTemp(temperature);
          setWeatherIcon(weather_icons[0]);
          setPrecip(precip);
          setWindSpeed(wind_speed);
          
    }

  useEffect(()=>{
      getWeatherDetails();
  },[])

    return (
      <SafeAreaView style={styles.sectionContainer}>
        <ImageBackground source={{uri : "https://cdn.dribbble.com/users/925716/screenshots/3333720/attachments/722375/night.png"}} resizeMode="cover" style={styles.image}>
        <Text data-testid="capital" style={styles.capitalText}> {capital}</Text>
        <Text data-testid="temp" style={styles.temp} > {temp}&deg;C</Text>
        <Image
          data-testid="weather-icon"
          style={styles.tinyLogo}
          source={{
            uri: weatherIcon,
          }}
        />
        <Text style={{color:'#fff', fontSize:20}}>Wind Speed : {windSpeed}KM/hr</Text>
        <Text style={{color:'#fff', fontSize:20}}> precipitation : {precip}</Text>
      </ImageBackground>
      </SafeAreaView>
    );
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
