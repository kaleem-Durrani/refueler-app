import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  VStack,
  Pressable,
  Icon,
  TrashIcon,
  Switch,
  Divider,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  ModalFooter,
  Button,
  ButtonText,
} from "@gluestack-ui/themed";
import { COLORS } from "../../../../Constants/Constants";
import { FontAwesome } from "@expo/vector-icons";
import employeeApis from "../../../../api/employee";
import useApi from "../../../../hooks/useApi";
import MyToast from "../../../../components/MyToast";

export default function EmployeeSwitch(props: any) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const deleteEmployeeApi = useApi(employeeApis.deleteEmployee);
  const toast = MyToast();

  const handleDeleteEmployee = async () => {
    await deleteEmployeeApi.request(props.pumpId, props.email);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    if (deleteEmployeeApi.data) {
      toast.success(`Success`, `${deleteEmployeeApi.data.message}`);
      return;
    }
    if (deleteEmployeeApi.error) {
      console.log(deleteEmployeeApi.error);
      toast.error(`Error`, `${deleteEmployeeApi.error}`);
      return;
    }
  }, [deleteEmployeeApi.data, deleteEmployeeApi.error]);

  return (
    <HStack
      bg={"white"}
      borderRadius={10}
      mx={"$4"}
      my={"$1"}
      p={"$2"}
      elevation={5}
      alignItems="center"
    >
      <View flex={1} mr={12}>
        <Avatar bgColor={"$info400"} size="lg" borderRadius="$full">
          <AvatarFallbackText>{props.name}</AvatarFallbackText>
          <AvatarImage source={props.imageUrl} alt="Employee Image" />
        </Avatar>
      </View>
      <VStack flex={3}>
        {/* <HStack justifyContent="space-between"> */}
        <Text fontWeight="bold" color={COLORS.tertiary}>
          {props.name}
        </Text>
        <Text bold size="xs">
          {props.phoneNumber}
        </Text>
        <Text color="gray" size="xs">
          {props.email}
        </Text>
        {/* </HStack> */}
        <Divider />
        <Text color={"gray"} size="xs">
          Employee since {"\n" + props.createdAt.slice(0, 9)}
        </Text>
      </VStack>
      <View flex={1}>
        <HStack alignItems="center" space="md">
          <Pressable onPress={() => setShowDeleteModal(true)}>
            <FontAwesome name="trash-o" size={50} color="red" />
          </Pressable>
        </HStack>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        >
          <ModalBackdrop />
          <ModalContent>
            <ModalHeader>
              <Heading size="lg">Confirm Deletion</Heading>
            </ModalHeader>
            <ModalBody>
              <Text>
                Are you sure you want to delete this employee from the pump?
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                mr="$3"
                onPress={() => setShowDeleteModal(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button action="negative" onPress={handleDeleteEmployee}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </View>
    </HStack>
  );
}
