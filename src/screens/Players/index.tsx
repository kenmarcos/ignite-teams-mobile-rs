import { Header } from "@/components/Header";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { HighLight } from "@/components/HighLight";
import { ButtonIcon } from "@/components/ButtonIcon";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Alert, FlatList, Keyboard, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { PlayerCard } from "@/components/PlayerCard";
import { ListEmpty } from "@/components/ListEmpty";
import { Button } from "@/components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppError } from "@/utils/AppError";
import { addPlayerByGroup } from "@/storage/player/addPlayerByGroup";
import { playersGetByGroupAndTeam } from "@/storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@/storage/player/PlayerStorageDTO";
import { removePlayerByGroup } from "@/storage/player/removePlayerByGroup";
import { removeGroup } from "@/storage/group/removeGroup";
import { Loading } from "@/components/Loading";

interface RouteParams {
  group: string;
}

export const Players = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const newPlayerNameInputRef = useRef<TextInput>(null);

  const route = useRoute();
  const navigation = useNavigation();

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
      await addPlayerByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      Keyboard.dismiss(); // fecha o teclado

      setNewPlayerName("");
      fetchPlayersByTeam();
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
      setIsLoading(true);

      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Nao foi possivel carregar as pessoas filtradas do time selecionado."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await removePlayerByGroup(playerName, group);

      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remover pessoas",
        "Nao foi possivel remover a pessoa selecionada."
      );
    }
  };

  const onRemoveGroup = async () => {
    try {
      await removeGroup(group);

      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover turma", "Nao foi possivel remover a turma.");
    }
  };

  const handleRemoveGroup = async () => {
    Alert.alert("Remover turma", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: onRemoveGroup },
    ]);
  };

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />

      <HighLight title={group} subtitle="Adicione a galera e separe os times" />

      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          inputRef={newPlayerNameInputRef}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handleRemovePlayer(item.name)}
            />
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
      )}

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleRemoveGroup}
      />
    </Container>
  );
};
