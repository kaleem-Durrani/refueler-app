import {
  View,
  Text,
  Image,
  VStack,
  ScrollView,
  HStack,
  Divider,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import HistoryCard from "./components/HistoryCard";
import FilterText from "./components/FilterText";

export default function RefuelerHistory() {
  const [filter, setFilter] = useState("Today");

  return (
    <VStack flex={1} px={"$0"}>
      <View flex={4} bg={"gray"}>
        <Image
          w="$full"
          flex={1}
          alt="Refuel History Graph"
          source={require("../../../assets/images/download.png")}
          resizeMode="cover"
        />
      </View>
      <Divider />
      <View flex={1.4} mx={"$3"} bg={"white"} my={"$2"} borderRadius={10}>
        <ScrollView
          borderRadius={10}
          // bg={"white"}
          // elevation={5}
          contentContainerStyle={{ alignItems: "center" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          flex={1}
        >
          <FilterText
            onPress={() => setFilter("Today")}
            filter={filter}
            text={"Today"}
          />
          <FilterText
            onPress={() => setFilter("This Week")}
            filter={filter}
            text={"This Week"}
          />
          <FilterText
            onPress={() => setFilter("This Month")}
            filter={filter}
            text={"This Month"}
          />
          <FilterText
            onPress={() => setFilter("3 Months")}
            filter={filter}
            text={"3 Months"}
          />
          <FilterText
            onPress={() => setFilter("6 Months")}
            filter={filter}
            text={"6 Months"}
          />
          <FilterText
            onPress={() => setFilter("This Year")}
            filter={filter}
            text={"This Year"}
          />
          <FilterText
            onPress={() => setFilter("2 Years")}
            filter={filter}
            text={"2 Years"}
          />
          <FilterText
            onPress={() => setFilter("All time")}
            filter={filter}
            text={"All time"}
          />
        </ScrollView>
      </View>

      <Divider />

      <VStack flex={8} px={"$3"} py={"$2"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HistoryCard paymentBy={"cash"} />
          <HistoryCard paymentBy={"app"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"cash"} />
          <HistoryCard paymentBy={"app"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"cash"} />
        </ScrollView>
      </VStack>
    </VStack>
  );
}
