import {
  VStack,
  Text,
  SafeAreaView,
  ScrollView,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  AccordionTitleText,
  AccordionContentText,
  AccordionIcon,
  Divider,
} from "@gluestack-ui/themed";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ChevronUpIcon, ChevronDownIcon } from "@gluestack-ui/themed";
import { NetworkStatusBadge } from "../../../components/NetworkStatusBadge";

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
      question: "How can I find a participating gas station?",
      answer:
        "You can find a participating gas station by searching for them in the app or by using the gas station locator feature.",
    },
  ];

  return (
    <SafeAreaView flex={1}>
      <NetworkStatusBadge />
      <VStack style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <ScrollView style={styles.formContainer}>
          <Accordion
            size="md"
            variant="filled"
            type="single"
            isCollapsible={true}
            isDisabled={false}
          >
            {faqs.map((faq, index) => (
              <React.Fragment key={index}>
                <AccordionItem value={faq.question}>
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => {
                        return (
                          <>
                            <AccordionTitleText>
                              {faq.question}
                            </AccordionTitleText>
                            {isExpanded ? (
                              <AccordionIcon as={ChevronUpIcon} ml="$3" />
                            ) : (
                              <AccordionIcon as={ChevronDownIcon} ml="$3" />
                            )}
                          </>
                        );
                      }}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>{faq.answer}</AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
                {index < faqs.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Accordion>
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
});
