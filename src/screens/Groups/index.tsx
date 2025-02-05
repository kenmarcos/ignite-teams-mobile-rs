import { Header } from "@/components/Header";
import { Container } from "./styles";
import { HighLight } from "@/components/HighLight";
import { GroupCard } from "@/components/GroupCard";
import { useState } from "react";
import { FlatList } from "react-native";

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
      />
    </Container>
  );
}
