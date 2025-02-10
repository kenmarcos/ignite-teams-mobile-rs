import React from "react";
import { Container, Icon, Name } from "./styles";
import { ButtonIcon } from "../ButtonIcon";

interface PlayerCardProps {
  name: string;
  onRemove: () => void;
}

export const PlayerCard = ({ name, onRemove }: PlayerCardProps) => {
  const handleRemove = () => {
    onRemove();
  };

  return (
    <Container>
      <Icon name="person" />

      <Name>{name}</Name>

      <ButtonIcon icon="close" type="SECONDARY" onPress={handleRemove} />
    </Container>
  );
};
