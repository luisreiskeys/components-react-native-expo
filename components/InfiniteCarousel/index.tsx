// InfiniteCarousel.tsx
import React, { useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = height * 0.2;
const ITEM_SPACING = 16;
const SIDE_SPACING = (width - ITEM_WIDTH) / 2;

interface Props {
  children: React.ReactNode[];
  autoScroll?: boolean;
  delay?: number;
}

export default function InfiniteCarousel({
  children,
  autoScroll = true,
  delay = 3000,
}: Props) {
  const listRef = useRef<FlatList>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentOffset = useRef(0);

  const items = [...children, ...children, ...children];
  const dataLength = children.length;
  const startIndex = dataLength;

  const scrollToIndex = (index: number, animated = true) => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: index * (ITEM_WIDTH + ITEM_SPACING),
        animated,
      });
    });
  };

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      currentOffset.current += ITEM_WIDTH + ITEM_SPACING;
      listRef.current?.scrollToOffset({
        offset: currentOffset.current,
        animated: true,
      });
    }, delay);
  };

  const pauseAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      if (autoScroll) startAutoScroll();
    }, 4000);
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    currentOffset.current = event.nativeEvent.contentOffset.x;
  };

  const onMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offset = event.nativeEvent.contentOffset.x;
    const index = Math.round(offset / (ITEM_WIDTH + ITEM_SPACING));

    if (index >= items.length - dataLength) {
      scrollToIndex(startIndex, false);
      currentOffset.current = startIndex * (ITEM_WIDTH + ITEM_SPACING);
    } else if (index < dataLength) {
      scrollToIndex(startIndex + (index % dataLength), false);
      currentOffset.current =
        (startIndex + (index % dataLength)) * (ITEM_WIDTH + ITEM_SPACING);
    }
  };

  useEffect(() => {
    scrollToIndex(startIndex, false);
    currentOffset.current = startIndex * (ITEM_WIDTH + ITEM_SPACING);
    if (autoScroll) startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  const snapOffsets = items.map((_, i) => i * (ITEM_WIDTH + ITEM_SPACING));

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        horizontal
        pagingEnabled={false}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>{item}</View>
        )}
        keyExtractor={(_, i) => i.toString()}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScroll={onScroll}
        onTouchStart={pauseAutoScroll}
        scrollEventThrottle={16}
        initialScrollIndex={startIndex}
        getItemLayout={(_, index) => ({
          length: ITEM_WIDTH + ITEM_SPACING,
          offset: (ITEM_WIDTH + ITEM_SPACING) * index,
          index,
        })}
        snapToOffsets={snapOffsets}
        contentContainerStyle={{
          paddingLeft: SIDE_SPACING,
          paddingRight: SIDE_SPACING,
        }}
        ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT + 32,
    marginTop: 12,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    borderRadius: 12,
    overflow: "hidden",
  },
});
