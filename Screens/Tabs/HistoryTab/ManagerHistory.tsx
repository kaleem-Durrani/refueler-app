import {
  View,
  Text,
  Image,
  VStack,
  ScrollView,
  HStack,
  Divider,
  Select,
  SelectInput,
  SelectTrigger,
  SelectIcon,
  SelectBackdrop,
  SelectContent,
  Icon,
  ChevronDownIcon,
  SelectPortal,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import HistoryCard from "./components/HistoryCard";
import FilterText from "./components/FilterText";
import { PERCENT, COLORS } from "../../../Constants/Constants";
import { TouchableOpacity } from "react-native";

export default function ManagerHistory() {
  const [filter, setFilter] = useState("Today");

  const [showGraph, setShowGraph] = useState(true);

  return (
    <VStack flex={1} px={"$0"}>
      <View flexDirection="row" alignItems="center" justifyContent="center">
        <TouchableOpacity
          onPress={() => setShowGraph(!showGraph)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#38bdf8",
            marginLeft: "6%",
            paddingVertical: "2%",
            borderRadius: 100,
            elevation: 10,
          }}
        >
          {showGraph ? (
            <Text fontWeight="bold" color="white">
              Hide Graph
            </Text>
          ) : (
            <Text fontWeight="bold" color="white">
              Show Graph
            </Text>
          )}
        </TouchableOpacity>

        <Select flex={2} mx={"$3"} my={"$0"}>
          <SelectTrigger variant="rounded" size="md">
            <SelectInput placeholder="Select Employee" />
            <SelectIcon mr={"$3"}>
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <ScrollView showsVerticalScrollIndicator={false}>
                <SelectItem label="Jamil Khan" value="ux" />
                <SelectItem label="Asad Bhai" value="web" />
                <SelectItem label="Jabbar Ustad" value="web" />
                <SelectItem label="Agha zwan" value="web" />
                <SelectItem label="Aa bal zwan" value="web" />
                <SelectItem label="Employee 2" value="web" />
                <SelectItem label="Employee 2" value="web" />
                <SelectItem label="Employee 2" value="web" />
                <SelectItem label="Employee 2" value="web" />
              </ScrollView>
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>

      {showGraph ? (
        <View flex={4}>
          <Image
            w="$full"
            flex={1}
            alt="Refuel History Graph"
            source={require("../../../assets/images/download.png")}
            resizeMode="stretch"
          />
        </View>
      ) : null}

      <Divider my={"$1"} />
      <View flex={showGraph ? 1.4 : 1} mx={"$3"}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          flex={1}
          // bg={"white"}
          // elevation={5}
          borderRadius={10}
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

      <Divider mt={"$2"} />

      <VStack flex={8} px={"$3"} py={"$2"}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HistoryCard paymentBy={"cash"} />
          <HistoryCard paymentBy={"app"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"app"} />
          <HistoryCard paymentBy={"cash"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"card"} />
          <HistoryCard paymentBy={"cash"} />
          <HistoryCard paymentBy={"app"} />
          <HistoryCard paymentBy={"cash"} />
        </ScrollView>
      </VStack>
    </VStack>
  );
}
