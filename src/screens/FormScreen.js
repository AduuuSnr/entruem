import React, {useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import SignatureCapture from 'react-native-signature-capture';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import StyledTextInput from '../components/StyledTextInput';
import StyledCheck from '../components/StyledCheck';

const {width, height} = Dimensions.get('window');

const FormScreen = ({navigation}) => {
  const {name, background} = useSelector(state => state.theme);

  const [kundenname, setKundenname] = useState('');
  const [ansprechpartner, setAnsprechpartner] = useState('');
  const [adresse, setAdresse] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [datum, setDatum] = useState('');
  const [arbeitsaufwand, setArbeitsaufwand] = useState('');
  const [entsorgungskosten, setEntsorgungskosten] = useState('');
  const [wertgegenrechnung, setWertgegenrechnung] = useState('');
  const [gutschein, setGutschein] = useState('');
  const [gesamtpreisNetto, setGesamtpreisNetto] = useState('');
  const [anzahlung, setAnzahlung] = useState('');
  const [jaNein1, setJaNein1] = useState(false);
  const [jaNein2, setJaNein2] = useState(false);
  const [jaNein3, setJaNein3] = useState(false);
  const [jaNein4, setJaNein4] = useState(false);
  const [jaNein5, setJaNein5] = useState(false);
  const [sonstiges1, setSonstiges1] = useState('');
  const [sonstiges2, setSonstiges2] = useState('');
  const [sonstiges3, setSonstiges3] = useState('');
  const [sonstiges4, setSonstiges4] = useState('');
  const [beginAm, setBeginAm] = useState('');
  const [stockwerk, setStockwerk] = useState('');
  const [anzahlDerRaumeGesamt, setAnzahlDerRaumeGesamt] = useState('');
  const [schlusselUbernommen, setSchlusselUbernommen] = useState('');
  const [signatureLeft, setSignatureLeft] = useState(null);
  const [signatureRight, setSignatureRight] = useState(null);

  const [image, setImage] = useState(null);

  const signatureLeftRef = useRef(null);
  const signatureRightRef = useRef(null);

  const onSaveSignatureLeft = res => setSignatureLeft(res.encoded);
  const onSaveSignatureRight = res => setSignatureRight(res.encoded);

  const onPress = () => {
    signatureLeftRef.current.saveImage();
    signatureRightRef.current.saveImage();

    const apiUrl = 'https://seyfisonercetin.com/api/deneme.php';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/json',
      },
      body: JSON.stringify({
        kundenname,
        ansprechpartner,
        adresse,
        tel,
        email,
        datum,
        arbeitsaufwand,
        entsorgungskosten,
        wertgegenrechnung,
        gutschein,
        gesamtpreisNetto,
        anzahlung,
        janein1: jaNein1,
        janein2: jaNein2,
        janein3: jaNein3,
        janein4: jaNein4,
        janein5: jaNein5,
        sonstiges1,
        sonstiges2,
        sonstiges3,
        sonstiges4,
        beginnAm: beginAm,
        stockwerk,
        anzahlDerRaumeGesamt,
        schlusselUbernommen,
        signatureLeft,
        signatureRight,
      }),
    })
      .then(res => res.text())
      .then(text => {
        const ii = 'data:image/jpeg;base64, ' + text;
        navigation.navigate('ResultScreen', {image: ii, kundenname, email});
      })
      .catch(error => console.error(error));
  };

  const resetRightSign = () => {
    signatureRightRef.current.resetImage();
  };
  const resetLeftSign = () => {
    signatureLeftRef.current.resetImage();
  };

  const inlineStyles = {
    container: {backgroundColor: background},
    leftSignText: name === 'light' ? '#ffff' : '#7477A0',
  };

  return (
    <ScrollView style={[styles.container, inlineStyles.container]}>
      <View style={{marginTop: 20}}>
        <StyledTextInput
          placeholder="Kundenname"
          value={kundenname}
          onChangeText={value => setKundenname(value)}
        />
      </View>
      <StyledTextInput
        placeholder="Ansprechpartner"
        value={ansprechpartner}
        onChangeText={value => setAnsprechpartner(value)}
      />
      <StyledTextInput
        placeholder="Adresse"
        value={adresse}
        onChangeText={value => setAdresse(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Tel"
        value={tel}
        onChangeText={value => setTel(value)}
      />
      <StyledTextInput
        placeholder="E-Mail"
        value={email}
        onChangeText={value => setEmail(value)}
      />
      <StyledTextInput
        placeholder="Datum"
        value={datum}
        onChangeText={value => setDatum(value)}
      />
      <StyledTextInput
        placeholder="Arbeitsaufwand"
        value={arbeitsaufwand}
        onChangeText={value => setArbeitsaufwand(value)}
      />
      <StyledTextInput
        placeholder="Entsorgungskosten"
        value={entsorgungskosten}
        onChangeText={value => setEntsorgungskosten(value)}
      />
      <StyledTextInput
        placeholder="Wertgegenrechnung"
        value={wertgegenrechnung}
        onChangeText={value => setWertgegenrechnung(value)}
      />
      <StyledTextInput
        placeholder="Gutschein"
        value={gutschein}
        onChangeText={value => setGutschein(value)}
      />
      <StyledTextInput
        placeholder="Gesamtpreis Netto"
        value={gesamtpreisNetto}
        onChangeText={value => setGesamtpreisNetto(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Anzahlung"
        value={anzahlung}
        onChangeText={value => setAnzahlung(value)}
      />
      <StyledCheck
        label="Demontage Küche"
        value={jaNein1}
        onValueChange={() => setJaNein1(!jaNein1)}
      />
      <StyledCheck
        label="Installateur erforderlich"
        value={jaNein2}
        onValueChange={() => setJaNein2(!jaNein2)}
      />
      <StyledCheck
        label="Keller / Dachboden"
        value={jaNein3}
        onValueChange={() => setJaNein3(!jaNein3)}
      />
      <StyledCheck
        label="Container 10 / 15 / 20 / 30 m3"
        value={jaNein4}
        onValueChange={() => setJaNein4(!jaNein4)}
      />
      <StyledCheck
        label="Erwernisse (enges Treppenhaus, Zugang zum Auto mehr als 20m entfernt)"
        value={jaNein5}
        onValueChange={() => setJaNein5(!jaNein5)}
      />
      <StyledTextInput
        placeholder="Sonstiges1"
        value={sonstiges1}
        onChangeText={value => setSonstiges1(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Sonstiges2"
        value={sonstiges2}
        onChangeText={value => setSonstiges2(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Sonstiges3"
        value={sonstiges3}
        onChangeText={value => setSonstiges3(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Sonstiges4"
        value={sonstiges4}
        onChangeText={value => setSonstiges4(value)}
        multiline={true}
      />
      <StyledTextInput
        placeholder="Beginn Am"
        value={beginAm}
        onChangeText={value => setBeginAm(value)}
      />
      <StyledTextInput
        placeholder="Stockwerk"
        value={stockwerk}
        onChangeText={value => setStockwerk(value)}
      />
      <StyledTextInput
        placeholder="Anzahl der Räume Gesamt"
        value={anzahlDerRaumeGesamt}
        onChangeText={value => setAnzahlDerRaumeGesamt(value)}
      />
      <StyledTextInput
        placeholder="Schlüssel übernommen"
        value={schlusselUbernommen}
        onChangeText={value => setSchlusselUbernommen(value)}
      />

      {/* Left Signature */}
      <Text style={[styles.leftSignText, inlineStyles.leftSignText]}>
        Auftragnehmer Bünyamin Akyildiz e.U.
      </Text>
      <View style={styles.signatureRightView}>
        <View style={{borderColor: 'black', borderWidth: 1}}>
          <SignatureCapture
            style={styles.signatureLeft}
            ref={signatureLeftRef}
            onSaveEvent={onSaveSignatureLeft}
            saveImageFileInExtStorage={false}
            showTitleLabel={true}
            backgroundColor="white"
            strokeColor="black"
            minStrokeWidth={7}
            maxStrokeWidth={7}
            maxSize={280}
            viewMode={'portrait'}
            showNativeButtons={true}
          />
        </View>
      </View>
      <Text style={[styles.leftSignText, inlineStyles.leftSignText]}>
        Zum Zeichen der Annahme des Vertragsanbots: Auftraggeber
      </Text>
      <View style={styles.signatureRightView}>
        <View style={{borderColor: 'black', borderWidth: 1}}>
          <SignatureCapture
            style={styles.signatureRight}
            ref={signatureRightRef}
            onSaveEvent={onSaveSignatureRight}
            saveImageFileInExtStorage={false}
            showTitleLabel={false}
            showBorder={true}
            backgroundColor="white"
            strokeColor="black"
            minStrokeWidth={7}
            maxStrokeWidth={7}
            maxSize={280}
            viewMode={'portrait'}
            showNativeButtons={true}
          />
        </View>
      </View>

      <TouchableOpacity style={{marginTop: 20}} onPress={onPress}>
        <LinearGradient
          colors={['#F11775', '#FB6580']}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.buttonText}>Mach weiter</Text>
        </LinearGradient>
      </TouchableOpacity>
      {/* Show All */}
      <TouchableOpacity
        style={{marginTop: 10}}
        onPress={() => navigation.navigate('ListScreen')}>
        <LinearGradient
          colors={['#FFFFFF', '#FFFFFF']}
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#2D2C3C',
            borderWidth: 1,
            borderRadius: 10,
            flexDirection: 'row',
          }}>
          <MaterialIcons name="picture-as-pdf" size={25} color="#1F1E2C" />
          <Text style={styles.buttonText2}>Gespeicherte PDFs</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#2D2C3C',
  },
  acceptButton: {
    marginVertical: 16,
  },
  signatureRightView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signatureRight: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 20,
    width: width - 50,
    height: height * 0.25,
  },
  signatureLeft: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
    width: width - 50,
    height: height * 0.25,
  },
  buttonStyle: {
    width: 50,
    height: 40,
    marginLeft: 80,
    marginRight: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonText2: {
    color: '#1F1E2C',
    fontSize: 16,
  },
  leftSignText: {
    marginVertical: 10,
    color: '#7477A0',
  },
});

export default FormScreen;
