import { Header } from "@/components/Header";
import { Container } from "./styles";
import { HighLight } from "@/components/HighLight";

export const Players = () => {
  return (
    <Container>
      <Header />

      <HighLight
        title="Nome da turma"
        subtitle="Adicione a galera e separe os times"
      />
    </Container>
  );
};
