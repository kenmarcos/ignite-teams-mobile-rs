import React from "react";
import { Container, Icon } from "./styles";
import { Title } from "../HighLight/styles";
import { TouchableOpacityProps } from "react-native";

interface GroupCardProps extends TouchableOpacityProps {
  title: string;
}

export const GroupCard = ({ title, ...rest }: GroupCardProps) => {
  return (
    <Container {...rest}>
      <Icon />

      <Title>{title}</Title>
    </Container>
  );
};
