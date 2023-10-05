import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import ImageZoom from 'react-native-image-pan-zoom';
import {useNavigation} from '@react-navigation/native';
import DropdownAlert from 'react-native-dropdownalert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import secondIMG from '../img/secondIMG.jpeg';

const {width, height} = Dimensions.get('window');
const modalInitialState = {visible: false};

const SecondScreen = props => {
  const {background, name} = useSelector(state => state.theme);

  const inlineStyles = {
    container: {backgroundColor: background},
  };

  const {image, kundenname, email} = props.route.params;

  const dropDownAlertRef = useRef(null);
  const [pdfURL, setPdfURL] = useState(null);
  const [modal, setModal] = useState(modalInitialState);
  const [extraMail, setExtraMail] = useState('');

  const send = () => {
    const apiUrl = 'https://seyfisonercetin.com/api/pdf-mail/index.php';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/html',
      },
      body: JSON.stringify({image, kundenname, email}),
    })
      .then(res => res.json())
      .then(txt => {
        setPdfURL(txt.status);

        if (txt.status !== 'error') {
          dropDownAlertRef.current.alertWithType(
            'success',
            'Erfolg',
            'Mail wurde gesendet !',
          );
          setTimeout(() => {
            showModal();
          }, 1000);
        }
        if (txt.status !== txt.status) {
          dropDownAlertRef.current.alertWithType(
            'error',
            'Error',
            'Etwas ist schief gelaufen !',
          );
        }
      })
      .catch(error => console.error(error));
  };

  // const save = () => {
  //   if (pdfURL) props.navigation.navigate('PdfScreen', {pdfURL});
  // };
  const showModal = () => {
    setModal({visible: true});
  };

  const extraMailSend = () => {
    let fileName = pdfURL.split('/');
    fileName = fileName[fileName.length - 1];

    const apiUrl = 'https://seyfisonercetin.com/api/extra-mail/index.php';
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({fileName, email: extraMail}),
    })
      .then(res => res.text())
      .then(json => {
        if (json !== 'file no exists!!!') {
          dropDownAlertRef.current.alertWithType(
            'success',
            'Erfolg',
            'Mail wurde gesendet !',
          );
          setTimeout(() => {
            navigation.navigate('ListScreen');
          }, 1000);
        }
        if (json == 'file no exists!!!') {
          dropDownAlertRef.current.alertWithType(
            'error',
            'Error',
            'Etwas ist schief gelaufen !',
          );
        }
      })

      .catch(error => console.error(error));
  };

  const navigation = useNavigation();
  const closeModal = () => setModal(modalInitialState);
  return (
    <View style={[styles.container, inlineStyles.container]}>
      <DropdownAlert ref={dropDownAlertRef} />

      {/* Modal */}
      <Modal animationType="slide" visible={modal.visible}>
        {name == 'light' ? (
          <ImageBackground
            style={{flex: 1}}
            source={require('../img/errorLight.png')}>
            {pdfURL !== null ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text style={{color: '#000', fontSize: 22}}>Geben Sie die</Text>
                <Text style={{color: '#000', fontSize: 22}}>
                  Kunden-E-Mail-Adresse ein
                </Text>
                <View style={{flexDirection: 'row', marginTop: 50}}>
                  <TextInput
                    style={{width: width - 50, borderBottomWidth: 0.2}}
                    placeholderTextColor="#000"
                    placeholder="Kunden E-Mail"
                    onChangeText={val => setExtraMail(val)}
                  />
                  <TouchableOpacity onPress={extraMailSend}>
                    <MaterialIcons
                      name="send"
                      size={25}
                      style={{marginTop: 10}}
                      color="#F11775"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginTop: 40}} onPress={closeModal}>
                  <LinearGradient
                    colors={['#FB6580', '#F11775']}
                    style={{
                      height: 50,
                      width: width - 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#ffff'}}>Kehre um</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Image source={require('../img/planeLight.png')} />
                <Text style={{fontSize: 22, color: '#000'}}>
                  Senden Sie sich
                </Text>
                <Text style={{fontSize: 22, color: '#000'}}>
                  zuerst eine E-Mail !
                </Text>
                <TouchableOpacity style={{marginTop: 40}} onPress={closeModal}>
                  <LinearGradient
                    colors={['#FB6580', '#F11775']}
                    style={{
                      height: 50,
                      width: width - 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#ffff'}}>Kehre um</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        ) : (
          <ImageBackground
            style={{flex: 1}}
            source={require('../img/error.png')}>
            {pdfURL !== null ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text style={{color: '#fff', fontSize: 22}}>Geben Sie die</Text>
                <Text style={{color: '#fff', fontSize: 22}}>
                  Kunden-E-Mail-Adresse ein
                </Text>
                <View style={{flexDirection: 'row', marginTop: 50}}>
                  <TextInput
                    style={{width: width - 50, borderBottomWidth: 0.2}}
                    placeholderTextColor="#FFFF"
                    placeholder="Kunden E-Mail"
                    onChangeText={val => setExtraMail(val)}
                  />
                  <TouchableOpacity onPress={extraMailSend}>
                    <MaterialIcons
                      name="send"
                      size={25}
                      style={{marginTop: 10}}
                      color="#F11775"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{marginTop: 40}} onPress={closeModal}>
                  <LinearGradient
                    colors={['#FB6580', '#F11775']}
                    style={{
                      height: 50,
                      width: width - 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#ffff'}}>Kehre um</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Image source={require('../img/plane.png')} />
                <Text style={{fontSize: 22, color: '#FFFF'}}>
                  Senden Sie sich
                </Text>
                <Text style={{fontSize: 22, color: '#FFFF'}}>
                  zuerst eine E-Mail !
                </Text>
                <TouchableOpacity style={{marginTop: 40}} onPress={closeModal}>
                  <LinearGradient
                    colors={['#FB6580', '#F11775']}
                    style={{
                      height: 50,
                      width: width - 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text style={{color: '#ffff'}}>Kehre um</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        )}
      </Modal>
      <View>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}>
          <Image source={secondIMG} resizeMode="contain" style={styles.img} />
        </ImageZoom>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => send()}>
        <LinearGradient
          colors={['#FB6580', '#F11775']}
          style={{
            height: 50,
            width: width - 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
            Senden
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => showModal()}>
        <LinearGradient
          colors={['#FFFF', '#FFFF']}
          style={{
            height: 50,
            width: width - 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <Text style={{color: '#000000', fontSize: 15}}>An Kunden Senden</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    backgroundColor: '#2D2C3C',
  },
  img: {
    flex: 1,
    marginTop: 200,
    alignSelf: 'center',
    width: '70%',
    height: '50%',
  },
  buttonText: {
    color: 'red',
  },
  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    backgroundColor: '#FFB13E',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
});
