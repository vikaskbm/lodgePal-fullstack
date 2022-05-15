import React, { useEffect } from "react";
import styled from "styled-components/native";
import colors from "../../colors";
import RoomPhotos from "./../../components/RoomPhotos";
import Ionicons from "@expo/vector-icons/Ionicons";
import utils from "../../utils";

const Container = styled.View``;

const DataContainer = styled.View`
  padding: 0px 30px;
`;
const Address = styled.Text`
  margin-top: 10px;
  font-size: 24px;
`;

const PropertyInfoContainer = styled.View`
  margin-top: 20px;
  flex-direction: row;
`;

const PropertyInfoData = styled.View`
  background-color: ${colors.green};
  margin-right: 10px;
  border-radius: 5px;
`;

const PropertyInfoText = styled.Text`
  color: white;
  font-weight: 500;
  padding: 5px 10px;
`;

const CheckContainer = styled.View`
  margin-top: 40px;
`;

const CheckTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CheckTitle = styled.Text`
  font-size: 18px;
  margin-left: 15px;
`;

const CheckTime = styled.Text`
  margin-top: 10px;
`;

const formatQty = (number, name) => {
  if (number === 1) {
    return `${number} ${name}`;
  }
  return `${number} ${name}s`;
};

const formatTime = (time) => {
  let [hours, minutes, seconds] = time.split(":");
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedTime = hours + ":" + minutes + " " + ampm;
  return formattedTime;
};

export default ({ route: { params }, navigation }) => {
  console.log(params.check_in);
  console.log(params.check_out);
  useEffect(() => {
    navigation.setOptions({ title: params.name });
  }, []);
  return (
    <Container>
      <RoomPhotos photos={params.photos} factor={2} />

      <DataContainer>
        <Address>{params.address}</Address>
        <PropertyInfoContainer>
          <PropertyInfoData>
            <PropertyInfoText>{formatQty(params.beds, "bed")}</PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQty(params.bedrooms, "bedroom")}
            </PropertyInfoText>
          </PropertyInfoData>
          <PropertyInfoData>
            <PropertyInfoText>
              {formatQty(params.bathrooms, "bathroom")}
            </PropertyInfoText>
          </PropertyInfoData>
        </PropertyInfoContainer>

        <CheckContainer>
          <CheckTitleContainer>
            <Ionicons
              name={
                utils.isAndroid() ? "md-timer-outline" : "ios-timer-outline"
              }
              size={24}
            />
            <CheckTitle>Check-in / Check-out</CheckTitle>
          </CheckTitleContainer>
          <CheckTime>
            {formatTime(params.check_in)} / {formatTime(params.check_out)}
          </CheckTime>
        </CheckContainer>
      </DataContainer>
    </Container>
  );
};
