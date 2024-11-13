import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTheme} from '@react-navigation/native';
import styles from './styles';
import BannerTicker from '../../../Common/BannerTicker';
import {horizontalScale, verticalScale} from '../../../../styles/metrics';
import {FallBackUI, Loader} from '../../../Common';
import {useTranslation} from 'react-i18next';

const Header = ({
  activeCategory,
  setActiveCategory,
  params,
  error,
  isLoading,
}) => {
  const {t} = useTranslation();
  const [categories, setCategories] = useState([
    {id: 1, name: t('components.headline_header.categories.for_you')},
    {id: 2, name: t('components.headline_header.categories.business')},
    {id: 3, name: t('components.headline_header.categories.technology')},
    {id: 4, name: t('components.headline_header.categories.general')},
    {id: 5, name: t('components.headline_header.categories.science')},
    {id: 6, name: t('components.headline_header.categories.health')},
    {id: 7, name: t('components.headline_header.categories.sports')},
    {id: 8, name: t('components.headline_header.categories.entertainment')},
  ]);

  const {colors} = useTheme();

  return (
    <View style={{width: horizontalScale(330)}}>
      <View>
        <View style={styles.categoryHeader}>
          <FlatList
            data={categories}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.category,
                  {
                    backgroundColor: colors.tileBackground,
                    borderColor:
                      activeCategory === item.name
                        ? colors.border
                        : colors.background,
                  },
                ]}
                onPress={() => setActiveCategory(item.name)}>
                <Text style={[styles.categoryLabel, {color: colors.tileText}]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{gap: 10}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <BannerTicker />
      </View>
      {isLoading ? (
        <View style={{alignSelf: 'center'}}>
          <Loader />
        </View>
      ) : null}
      {error ? (
        <FallBackUI
          fallbackType={'error'}
          errorMessage={error?.data?.message}
          iconWidth={horizontalScale(80)}
          iconHeight={verticalScale(80)}
        />
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;
