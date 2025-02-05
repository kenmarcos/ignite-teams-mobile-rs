import { Header } from "@/components/Header";
import { Container } from "./styles";
import { HighLight } from "@/components/HighLight";
import { GroupCard } from "@/components/GroupCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@/components/ListEmpty";
import { Button } from "@/components/Button";

export function Groups() {
  const [groups, setGroups] = useState(["Galera da Rocketseat"]);

  return (
    <Container>
      <Header />

      <HighLight title="Turmas" subtitle="Jogue com a sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button title="Criar nova turma" />
    </Container>
  );
}
