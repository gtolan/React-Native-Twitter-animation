import React, {useState, useEffect} from 'react';
import { StyleSheet,Dimensions, Text, Image, View, ScrollView, Animated } from 'react-native';





export default function App() {
  const HEADER_MAX_HEIGHT = 120;
  const HEADER_MIN_HEIGHT = 70;
  const PROFILE_IMAGE_MAX_HEIGHT = 80;
  const PROFILE_IMAGE_MIN_HEIGHT = 40;
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const SCROLLABLE_CONTAINER_HEIGHT = WINDOW_HEIGHT - HEADER_MIN_HEIGHT

  const scrollStartValue = new Animated.Value(0);
  const [scrollYValue, setScrollYValue] = useState(scrollStartValue)


  
  
  const scrollAnimation = (nativeEvent) =>{

    const setNewScrollPosition = nativeEvent => {
      console.log(nativeEvent.contentOffset.y ,"Listener YYY");
        let scrollYPos = nativeEvent.contentOffset.y;
        let scrollNewPos = new Animated.Value(scrollYPos)
        setScrollYValue(scrollNewPos);
        console.log('wH',WINDOW_HEIGHT)
}

  
  // console.log(nativeEvent, "NE");
  Animated.event([{nativeEvent:{
        contentOffset:{
                y:scrollYValue}
                        }}],
        {listener: setNewScrollPosition(nativeEvent) //console.log('list', nativeEvent)
      }
                      )
  }


  useEffect(() => {
    console.log( "Use Effect")

  
  }, [scrollYValue])

  const headerHeight = scrollYValue.interpolate({
    inputRange:[0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange:[HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate:'clamp'
  })
  // const profileImageHeight = 50;
  const profileImageHeight = scrollYValue.interpolate({
    inputRange:[0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange:[PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
    extrapolate:'clamp'
  })

  const profileImageMarginTop = scrollYValue.interpolate({
    inputRange:[0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange:[HEADER_MAX_HEIGHT - (PROFILE_IMAGE_MAX_HEIGHT/2), HEADER_MAX_HEIGHT],
    extrapolate:'clamp'
  })

  const headerZIndex = scrollYValue.interpolate({
    inputRange:[0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange:[0, 2],
    extrapolate:'clamp'
  })

  const headerFontSize = scrollYValue.interpolate({
    inputRange:[0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange:[1, 24],
    extrapolate:'clamp'
  })
  const headerFontOpacity = scrollYValue.interpolate({
    inputRange:[0, (HEADER_MAX_HEIGHT/2) - (HEADER_MIN_HEIGHT/3)],
    outputRange:[0, 1],
    extrapolate:'clamp'
  })

  const headerTitleBottom = scrollYValue.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT -
        HEADER_MIN_HEIGHT +
        5 +
        PROFILE_IMAGE_MIN_HEIGHT +
        26
    ],
    outputRange: [-30, -30, -30, 5],
    extrapolate: 'clamp'
  });

  return (

    

    <View style={styles.container}>
      <Animated.View style={{
        position:'absolute',
        paddingTop:0,
        top:0,
        left:0,
        right:0,
        backgroundColor:'lightskyblue',
        height: headerHeight, //HEADER_MAX_HEIGHT
        zIndex:headerZIndex,
        elevation: headerZIndex
      }}>
        <Animated.View style={{opacity:headerFontOpacity,width:'100%',alightItems:'center',position:'absolute', bottom:headerTitleBottom}} >
          <Animated.Text style={{color:'white',textAlign:'center',fontSize:headerFontSize, fontWeight:'bold'}}>Gerard Tolan</Animated.Text> 
        </Animated.View>
      </Animated.View>


      <ScrollView style={{flex:1,height:'140%'}}
      scrollEventThrottle={26}
      onScroll={(e) => {
          let nativeEvent = e.nativeEvent;
          scrollAnimation(nativeEvent)
        }}
          
                  
      >
            <Animated.View style={{
            height:profileImageHeight,
            width:profileImageHeight,
            borderRadius:PROFILE_IMAGE_MAX_HEIGHT/2,
            borderColor:'white',
            borderWidth:2,
            overflow:'hidden',
            marginTop: profileImageMarginTop,
            marginLeft:10
            
          }}>
            <Image style={{flex:1, width:null,height:null}} source={require('./assets/me.png')}></Image>
          </Animated.View>
          <View>
            <Text style={{fontWeight:'bold',paddingLeft:10, fontSize:26}}>Gerard Tolan</Text>
          </View>
          <View style={{height:SCROLLABLE_CONTAINER_HEIGHT, backgroundColor:'white'}} ></View>
      </ScrollView>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
