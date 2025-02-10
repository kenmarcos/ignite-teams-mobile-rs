import { Header } from "@/components/Header";
import { Container, Form } from "./styles";
import { HighLight } from "@/components/HighLight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";

export const Players = () => {
  return (
    <Container>
      <Header />

      <HighLight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>
    </Container>
  );
};
