import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ImageSourcePropType, StyleSheet } from 'react-native';
import { COLORS } from '../database/items';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Details: {
    name: string;
    price: number;
    image: ImageSourcePropType;
    size: string;
    crust: string;
    delivery: number;
    ingredients: ImageSourcePropType[];
    isTopOfTheWeek: boolean;
  };
};

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({ route, navigation }: DetailsProps): React.JSX.Element => {
  const {
    name,
    price,
    image,
    size,
    crust,
    delivery,
    ingredients,
    isTopOfTheWeek,
  } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <FontAwesome name="angle-left" style={styles.backIcon} />
          </TouchableOpacity>
          <View style={[styles.starContainer, { opacity: isTopOfTheWeek ? 1 : 0.5 }]}>
            <AntDesign name="star" style={styles.starIcon} />
          </View>
        </View>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Size</Text>
              <Text style={styles.detailValue}>{size}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Crust</Text>
              <Text style={styles.detailValue}>{crust}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Delivery</Text>
              <Text style={styles.detailValue}>{delivery} min</Text>
            </View>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image} style={styles.image} />
          </View>
        </View>
        <Text style={styles.ingredientsTitle}>Ingredients</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {ingredients.map((data, index) => (
            <View key={index} style={styles.ingredientContainer}>
              <Image source={data} style={styles.ingredientImage} />
            </View>
          ))}
        </ScrollView>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Place on Order</Text>
          <Entypo name="chevron-right" style={styles.orderButtonIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  scrollViewContent: {
    paddingBottom: 80, // Ensure there's enough space for the footer
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 16,
    color: COLORS.black,
  },
  starContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 15,
    color: COLORS.white,
  },
  name: {
    fontSize: 38,
    color: COLORS.black,
    fontWeight: '800',
    paddingHorizontal: 20,
    maxWidth: 310,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  currency: {
    fontSize: 20,
    color: COLORS.accentRed,
    fontWeight: '900',
    paddingRight: 5,
    paddingBottom: 8,
  },
  price: {
    fontSize: 38,
    color: COLORS.accentRed,
    fontWeight: '900',
  },
  detailsContainer: {
    flexDirection: 'row',
    maxHeight: 300,
    width: '100%',
    alignItems: 'center',
  },
  details: {
    paddingHorizontal: 20,
  },
  detailItem: {
    paddingVertical: 20,
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.5,
  },
  detailValue: {
    fontSize: 18,
    color: COLORS.black,
    fontWeight: '600',
  },
  imageContainer: {
    width: 380,
    height: 380,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ingredientsTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  ingredientContainer: {
    margin: 12,
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    elevation: 5,
  },
  ingredientImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  footer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButton: {
    width: '90%',
    height: 80,
    backgroundColor: COLORS.accent,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    letterSpacing: 1,
    marginRight: 10,
  },
  orderButtonIcon: {
    fontSize: 16,
    color: COLORS.black,
  },
});

export default Details;
