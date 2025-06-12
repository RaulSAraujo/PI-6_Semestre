import { useEffect } from 'react';

import { ActivityIndicator, FlatList, ListRenderItem, View } from 'react-native';

import { useToast } from '@hooks/useToast';
import { AppError } from '@utils/AppError';

import { EmptyList } from '../EmptyList';

type FetchListProps = {
  isLoading: boolean;
  items: Record<string, unknown>[];
  totalItems: number;
  isRefreshing: boolean;
  isEndReached: boolean;
  isDisabledEndReached: boolean;
  renderListItem: ListRenderItem<unknown>;
  onSetRefreshing: (value: boolean) => void;
  onSetEndReached: (value: boolean) => void;
  onFetchData: (isLoading: boolean) => Promise<void>;
};

export function FetchList({
  isLoading,
  items,
  renderListItem,
  totalItems,
  isRefreshing,
  isEndReached,
  isDisabledEndReached,
  onFetchData,
  onSetRefreshing,
  onSetEndReached,
}: FetchListProps) {
  const { showToast } = useToast();

  async function fetchDataHandler(isLoading: boolean) {
    try {
      await onFetchData(isLoading);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError ? error.error : 'Unknown error occurred.';
      showToast(title, { action: 'error' });
    }
  }

  function handleEndReached() {
    if (!isRefreshing || !isLoading) {
      onSetEndReached(true);
    }
  }

  function renderListFooter() {
    if (items.length !== totalItems) {
      return <ActivityIndicator size="large" color="#1E88E5" />;
    }
    return null;
  }

  useEffect(() => {
    fetchDataHandler(true);
  }, []);

  useEffect(() => {
    if (isRefreshing || isEndReached) {
      fetchDataHandler(false);
    }
  }, [isRefreshing, isEndReached]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  return items.length > 0 ? (
    <FlatList
      data={items}
      windowSize={21}
      renderItem={renderListItem}
      refreshing={isRefreshing}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      ListFooterComponent={renderListFooter}
      keyExtractor={(_, index) => `${index}`}
      onRefresh={() => onSetRefreshing(true)}
      onEndReachedThreshold={0.5}
      onEndReached={!isDisabledEndReached ? handleEndReached : undefined}
    />
  ) : (
    <EmptyList activeReload reload={() => onSetRefreshing(true)} />
  );
}
