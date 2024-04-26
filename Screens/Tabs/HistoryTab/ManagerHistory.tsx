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
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import HistoryCard from "./components/HistoryCard";
import FilterText from "./components/FilterText";
import { PERCENT, COLORS } from "../../../Constants/Constants";

export default function RefuelerHistory() {
  return (
    <VStack flex={1} px={"$0"}>
      <Select mx={"$3"} mb={"$2"}>
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
              <Divider />
              <SelectItem label="Asad Bhai" value="web" />
              <Divider />
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
      <View flex={1.4} mx={"$3"}>
        <ScrollView
          contentContainerStyle={{ alignItems: "center" }}
          horizontal
          showsHorizontalScrollIndicator={false}
          flex={1}
        >
          <FilterText text={"Today"} />
          <FilterText text={"This Week"} />
          <FilterText text={"This Month"} />
          <FilterText text={"3 Months"} />
          <FilterText text={"6 Months"} />
          <FilterText text={"This Year"} />
          <FilterText text={"2 Years"} />
          <FilterText text={"All time"} />
        </ScrollView>
      </View>

      <Divider />

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
