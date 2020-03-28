import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  Linking
} from "react-native";
import * as MailComposer from "expo-mail-composer";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;
  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso "${
    incident.title
  }" com o valor de ${asCurrency(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendEmail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsApp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  function asCurrency(value) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity style={styles.detailsButton} onPress={navigateBack}>
          <Text style={styles.detailsButtonText}></Text>
          <Feather name="arrow-left" size={28} color="#E02041"></Feather>
        </TouchableOpacity>
      </View>

      <FlatList
        data={[1]}
        keyExtractor={incident => String(incident)}
        showsVerticalScrollIndicator={false}
        renderItem={() => (
          <View>
            <View style={styles.incident}>
              <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
                ONG:
              </Text>
              <Text style={styles.incidentValue}>
                {incident.name} de {incident.city}/{incident.uf}
              </Text>

              <Text style={styles.incidentProperty}>CASO:</Text>
              <Text style={styles.incidentValue}>{incident.title}</Text>

              <Text style={styles.incidentProperty}>VALOR:</Text>
              <Text style={styles.incidentValue}>
                {asCurrency(incident.value)}
              </Text>
            </View>

            <View style={styles.contactBox}>
              <Text style={styles.heroTitle}>Salve o dia!</Text>
              <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

              <Text style={styles.heroDescription}>Entre em contato:</Text>

              <View style={styles.actions}>
                <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                  <Text style={styles.actionText}>WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.action} onPress={sendEmail}>
                  <Text style={styles.actionText}>E-mail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
