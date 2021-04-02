import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Dimensions, Image, Button, ImageBackground} from 'react-native';
import {Icon} from 'react-native-elements';
import moment from 'moment';
import {
  Container,
  Header,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
} from 'native-base';
import {FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {MediMaintaaContext} from '../context/context';

const {height, width} = Dimensions.get('window');
export default function HomeScreen(props) {
  const [isEnabled, setIsEnabled] = React.useState(true);
  const {state, setState} = React.useContext(MediMaintaaContext);
  const [formState, setFormState] = React.useState({
    category: 'Medical Reminder',
  });
  const isFocused = useIsFocused();
  const getInitialData = async () => {};

  React.useEffect(() => {
    getInitialData();
  }, [props.navigation, isFocused]);

  const renderCategories = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: item === formState.category ? '#923' : '#ddd',
          margin: 5,
          padding: 5,
        }}
        onPress={() => setFormState({...formState, category: item})}>
        <Text style={{color: item === formState.category ? '#fff' : '#000'}}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  // console.log(
  //   state,
  //   state.filter(e => e.category === formState.category),
  // );
  const dataState = state.filter(e => e.category === formState.category);
  const images = [
    require('../assets/bg1.jpg'),
    require('../assets/bg2.jpg'),
    require('../assets/bg3.jpg'),
  ];

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: 'Remainders List',
      headerRight: () => {
        return (
          <Icon
            name="add"
            type="Ionicons"
            style={{marginRight: 20, paddingRight: 10}}
            onPress={() => props.navigation.navigate('AddReminderScreen')}
          />
        );
      },
    });
  }, [props.navigation]);
  const cards = [
    {
      text: 'Card One',
      name: 'One',
      image: require('../assets/bg1.jpg'),
    },

    {
      text: 'Card One',
      name: 'One',
      image: require('../assets/bg2.jpg'),
    },
  ];

  const renderItem = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddReminderScreen', {idx: index})
          }>
          <Icon
            name="edit"
            type="Feather"
            color="#09f"
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              color: '#09f',
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => console.log(index)}
          style={{
            height: height * 0.08,
            width: width * 0.7,
            backgroundColor: '#fff',
            borderRadius: height * 0.02,
            borderTopWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#e65c53', fontSize: height * 0.023}}>
            {' '}
            {item.nameOfPill}{' '}
          </Text>
          <Text style={{fontWeight: 'bold'}}> {item.endDate} </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'right',
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: '#923',
            color: '#fff',
            borderBottomLeftRadius: 10,
          }}>
          {item.category}
        </Text>
        <TouchableOpacity
          onPress={() => setState(state.filter((each, ind) => ind !== index))}>
          <Icon
            name="delete"
            type="AntDesign"
            color="#f00"
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              alignSelf: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const sortedArray = () => {
    const sortedArray = state.sort(
      (a, b) =>
        moment(a.endDate).format('YYYYMMDD') -
        moment(b.endDate).format('YYYYMMDD'),
    );
    return sortedArray;
  };

  return (
    <ImageBackground
      style={{height, width}}
      source={require('../assets/bgr2.png')}>
      <View
        style={{
          height: height,
          width: width,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {sortedArray().map(
          e => (e.image = images[Math.floor(Math.random() * images.length)]),
        ).length ? (
          <React.Fragment>
            <View>
              {isEnabled ? (
                <Button
                  onPress={() => setIsEnabled(false)}
                  title="List View"
                  color="#e65c53"
                />
              ) : (
                <Button
                  onPress={() => setIsEnabled(true)}
                  title="Swipe View"
                  color="gray"
                />
              )}
            </View>
            {isEnabled ? (
              <View style={{backgroundColor: '#fff'}}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={[
                    'Water Reminder',
                    'Diet Reminder',
                    'Fitness Reminder',
                    'Meeting Reminder',
                    'Events Reminder',
                    'Medical Reminder',
                    'Others',
                  ]}
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderCategories}
                />
              </View>
            ) : null}

            {isEnabled ? (
              dataState.length ? (
                <View
                  style={{
                    height: height * 0.1,
                    width,
                    justifyContent: 'center',
                  }}>
                  <DeckSwiper
                    dataSource={dataState}
                    renderItem={item => (
                      <Card style={{elevation: 3}}>
                        <CardItem>
                          <Left>
                            <Thumbnail source={item.image} />
                            <Body>
                              <Text>{item.nameOfPill}</Text>
                              <Text note>{item.endDate}</Text>
                            </Body>
                          </Left>
                        </CardItem>
                        <CardItem cardBody>
                          <Image
                            style={{height: 300, flex: 1}}
                            source={item.image}
                          />
                        </CardItem>
                        <CardItem>
                          <Icon name="clock" type="entypo" color="#23f" />
                          <Text style={{paddingLeft: 10}}>
                            {item.pillPerTime}
                          </Text>
                        </CardItem>
                        <CardItem>
                          <Icon
                            name="calendar-day"
                            type="font-awesome-5"
                            color="#981"
                          />
                          <Text style={{paddingLeft: 10}}>
                            {item.pillsPerDay}
                          </Text>
                        </CardItem>
                        <CardItem>
                          <Icon
                            name="notes-medical"
                            type="font-awesome-5"
                            color="#ED4A6A"
                          />
                          <Text style={{paddingLeft: 10}}> {item.notes}</Text>
                        </CardItem>
                      </Card>
                    )}
                  />
                </View>
              ) : (
                <View
                  style={{
                    height: height * 0.5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: width,
                  }}>
                  <View
                    style={{padding: height * 0.02, backgroundColor: '#923'}}>
                    <Text
                      style={{
                        fontSize: height * 0.02,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      No Records corresponding to {formState.category}
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <FlatList
                data={state}
                renderItem={renderItem}
                style={{marginBottom: height * 0.07}}
                keyExtractor={(item, index) => index.toString()}
              />
            )}
          </React.Fragment>
        ) : (
          <View
            style={{
              height: height,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: height * 0.3,
                width: width * 0.8,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: height * 0.1,
                borderBottomWidth: 5,
              }}>
              <View
                style={{
                  height: height * 0.2,
                  width: width * 0.6,
                  alignSelf: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#923',
                  borderRadius: height * 0.04,
                  borderBottomWidth: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: height * 0.023,
                    textAlign: 'center',
                  }}>
                  No Remainders Here {'\n'} Click on + to add Remainder
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
