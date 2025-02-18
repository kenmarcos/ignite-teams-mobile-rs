import { Header } from "@/components/Header";
import { Container, Content, Icon } from "./styles";
import { Button } from "@/components/Button";
import { HighLight } from "@/components/HighLight";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@/storage/group/groupCreate";

export const NewGroup = () => {
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  const handleNew = async () => {
    try {
      await groupCreate(group);
      navigation.navigate("players", { group });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />

        <HighLight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
};
