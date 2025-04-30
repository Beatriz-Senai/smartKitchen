import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const alturaStatusBar = StatusBar.currentHeight;
const KEY_GEMINI = 'AIzaSyCxQOFEEimS1xMqke3jZz5zAOs4_pdtntI'; // Substitua pela sua chave de API
const genAI = new GoogleGenerativeAI(KEY_GEMINI);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: "text/plain",
};

export default function App() {

  const [load, setLoad] = useState(false);
  const [viagens, setViagens] = useState("");
  const [pref1, setPref1] = useState("");
  const [pref2, setPref2] = useState("");
  const [pref3, setPref3] = useState("");
  const [pref4, setPref4] = useState("");
  const [transporte, setTransporte] = useState("");

  async function gerarViagens() {
    if (pref1 === "" || pref2 === "" || pref3 === "" || pref4 === "" || transporte === "") {
      Alert.alert("Atenção", "Informe suas preferências para procurarmos uma viagem perfeita para você!", [{ text: "Ok" }]);
      return;
    }
    setViagens("");
    setLoad(true);
    Keyboard.dismiss();

    const prompt = `Sugira uma viagem de ${transporte} para um lugar bem legal utilizando as seguintes preferências e gostos: ${pref1}, ${pref2}, ${pref3} e ${pref4}. Caso encontre um vídeo interessante no YouTube sobre o lugar, informe o link.`;

    try {
      const chatSession = model.startChat({
        generationConfig,
        history: [],
      });

      const result = await chatSession.sendMessage(prompt);
      setViagens(result.response.text());
    } catch (error) {
      console.error(error);
    } finally {
      setLoad(false);
    }
  }

  return (
    <View style={ESTILOS.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={ESTILOS.header}>Viagem perfeita!</Text>
      <View style={ESTILOS.form}>
        <Text style={ESTILOS.label}>Insira suas preferências sobre a viagem:</Text>
        <TextInput
          placeholder="Temperatura do lugar (frio, neve, chuva etc)"
          style={ESTILOS.input}
          value={pref1}
          onChangeText={(texto) => setPref1(texto)}
        />
        <TextInput
          placeholder="Gastronomia do lugar (picante, agridoce etc)"
          style={ESTILOS.input}
          value={pref2}
          onChangeText={(texto) => setPref2(texto)}
        />
        <TextInput
          placeholder="Valor máximo da viagem"
          style={ESTILOS.input}
          value={pref3}
          onChangeText={(texto) => setPref3(texto)}
        />
        <TextInput
          placeholder="Preferências de passeio (passeio em família, passeio de casal etc)"
          style={ESTILOS.input}
          value={pref4}
          onChangeText={(texto) => setPref4(texto)}
        />
        <TextInput
          placeholder="Meio de transporte que prefere usar na viagem"
          style={ESTILOS.input}
          value={transporte}
          onChangeText={(texto) => setTransporte(texto)}
        />
      </View>

      <TouchableOpacity style={ESTILOS.button} onPress={gerarViagens}>
        <Text style={ESTILOS.buttonText}>Montar viagem perfeita</Text>
        <MaterialCommunityIcons name="airplane" size={24} color="#FFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
        {load && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Montando viagem perfeita...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {viagens && (
          <View style={ESTILOS.content}>
            <Text style={ESTILOS.title}>Sua viagem 👇</Text>
            <Text style={{ lineHeight: 24, color:'#fff' }}>{viagens}</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const ESTILOS = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#eec9d2',
      alignItems: 'center',
      paddingTop: 20,
    },
    header: {
      fontSize: 32,
      fontWeight: 'bold',
      paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54,
      color: '#bf103b'
    },
    form: {
      backgroundColor: '#FFF',
      width: '90%',
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    label: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 8,
      color:'#bf103b'
    },
    input: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: '#bf103b',
      padding: 8,
      fontSize: 16,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#bf103b',
      width: '90%',
      borderRadius: 8,
      flexDirection: 'row',
      padding: 14,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    buttonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold'
    },
    content: {
      backgroundColor: '#bf103b',
      padding: 16,
      width: '100%',
      marginTop: 16,
      borderRadius: 8,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 14,
      color:'#fff'
    },
    containerScroll: {
      width: '90%',
      marginTop: 8,
    },
  });