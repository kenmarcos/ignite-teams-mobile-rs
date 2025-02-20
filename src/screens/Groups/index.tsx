import { Header } from "@/components/Header";
import { Container } from "./styles";
import { HighLight } from "@/components/HighLight";
import { GroupCard } from "@/components/GroupCard";
import { useCallback, useState } from "react";
import { Alert, FlatList } from "react-native";
import { ListEmpty } from "@/components/ListEmpty";
import { Button } from "@/components/Button";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { fetchGroups } from "@/storage/group/fetchGroups";
import { Loading } from "@/components/Loading";

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState(["Galera da Rocketseat"]);
  const navigation = useNavigation();

  const handleNewGroup = () => {
    navigation.navigate("new");
  };

  const fetchAllGroups = async () => {
    try {
      setIsLoading(true);

      const data = await fetchGroups();

      setGroups(data);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Turmas", "Nao foi possivel carregar as turmas.");
    }
  };

  const handleOpenGroup = (group: string) => {
    navigation.navigate("players", { group });
  };

  useFocusEffect(
    useCallback(() => {
      fetchAllGroups();
    }, [])
  );

  return (
    <Container>
      <Header />

      <HighLight title="Turmas" subtitle="Jogue com a sua turma" />
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Que tal cadastrar a primeira turma?" />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Button title="Criar nova turma" onPress={handleNewGroup} />
    </Container>
  );
}
