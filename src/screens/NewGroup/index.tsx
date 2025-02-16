import { Header } from "@/components/Header";
import { Container, Content, Icon } from "./styles";
import { Button } from "@/components/Button";
import { HighLight } from "@/components/HighLight";
import { Input } from "@/components/Input";
import { useNavigation } from "@react-navigation/native";

export const NewGroup = () => {
  const navigation = useNavigation();

  const handleNew = () => {
    navigation.navigate("players", { group: "Teste" });
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

        <Input placeholder="Nome da turma" />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
};
