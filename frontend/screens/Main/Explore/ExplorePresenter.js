import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import RoomCard from "../../../components/RoomCard";
import { ScrollView } from "react-native-gesture-handler";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

export default ({ rooms = [] }) => {
  console.log(rooms);
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingTop: 30 }}
        >
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              price={room.price}
              photos={room.photos}
              id={room.id}
              isFav={room.is_fav}
              isSuperHost={room.user.superhost}
            />
          ))}
        </ScrollView>
      )}
    </Container>
  );
};
