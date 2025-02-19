import { Header } from "@/components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HighLight } from "@/components/HighLight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Alert, FlatList } from "react-native";
import { useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { ListEmpty } from "@/components/ListEmpty";
import { Button } from "@/components/Button";
import { useRoute } from "@react-navigation/native";
import { AppError } from "@/utils/AppError";
import { playerAddByGroup } from "@/storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@/storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO";

interface RouteParams {
  group: string;
}

export const Players = () => {
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  const route = useRoute();

  const { group } = route.params as RouteParams;

  const handleTeamSelect = (team: string) => {
    setTeam(team);
  };

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Nova Pessoa",
        "Informe o nome da pessoa para adicionar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message);
      } else {
        Alert.alert(
          "Nova Pessoa",
          "Não foi possível adicionar uma nova pessoa."
        );
        console.log(error);
      }
    }
  };

  const fetchPlayersByTeam = async () => {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Nao foi possivel carregar as pessoas filtradas do time selecionado."
      );
    }
  };

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => handleTeamSelect(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time" />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover turma" type="SECONDARY" />
    </Container>
  );
};
