import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import Header from '../components/Header';
import { launchImageLibrary, launchCamera  } from 'react-native-image-picker';

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [avatar, setAvatar] = useState('https://via.placeholder.com/100');
  const [imageUri, setImageUri] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const openImagePicker = () => {
    Alert.alert(
      'Selecionar Imagem',
      'Escolha uma opção:',
      [
        {
          text: 'Galeria',
          onPress: () => selectFromGallery(),
        },
        {
          text: 'Câmera',
          onPress: () => openCamera(),
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };
  
  const selectFromGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0];
        setAvatar(source.uri);
        setImageUri(source.uri);
        setBase64Image(source.base64);
        setModalVisible(false);
      }
    });
  };
  
  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      cameraType: 'back',
      includeBase64: true,
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        const source = response.assets[0];
        setAvatar(source.uri);
        setImageUri(source.uri);
        setBase64Image(source.base64);
        setModalVisible(false);
      }
    });
  };
  const uploadImage = async () => {
    if (!imageUri) {
      Alert.alert("Erro", "Selecione uma imagem antes de fazer o upload.");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', {
      uri: imageUri,
      name: 'avatar.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await fetch('BASE URI', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert("Sucesso", "Imagem enviada com sucesso!");
      } else {
        Alert.alert("Erro", result.message || "Falha ao enviar imagem.");
      }
    } catch (error) {
      console.error("Upload error: ", error);
      Alert.alert("Erro", "Erro ao enviar imagem.");
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.username}>Nome do Usuário</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>John</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Sobrenome:</Text>
          <Text style={styles.value}>Doe</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('ChangePasswordScreen')}
          >
            <Text style={styles.buttonText}>Alterar Senha</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.buttonText}>Alterar Avatar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {imageUri && (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.uploadButtonText}>Fazer Upload de Avatar</Text>
        </TouchableOpacity>
      )}

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Permite que o aplicativo THARSEO acesse o armazenamento interno?</Text>
            <TouchableOpacity style={styles.allowButton} onPress={openImagePicker}>
              <Text style={styles.allowButtonText}>Permitir</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.denyButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.denyButtonText}>Negar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080808',
    paddingHorizontal: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
  },
  value: {
    color: '#ccc',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  button: {
    backgroundColor: '#444',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
  },
  verificationCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 10,
  },
  verificationTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  verificationText: {
    color: '#ccc',
    marginBottom: 5,
  },
  verifyButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  allowButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  allowButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  denyButton: {
    backgroundColor: '#444',
    paddingVertical: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  denyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },


});
