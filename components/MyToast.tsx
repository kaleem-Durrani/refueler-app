import {
  Toast,
  ToastDescription,
  ToastTitle,
  VStack,
  useToast,
} from "@gluestack-ui/themed";
import { useState } from "react";

interface ShowToast {
  (
    variant: "outline" | "solid" | "accent" | undefined,
    action: "error" | "warning" | "success" | "info" | "attention" | undefined,
    title: string,
    description: string,
    duration: number
  ): void;
}

interface ErrorToast {
  (title: string, description: string): void;
}

interface SuccessToast {
  (title: string, description: string): void;
}

const GlobalToast = () => {
  const toast = useToast();

  const show: ShowToast = (variant, action, title, description, duration) => {
    toast.show({
      placement: "top",
      duration: duration,
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action={action} variant={variant}>
            <VStack space="xs">
              <ToastTitle>{title}</ToastTitle>
              <ToastDescription>{description}</ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const error: ErrorToast = (title, text) => {
    show("accent", "error", title, text, 3000);
  };

  const success: SuccessToast = (title, text) => {
    show("accent", "success", title, text, 3000);
  };

  return { show, error, success };
};

export default GlobalToast;
