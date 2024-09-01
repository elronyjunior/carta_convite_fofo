import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Alert, Modal, Text, TouchableHighlight, Animated } from 'react-native';
import emailjs from 'emailjs-com';

export default function App() {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scaleValue]);

  const sendEmail = (response) => {
    emailjs.send('EmailCartaFofa', 'template_13adchr', {
      from_name: 'Seu Amado(a)',
      to_name: 'Amanda',
      message: `A resposta recebida da carta foi: ${response}`,
    }, '3zeV9tyXDJ0Bc-ZFO') // Use seu User ID aqui
    .then((result) => {
      console.log('Email enviado:', result.text);
    }, (error) => {
      console.error('Erro ao enviar email:', error.text);
    });
  };

  const handleCardPress = () => {
    setCardFlipped(true);
    setModalVisible(true);
  };

  const handleResponse = (response) => {
    setModalVisible(false);
    if (response === "Sim") {
      Alert.alert('Que ótimo =D');
    } else if (response === "Não") {
      Alert.alert(`Você ${response} quer sair comigo ;-;`);
    }
    sendEmail(response); // Envia o e-mail com a resposta
    setCardFlipped(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCardPress}>
        <Animated.Image
          style={[styles.card, { transform: [{ scale: scaleValue }] }]}
          source={
            cardFlipped
              ? require('./assets/carta_aberta.png')
              : require('./assets/carta_fechada.png')
          }
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Quer sair comigo na quarta-feira?</Text>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={() => handleResponse('Sim')}
            >
              <Text style={styles.simButtonText}>Sim</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => handleResponse('Não')}
            >
              <Text style={styles.naoButtonText}>Não</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  card: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  simButtonText: {
    color: '#4094F6',
    fontSize: 18,
  },
  naoButtonText: {
    color: 'red',
    fontSize: 18,
  },
});
