import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";
import RoomCard from "../../../components/RoomCard";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../colors";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-horizontal: 15px;
`;

const FakeBar = styled.View`
  height: 40px;
  width: 100%;
  background-color: white;
  margin: 80px 0px 15px 0px;
  box-shadow: 10px 5px 5px red;
  border-radius: 12px;
  justify-content: center;
  padding-left: 10px;
`;

const FakeText = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

const LoadMore = styled.View`
  width: 100%;
  padding: 10px 10px;
  align-items: center;
  background-color: ${colors.green};
  border-radius: 5px;
  margin-bottom: 30px;
`;

const LoadMoreText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

export default ({ rooms, increasePage }) => {
  return (
    <Container>
      {rooms.length === 0 ? (
        <ActivityIndicator color={"black"} />
      ) : (
        <>
          <FakeBar>
            <FakeText>Search...</FakeText>
          </FakeBar>
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
                roomObj={room}
              />
            ))}
            <TouchableOpacity onPress={increasePage}>
              <LoadMore>
                <LoadMoreText>Load More</LoadMoreText>
              </LoadMore>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}
    </Container>
  );
};
