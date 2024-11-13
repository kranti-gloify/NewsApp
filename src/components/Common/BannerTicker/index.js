import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './styles';
import StockBanner from '../StockBanner';
import SportsBanner from '../SportsBanner';
import {useSelector} from 'react-redux';

const BannerTicker = () => {
  const tickers = useSelector(state => state.user.additional.tickers);
  if (!tickers.StocksTicker && !tickers.SportsTicker) {
    return null;
  }
  return (
    <View style={styles.container}>
      {/* Swiper for switching between Stock and Sports banners */}
      <Swiper
        loop={true}
        horizontal={false}
        autoplay={true}
        autoplayTimeout={12}
        showsPagination={true}
        paginationStyle={{top: 0, right: 50, position: 'absolute'}}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {tickers.StocksTicker && (
          <StockBanner
            autoPlay={true}
            autoPlayTimeout={2}
            loop={true}
            scrollEnabled={true}
          />
        )}

        {tickers.SportsTicker && (
          <SportsBanner
            autoPlay={true}
            autoPlayTimeout={2}
            loop={true}
            scrollEnabled={true}
          />
        )}
      </Swiper>
    </View>
  );
};

export default BannerTicker;
