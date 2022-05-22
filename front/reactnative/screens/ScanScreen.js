import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, Button, TextInput, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import { baseUrl } from "../config";

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

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const response = await axios.post(baseUrl + `/api/transaction-to-done/`, { transaction_id: data, client_id: 1})
    this.props.setModal({
      message:
        "Заказ подтвержден, ожидайте продавца",
      icon: "checkmark-outline",
      iconColor: "green",
    });
    await sleep(2500);
    this.props.resetModal();
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const handleButtonClick = async () => {
    try {
      const response = await axios.post(baseUrl + `/api/transaction-to-done/`, { transaction_id: text, client_id: 1})
      console.log(resp.data);
      this.props.setModal({
        message:
          "Заказ подтвержден, ожидайте продавца",
        icon: "checkmark-outline",
        iconColor: "green",
      });
      await sleep(2500);
      this.props.resetModal();
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
    <RootContainer>
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      
      {/* <Text style={{ padding: 10, fontSize: 15 }}>Заказ: {text}</Text> */}
    </Container>
    <Fallback>
    <TextInputStyled
      placeholder="Введите номер заказа вручную при неработающем QRCode"
      onChangeText={(newText) => setText(newText)}
      defaultValue={text}
    />
    <Button title="Отправить" onPress={handleButtonClick}>Отправить</Button>
    </Fallback>
    </RootContainer>
  );
}

const RootContainer = styled.View`
  flex: 1;
`

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
`;

const Fallback = styled.View`
  /* align-self: flex-end; */
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.8)
`

const TextInputStyled = styled.TextInput`
  padding: 5px;
`

const Text = styled.Text``;
