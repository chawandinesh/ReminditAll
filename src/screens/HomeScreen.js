import React from 'react';
import {
  TouchableOpacity,
  Vibration,
  Alert,
  StyleSheet,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import moment from 'moment';
import {View, Text, Dimensions} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {MediMaintaaContext} from '../context/context';
import {useIsFocused} from '@react-navigation/native';
import {Image} from 'react-native';

const {height, width} = Dimensions.get('window');

export default function HomeScreen(props) {
  const {state, setState} = React.useContext(MediMaintaaContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const isFocused = useIsFocused();

  // PushNotification.configure({
  //   onRegister: function (token) {
  //     console.log("TOKEN:", token);
  //   },
  //   // onNotification: function (notification) {
  //   //   console.log("NOTIFICATION:", notification);
  //   //   notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   // },
  //   // onAction: function (notification) {
  //   //   console.log("ACTION:", notification.action);
  //   //   console.log("NOTIFICATION:", notification);
  //   // },
  //   // onRegistrationError: function(err) {
  //   //   console.error(err.message, err);
  //   // },
  //   // permissions: {
  //   //   alert: true,
  //   //   badge: true,
  //   //   sound: true,
  //   // },
  //   popInitialNotification: true,
  //   requestPermissions: true,
  // });

  const getInitialData = async () => {};
  PushNotification.localNotification({
    id: 4,
  });

  React.useEffect(() => {
    getInitialData();
  }, [props.navigation, isFocused]);

  if (props.route.name === 'HomeScreen') {
    state.map((e, idx) => {
      // console.log(e.endDate, e, moment().format('YYYY-MM-DD'));
      if (e.endDate === moment().format('YYYY-MM-DD')) {
        Vibration.vibrate(100);
        Alert.alert('Remainder', `${e.nameOfPill} was reached ${e.endDate}`, [
          {
            text: 'Update',
            onPress: () =>
              props.navigation.navigate('AddReminderScreen', {idx: idx}),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => setState(state.filter((e, index) => index !== idx)),
          },
          {
            cancelable: true,
            onDismiss: () =>
              Alert.alert(
                'This alert was dismissed by tapping outside of the alert dialog.',
              ),
          },
        ]);
      }
    });
  }

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitleAlign: 'center',
      headerShown: false,
    });

    // state.map(e => {
    //   // console.log(e.endDate, moment().format("YYYY-MM-DD"))
    //   // if(e.endDate === moment().format("YYYY-MM-DD")){
    //   //   alert("e", e.endDate)
    //   // }
    // });
  }, [props.navigation, isFocused]);
  // console.log(state)
  // console.log(moment().format("YYYY-MM-DD"))

  // React.useEffect(() => {
  //   // state.map((e) => {
  //   //   console.log(e.endDate, moment().format("YYYY-MM-DD"))
  //   //   if(e.endDate === moment().format("YYYY-MM-DD")){
  //   //     alert('e',e.nameOfPill)
  //   //   }
  //   // })
  //   state.map(e => {
  //     console.log(e.endDate, moment().format('YYYY-MM-DD'))
  //     if (e.endDate === moment().format('YYYY-MM-DD')) {
  //       alert('done');
  //     }
  //   });
  // }, []);

  return (
    <ImageBackground
      source={require('../assets/bgr1.jpg')}
      style={{height, width}}>
      <View
        style={{
          width,
          height: height * 0.5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{borderWidth: 3, backgroundColor: '#fff'}}>
          <Text
            style={{
              fontSize: height * 0.05,
              fontWeight: 'bold',
              color: '#e65c53',
            }}>
            Remind it all
          </Text>
        </View>
      </View>
      <Image
        source={require('../assets/reminder1.png')}
        style={{width: width * 0.3, height: height * 0.15, alignSelf: 'center'}}
      />
      <View style={{width, height: height * 0.4, justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('RemaindersList')}
          style={{
            height: height * 0.06,
            width: width * 0.5,
            alignItems: 'center',
            borderRadius: 5,
            borderBottomWidth: 3,
            borderWidth: 1,
            marginBottom: height * 0.03,
            justifyContent: 'center',
            backgroundColor: '#e65c53',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: '500',
              color: '#fff',
            }}>
            Remainders list
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            height: height * 0.06,
            width: width * 0.5,
            alignItems: 'center',
            borderRadius: 5,
            borderBottomWidth: 3,
            borderWidth: 1,
            justifyContent: 'center',
            backgroundColor: '#e65c53',
          }}>
          <Text
            style={{
              fontSize: height * 0.03,
              fontWeight: '500',
              color: '#fff',
            }}>
            About Us
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>About Us</Text>
            <Text style={{textAlign: 'center'}}>
              This is simple and Amazing app
            </Text>
            <Text style={{textAlign: 'center'}}>
              In this app, user can create his own reminder for the specific
              category
            </Text>
            <Text style={{textAlign: 'center'}}>
              There are lot of categories available in this app Water Reminder,
              Diet Reminder, Fitness Reminder, Meeting Reminder, Events
              Reminder, Medical Reminder, Others
            </Text>
            <Text style={{textAlign: 'center'}}>
              The user can Manage all of his record, makes easy for changes and
              erase the each record
            </Text>
            <Text style={{textAlign: 'center'}}>
              User can view the record in two views list view, swipable view
            </Text>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              Enjoy the app
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 20,
    width: width * 0.8,
    height: height * 0.6,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: height * 0.024,
    textAlign: 'center',
  },
});
