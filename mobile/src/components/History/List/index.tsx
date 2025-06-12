import { useShareState } from '@store/shares';
import { FetchList } from '@components/Global';
import { Item } from '@dtos/HistoryDTO';
import { useHistoryActions, useHistoryState } from '@store/history';

import { ListItem } from './Item';

export function List() {
  const { data, loading, refreshing, totalRecords, endReached, disabledEndReached } =
    useHistoryState();

  const share = useShareState();

  const { fetchData, setEndReached, setRefreshing } = useHistoryActions();

  function renderItem({ item }: { item: unknown }) {
    const history = item as Item;

    const findShare = share.find((e) => e.id === history.id_listed_shares);

    return (
      <ListItem
        data={{ ...history, companyName: findShare?.name, companyCode: findShare?.ticker }}
        bottomDivider={true}
      />
    );
  }

  return (
    <FetchList
      items={data}
      isLoading={loading}
      isRefreshing={refreshing}
      totalItems={totalRecords}
      isEndReached={endReached}
      renderListItem={renderItem}
      onSetEndReached={setEndReached}
      onSetRefreshing={setRefreshing}
      isDisabledEndReached={disabledEndReached}
      onFetchData={(loading) => fetchData({ loading })}
    />
  );
}
