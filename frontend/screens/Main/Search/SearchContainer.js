import React, { useState } from "react";
import SearchPresenter from "./SearchPresenter";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import api from "../../../api";

export default ({ token = null }) => {
  const navigation = useNavigation();
  const [searching, setSearching] = useState(false);
  const [beds, setBeds] = useState();
  const [bedrooms, setBedrooms] = useState();
  const [bathrooms, setBathrooms] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [results, setResults] = useState();

  const triggerSearch = async () => {
    setSearching(true);
    const form = {
      ...(beds && { beds }),
      ...(bedrooms && { bedrooms }),
      ...(bathrooms && { bathrooms }),
      ...(maxPrice && { max_price: maxPrice }),
    };

    try {
      const { data } = await api.search(form, token);
      setResults(data);
    } catch (e) {
      console.warn(form);
    } finally {
      Keyboard.dismiss();
      setSearching(false);
    }
  };
  return (
    <SearchPresenter
      navigation={navigation}
      beds={beds}
      setBeds={setBeds}
      bedrooms={bedrooms}
      setBedrooms={setBedrooms}
      bathrooms={bathrooms}
      setBathrooms={setBathrooms}
      maxPrice={maxPrice}
      setMaxPrice={setMaxPrice}
      searching={searching}
      triggerSearch={triggerSearch}
      results={results}
    />
  );
};
