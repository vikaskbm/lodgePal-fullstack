import React from "react";
import PropTypes from "prop-types";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import Ionicons from "@expo/vector-icons/Ionicons";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

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

const PhotosContainer = styled.View`
  margin-bottom: 10px;
  overflow: hidden;
  width: 100%;
  height: ${height / 4}px;
`;

const SlideImage = styled.Image`
  width: 100%;
  height: 100%;
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

const RoomCard = ({ id, name, isSuperHost, photos, isFav, price }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Container onPress={() => navigation.navigate("RoomDetail")}>
      <TOpacity onPress={() => dispatch(toggleFav(id))}>
        <FavButton>
          <Ionicons
            color={isFav ? colors.red : "black"}
            name={getIconName(isFav)}
            size={28}
          />
        </FavButton>
      </TOpacity>
      <PhotosContainer>
        {photos.length === 0 ? (
          <SlideImage
            resizeMode="repeat"
            source={require("../assets/roomDefaultImg.jpeg")}
          />
        ) : (
          <Swiper
            controlsProps={{
              PrevComponent: () => null,
              NextComponent: () => null,
              dotActiveStyle: {
                backgroundColor: "white",
              },
            }}
          >
            {photos.map((photo) => (
              <SlideImage key={photo.id} source={{ uri: photo.file }} />
            ))}
          </Swiper>
        )}
      </PhotosContainer>

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
};

export default RoomCard;
