import { Header } from "@/components/Header";
import { Container } from "./styles";
import { HighLight } from "@/components/HighLight";
import { GroupCard } from "@/components/GroupCard";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { ListEmpty } from "@/components/ListEmpty";
import { Button } from "@/components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { groupsGetAll } from "@/storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState(["Galera da Rocketseat"]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const fetchGroups = async () => {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

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
        showsVerticalScrollIndicator={false}
      />

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
