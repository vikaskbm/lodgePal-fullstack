import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import RoomPhotos from "./RoomPhotos";

const Container = styled.View`
  width: 100%;
  margin-bottom: 25px;
  align-items: flex-start;
  position: relative;
`;

const Name = styled.Text`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 7px;
`;

const PriceContainer = styled.View`
  flex-direction: row;
`;

const PriceText = styled.Text`
  font-size: 16px;
`;

const PriceNumber = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const SuperHostContainer = styled.View`
  padding: 3px 5px;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const SuperHostText = styled.Text`
  text-transform: uppercase;
  font-weight: 500;
  font-size: 12px;
`;

const FavButton = styled.View`
  background-color: white;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  justify-content: center;
  align-items: center;
`;

const TOpacity = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  right: 10px;
  top: 10px;
`;

const getIconName = (isFav) => {
  const isAndroid = utils.isAndroid();

  if (isAndroid) {
    if (isFav) {
      return "md-heart";
    }
    return "heart-outline";
  } else {
    if (isFav) {
      return "ios-heart";
    }
    return "ios-heart-empty";
  }
};

const RoomCard = ({ id, name, isSuperHost, photos, isFav, price, roomObj }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Container>
      <TOpacity onPress={() => dispatch(toggleFav(id))}>
        <FavButton>
          <Ionicons
            color={isFav ? colors.red2 : "black"}
            name={getIconName(isFav)}
            size={28}
          />
        </FavButton>
      </TOpacity>

      <RoomPhotos photos={photos} />

      <TouchableOpacity
        style={{ alignItems: "flex-start" }}
        onPress={() => navigation.navigate("RoomDetail", { ...roomObj })}
      >
        {isSuperHost ? (
          <SuperHostContainer>
            <SuperHostText>Superhost</SuperHostText>
          </SuperHostContainer>
        ) : null}

        <Name>{name}</Name>
        <PriceContainer>
          <PriceNumber>${price}</PriceNumber>
          <PriceText> / night</PriceText>
        </PriceContainer>
      </TouchableOpacity>
    </Container>
  );
};

RoomCard.propType = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  isSuperHost: PropTypes.bool.isRequired,
  photos: PropTypes.objectOf(
    PropTypes.shape({
      file: PropTypes.string,
    })
  ),
  isFav: PropTypes.bool.isRequired,
  price: PropTypes.number.isRequired,
  roomObj: PropTypes.object.isRequired,
};

export default RoomCard;
