import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  PanResponder,
  Animated,
} from 'react-native';
import styles from './styles';
import {ICONS} from '../../../constants';
import {useTheme} from '@react-navigation/native';
import {StockBanner, SportsBanner} from '../../../components/Common';
import {moderateScale} from '../../../styles/metrics';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {removeTicker, setTicker} from '../../../redux/actions/user/userActions';

const ManageButton = ({bgColor, source, onPress, tintColor}) => (
  <Pressable
    style={[styles.manageBtn, {backgroundColor: bgColor}]}
    onPress={onPress}>
    <Image source={source} style={[styles.btnIcon, {tintColor: tintColor}]} />
  </Pressable>
);

const Dragger = ({source, onLongPress, onPressOut}) => (
  <Pressable
    style={styles.dragger}
    onLongPress={onLongPress}
    onPressOut={onPressOut}>
    <Image source={source} style={[styles.btnIcon, {tintColor: 'white'}]} />
  </Pressable>
);

const ManageLiveTicker = ({navigation}) => {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [isTicker1Draggable, setIsTicker1Draggable] = useState(false);
  const [isTicker2Draggable, setIsTicker2Draggable] = useState(false);

  const ticker1Position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const ticker2Position = useRef(new Animated.ValueXY({x: 0, y: 50})).current;

  const dispatch = useDispatch();
  const tickers = useSelector(state => state.user.additional.tickers);

  const swapPositions = () => {
    // Get current y positions dynamically
    const ticker1CurrentY = ticker1Position.y._value;
    const ticker2CurrentY = ticker2Position.y._value;

    // Swap y values using setValue for instant update
    ticker1Position.setValue({x: 0, y: ticker2CurrentY});
    ticker2Position.setValue({x: 0, y: ticker1CurrentY});
  };

  const createPanResponder = (
    position,
    isDraggable,
    otherPosition,
    onSwap,
    setDraggable,
  ) => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: () => isDraggable,
      onPanResponderMove: (_, gesture) => {
        position.setValue({x: 0, y: gesture.dy});
      },
      onPanResponderRelease: (_, gesture) => {
        const currentY = position.y._value + gesture.dy;
        const otherY = otherPosition.y._value;

        // Check if tickers overlap within threshold
        const isOverlapping = Math.abs(currentY - otherY) < 50;

        if (isOverlapping) {
          onSwap();
        } else {
          // Animate back to original position if not overlapping
          Animated.spring(position, {
            toValue: {x: 0, y: 0},
            useNativeDriver: false,
          }).start();
        }
        setDraggable(false);
      },
    });
  };

  const ticker1PanResponder = createPanResponder(
    ticker1Position,
    isTicker1Draggable,
    ticker2Position,
    swapPositions,
    setIsTicker1Draggable,
  );
  const ticker2PanResponder = createPanResponder(
    ticker2Position,
    isTicker2Draggable,
    ticker1Position,
    swapPositions,
    setIsTicker2Draggable,
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          android_ripple={{
            color: 'lightgray',
            borderless: true,
            radius: moderateScale(50),
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={ICONS.BACK}
            style={[styles.backIcon, {tintColor: colors.text}]}
          />
        </Pressable>
        <Text style={[styles.title, {color: colors.headerLabel}]}>
          {t('screens.manage_live_ticker.title')}
        </Text>
      </View>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        {t('screens.manage_live_ticker.subtitle')}
      </Text>
      <View style={styles.liveTickerContainer}>
        <Animated.View
          style={[
            styles.liveTickerAnimatedContent,
            ticker1Position.getLayout(),
          ]}
          {...ticker1PanResponder.panHandlers}>
          <View
            style={[
              styles.liveTickerContent,
              {
                zIndex: 5,

                transform: isTicker1Draggable ? [{scale: 1.05}] : [{scale: 1}],
              },
            ]}>
            <ManageButton
              bgColor={tickers.StocksTicker ? colors.border : 'lightgray'}
              source={tickers.StocksTicker ? ICONS.MINUS : ICONS.PLUS}
              onPress={() => {
                tickers.StocksTicker
                  ? dispatch(removeTicker('StocksTicker'))
                  : dispatch(setTicker('StocksTicker'));
              }}
              tintColor={tickers.StocksTicker ? 'white' : 'black'}
            />
            <StockBanner scrollEnabled={false} loop={false} />
            <Dragger
              source={ICONS.DRAG}
              onLongPress={() => setIsTicker1Draggable(true)}
              onPressOut={() => setIsTicker1Draggable(false)}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.liveTickerAnimatedContent,
            ticker2Position.getLayout(),
          ]}
          {...ticker2PanResponder.panHandlers}>
          <View
            style={[
              styles.liveTickerContent,
              {
                zIndex: 1,
                transform: isTicker2Draggable ? [{scale: 1.05}] : [{scale: 1}],
              },
            ]}>
            <ManageButton
              bgColor={tickers.SportsTicker ? colors.border : 'lightgray'}
              source={tickers.SportsTicker ? ICONS.MINUS : ICONS.PLUS}
              onPress={() => {
                tickers.SportsTicker
                  ? dispatch(removeTicker('SportsTicker'))
                  : dispatch(setTicker('SportsTicker'));
              }}
              tintColor={tickers.SportsTicker ? 'white' : 'black'}
            />
            <SportsBanner scrollEnabled={false} loop={false} />
            <Dragger
              source={ICONS.DRAG}
              onLongPress={() => setIsTicker2Draggable(true)}
              onPressOut={() => setIsTicker2Draggable(false)}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

export default ManageLiveTicker;
