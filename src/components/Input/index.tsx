import React from "react";
import { Container } from "./styles";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import { TextInput } from "react-native";

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>;
}

export const Input = ({ inputRef, ...rest }: InputProps) => {
  const { COLORS } = useTheme();

  return (
    <Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
};
