import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNRestart from 'react-native-restart';
import LinearGradient from 'react-native-linear-gradient';

const modalInitialState = {visible: false, data: {}};
const {width, height} = Dimensions.get('window');

const ListScreen = () => {
  /** data Model
   * id: integer | string
   * kundenname: string
   * email: string
   * form_path: string
   */
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(modalInitialState);
  const [download, setDownload] = useState(null);
  const [search, setSearch] = useState([]);
  const [text, setText] = useState('');

  const {name, background} = useSelector(state => state.theme);

  const navigation = useNavigation();

  const fetchAPI = () => {
    const apiUrl = 'https://seyfisonercetin.com/api/pdf-mail/all-pdf-flies.php';
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        setSearch(json.data);
        // console.log(json.data);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const searchData = text => {
    const newData = search.filter(item => {
      const itemData = item.kundenname.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
    setText(text);
  };

  const source = {
    uri: `http://docs.google.com/gview?embedded=true&url=https://https://seyfisonercetin.com/api/pdf-mail/pdf-files/${modal.data?.form_path}`,
    cacheEnabled: true,
  };

  const showModal = pdfId => {
    const newPdfData = data.filter(item => item.id == pdfId)[0];
    setModal({data: newPdfData, visible: true});
  };

  const closeModal = () => setModal(modalInitialState);

  const inlineStyles = {
    container: {backgroundColor: background},
    leftSignText: name === 'light' ? '#000' : '#7477A0',
    flatlistContainerStyle: {backgroundColor: '#fff'},
    buttonContainer: {backgroundColor: '#d8d8d8'},
    kundennameText: {color: 'black'},
  };

  const PDFDownload = () => {
    setDownload({
      uri: `https://https://seyfisonercetin.com/api/pdf-mail/pdf-files/${modal.data?.form_path}`,
    });
  };
  return (
    <View style={[styles.container, inlineStyles.container]}>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" color="grey" size={25} />
        <TextInput
          style={styles.textInput}
          onChangeText={text => searchData(text)}
          value={text}
          underlineColorAndroid="transparent"
          placeholder="Kundennamen suchen"
          placeholderTextColor="grey"
        />
      </View>
      <FlatList
        data={data.sort((a, b) => b.id - a.id)}
        contentContainerStyle={[
          styles.flatlistContainerStyle,
          inlineStyles.flatlistContainerStyle,
        ]}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => showModal(item.id)}
              style={[styles.buttonContainer, inlineStyles.buttonContainer]}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  flex: 1,
                }}>
                <Text
                  style={[styles.kundennameText, inlineStyles.kundennameText]}>
                  {item.kundenname}
                </Text>
              </View>
              <View
                style={{
                  borderWidth: 0.3,
                  borderRadius: 50,
                  backgroundColor: '#2B2A39',
                  marginRight: 20,
                }}>
                <MaterialIcons name="chevron-right" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
      <LinearGradient
        colors={['#65BFFB', '#1A24F1']}
        style={{
          borderRadius: 10,
          width: width - 50,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        <TouchableOpacity
          onPress={() => RNRestart.Restart()}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
            Erstelle neu
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modal.visible}>
        <TouchableOpacity
          onPress={closeModal}
          activeOpacity={0.5}
          style={{
            position: 'absolute',
            right: 4,
            top: 8,
            zIndex: 1000,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialIcons name="close" size={36} color="red" />
        </TouchableOpacity>
        <WebView source={source} style={{}} />
        {download && (
          <WebView source={download} containerStyle={{display: 'none'}} />
        )}
        <TouchableOpacity
          style={{position: 'absolute', top: 20, left: 20}}
          onPress={PDFDownload}>
          <MaterialIcons name="save" size={36} color="red" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  flatlistContainerStyle: {
    flexGrow: 1,
    backgroundColor: '#2D2C3C',
    marginTop: 20,
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 40,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B0B15',
    flexDirection: 'row',
    marginBottom: 20,
    height: 50,
  },
  kundennameText: {
    color: '#FFFF',
    fontSize: 13,
    marginLeft: 20,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  textInput: {
    alignSelf: 'center',
    height: 42,
    width: width - 50,
    borderBottomWidth: 0.5,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
});
export default ListScreen;
