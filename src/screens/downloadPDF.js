import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';

const downloadPDF = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://seyfisonercetin.com/api/pdf-mail/all-pdf-flies.php';
    fetch(apiUrl)
      .then(res => res.json())
      .then(json => {
        if (json.status === 'success') {
          setData(json.data);
        } else {
          console.log('Error!');
        }
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <View>
      {/* <WebView source={source} /> */}
      <WebView
        source={{
          uri: `https://seyfisonercetin.com/api/pdf-mail/pdf-files/${data?.form_path}`,
        }}
      />
    </View>
  );
};

export default downloadPDF;
