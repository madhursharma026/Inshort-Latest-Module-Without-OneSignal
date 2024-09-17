import tw from "twrnc";
import { APIURL } from "@env";
import SingleNews from "../../components/SingleNews";
import { Dimensions, View, Text } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useLanguage } from "../../context/LanguageContext";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import React, { useState, useEffect, useCallback } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const GET_NEWS_BY_LANGUAGE_QUERY = gql`
  query GetNewsByLanguage($language: String!) {
    newsByLanguage(language: $language) {
      id
      url
      title
      author
      language
      sourceURL
      description
      publishedAt
      readMoreContent
      sourceURLFormate
    }
  }
`;

const FeedsScreen = () => {
  const { language } = useLanguage();
  const dynamicStyles = UseDynamicStyles();
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_NEWS_BY_LANGUAGE_QUERY,
          variables: { language },
        });
        setArticles(data.newsByLanguage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [language]);

  const renderCarouselItem = ({ item, index }) => (
    <SingleNews item={item} index={index} />
  );

  const animationStyle = useCallback(
    (value) => {
      "worklet";
      const translateY = interpolate(value, [-1, 0, 1], [-windowHeight, 0, 0]);
      const translateX = interpolate(value, [-1, 0, 1], [-windowWidth, 0, 0]);
      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);
      return {
        transform: [true ? { translateY } : { translateX }, { scale }],
        zIndex,
      };
    },
    [windowHeight, windowWidth, true]
  );

  const renderContent = () => {
    if (loading) {
      return <StatusMessage message="Loading articles..." />;
    }
    if (error) {
      return <StatusMessage message={`Error: ${error}`} />;
    }
    if (articles.length === 0) {
      return <StatusMessage message="No articles available" />;
    }

    return (
      <View>
        <Carousel
          loop={false}
          mode={"stack"}
          vertical={true}
          data={articles}
          width={windowWidth}
          height={windowHeight}
          renderItem={renderCarouselItem}
          customAnimation={animationStyle}
        />
      </View>
    );
  };

  const StatusMessage = ({ message }) => (
    <Text style={[tw`text-lg text-center`, dynamicStyles.textColor]}>
      {message}
    </Text>
  );

  return (
    <View
      style={[
        dynamicStyles.backgroundColor,
        tw`flex-1 justify-center items-center`,
      ]}
    >
      {renderContent()}
    </View>
  );
};

export default FeedsScreen;
