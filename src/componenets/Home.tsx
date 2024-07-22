import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import { Categories, COLORS } from '../database/items';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    name: string;
    price: number;
    image: any;
    size: string;
    crust: string;
    delivery: number;
    ingredients: any[];
    isTopOfTheWeek: boolean;
    navigation: any;
  };
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home = ({ navigation }: HomeProps): React.JSX.Element => {
  const [currentSelected, setCurrentSelected] = useState(0);

  const renderCategories = ({ item, index }: ListRenderItemInfo<any>) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}>
        <View
          style={[
            styles.categoryContainer,
            { backgroundColor: currentSelected === index ? COLORS.accent : COLORS.white },
          ]}>
          <View style={styles.categoryImageContainer}>
            <Image
              source={item.image}
              style={styles.categoryImage}
            />
          </View>
          <Text style={styles.categoryName}>{item.name}</Text>
          <View
            style={[
              styles.categoryIconContainer,
              { backgroundColor: currentSelected === index ? COLORS.white : COLORS.accentRed },
            ]}>
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected === index ? COLORS.black : COLORS.white,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data: any, index: number) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={styles.itemContainer}
        onPress={() =>
          navigation.push('Details', {
            name: data.name,
            price: data.price,
            image: data.image,
            size: data.size,
            crust: data.crust,
            delivery: data.delivery,
            ingredients: data.ingredients,
            isTopOfTheWeek: data.isTopOfTheWeek,
            navigation: navigation,
          })
        }>
        <View style={styles.itemContent}>
          <View style={styles.itemTextContainer}>
            <View
              style={[
                styles.itemTopOfTheWeek,
                { display: data.isTopOfTheWeek ? 'flex' : 'none' },
              ]}>
              <FontAwesome name="crown" style={styles.crownIcon} />
              <Text style={styles.topOfTheWeekText}>top of the week</Text>
            </View>
            <Text style={styles.itemName}>{data.name}</Text>
            <Text style={styles.itemWeight}>{data.weight}</Text>
          </View>
          <View style={styles.itemImageContainer}>
            <Image
              source={data.image}
              style={styles.itemImage}
            />
          </View>
          <View style={styles.itemBottomContainer}>
            <View style={styles.itemAddButton}>
              <Entypo name="plus" style={styles.plusIcon} />
            </View>
            <View style={styles.itemRatingContainer}>
              <AntDesign name="star" style={styles.starIcon} />
              <Text style={styles.itemRating}>{data.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
          <Image
            source={require('../database/images/background.png')}
            style={styles.backgroundImage}
          />
          <View style={styles.header}>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={require('../database/images/profile.jpg')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Material name="segment" style={styles.segmentIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerSubText}>Food</Text>
            <Text style={styles.headerMainText}>Delivery</Text>
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" style={styles.searchIcon} />
            <TextInput
              placeholder="Search..."
              style={styles.searchInput}
            />
          </View>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <FlatList
            horizontal
            data={Categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.popularTitle}>Popular</Text>
          {Categories[currentSelected].items.map(renderItems)}
          <TouchableOpacity style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Load more</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.white,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: -100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 500,
  },
  segmentIcon: {
    fontSize: 28,
    color: COLORS.black,
  },
  headerTextContainer: {
    padding: 20,
  },
  headerSubText: {
    fontSize: 16,
    color: COLORS.black,
    opacity: 0.5,
    fontWeight: '400',
  },
  headerMainText: {
    fontSize: 40,
    color: COLORS.black,
    fontWeight: '600',
    letterSpacing: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
    color: COLORS.black,
    opacity: 0.8,
  },
  searchInput: {
    color: COLORS.black,
    fontSize: 16,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black + '20',
    width: '90%',
    marginLeft: 10,
    letterSpacing: 1,
  },
  categoriesTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
    letterSpacing: 1,
  },
  popularTitle: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.black,
  },
  loadMoreButton: {
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  loadMoreText: {
    fontSize: 16,
    color: COLORS.black,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  categoryContainer: {
    width: 120,
    height: 180,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
  },
  categoryImageContainer: {
    width: 60,
    height: 60,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: COLORS.black,
    fontWeight: '600',
  },
  categoryIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    width: '90%',
    height: 160,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    elevation: 4,
    position: 'relative',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTextContainer: {
    marginBottom: 50,
  },
  itemTopOfTheWeek: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crownIcon: {
    fontSize: 10,
    color: COLORS.accent,
  },
  topOfTheWeekText: {
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.8,
    marginLeft: 5,
  },
  itemName: {
    fontSize: 22,
    color: COLORS.black,
    fontWeight: 'bold',
    paddingTop: 10,
  },
  itemWeight: {
    fontSize: 12,
    color: COLORS.black,
    opacity: 0.5,
  },
  itemImageContainer: {
    width: 150,
    height: 150,
    marginRight: -45,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  itemBottomContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAddButton: {
    width: 85,
    height: 50,
    backgroundColor: COLORS.accent,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 18,
    color: COLORS.black,
  },
  itemRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  starIcon: {
    fontSize: 12,
    color: COLORS.black,
    paddingRight: 5,
  },
  itemRating: {
    fontSize: 15,
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default Home;