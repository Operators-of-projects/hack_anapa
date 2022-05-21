import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Button, TextInput } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      } catch (error) {
        setText("Error with barcode");
      }
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleButtonClick = async () => {
    try {
      const resp = await axios.get("/api/vendors/");
      console.log(resp.data);
      alert("Code request", resp.status);
    } catch (error) {
      console.log("error");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      {/* <TextInput
        style={{
          height: 40,
          width: 120,
          textAlign: "center",
          borderTopRightRadius: 14,
          borderColor: "#000",
          borderWidth: 2,
        }}
        placeholder="Введите номер заказа"
        onChangeText={(newText) => setText(newText)}
        defaultValue={text}
      />
      <Button title="Сделать запрос" onPress={handleButtonClick} />

      <Text style={{ padding: 10, fontSize: 15 }}>Заказ: {text}</Text> */}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const Text = styled.Text``;
