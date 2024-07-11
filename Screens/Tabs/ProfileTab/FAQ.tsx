import { VStack, Text, SafeAreaView, ScrollView } from "@gluestack-ui/themed";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function FAQ({ navigation }: any) {
  const faqs = [
    {
      question: "What is Pakfuel?",
      answer:
        "Pakfuel is a mobile app designed to transform the way fuel payments are made in Pakistan. It allows users to pay for fuel using their smartphones and offers features like dynamic loyalty programs, transaction tracking, and more.",
    },
    {
      question: "How do I use Pakfuel?",
      answer:
        "Simply download the app, sign up, and link your payment method. When you pull into a participating gas station, select the pump number, and authorize the payment through the app.",
    },
    {
      question: "Which payment methods are supported?",
      answer:
        "Pakfuel integrates with third-party gateways like Easypaisa and Jazzcash, giving users multiple payment options to choose from.",
    },
    {
      question: "Are there any rewards for using Pakfuel?",
      answer:
        "Yes! Pakfuel offers dynamic loyalty programs that allow users to earn points or discounts on fuel. Partnering gas stations can customize their loyalty programs to provide exclusive rewards and perks for frequent purchases.",
    },
    {
      question: "How secure is Pakfuel?",
      answer:
        "Pakfuel uses advanced security measures to ensure that your payment information is safe and secure. Your transactions are encrypted, and the app does not store sensitive payment details.",
    },
    {
      question: "Can I track my fuel transactions?",
      answer:
        "Yes, Pakfuel allows users to track their fuel transactions and vehicle mileage, providing valuable insights into their driving habits and helping them maintain their cars better.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "If you have any issues or questions, you can contact our customer support through the app or visit our website for more information.",
    },
  ];

  return (
    <SafeAreaView flex={1}>
      <VStack style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <ScrollView style={styles.formContainer}>
          {faqs.map((faq, index) => (
            <VStack key={index} style={styles.faqItem}>
              <Text style={styles.question}>{faq.question}</Text>
              <Text style={styles.answer}>{faq.answer}</Text>
            </VStack>
          ))}
        </ScrollView>
      </VStack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.tertiary,
    padding: "5%",
  },
  title: {
    marginTop: "20%",
    alignSelf: "center",
    color: "white",
    fontSize: PERCENT[10],
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
  },
  backButton: {
    position: "absolute",
    top: PERCENT[8],
    left: PERCENT[4],
    padding: "2%",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: PERCENT[10],
    padding: "8%",
    elevation: 10,
    marginTop: "10%",
  },
  faqItem: {
    marginBottom: "5%",
    paddingBottom: "10%",
  },
  question: {
    fontWeight: "bold",
    fontSize: PERCENT[5],
    marginBottom: "2%",
  },
  answer: {
    fontSize: PERCENT[4],
    color: "gray",
  },
});
