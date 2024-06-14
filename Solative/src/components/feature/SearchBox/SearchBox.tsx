import React, { useCallback, useState } from 'react';
import Field from '../../common/Field';
import { debounce } from '../../utility/helperDebounce';
import { fetchCities } from '../../../services/fetchCities';
import { useSearch } from '../../../context/SearchContext';

const SearchBox: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const { limit, setResults, setPaginatorData, setSearchQuery } = useSearch();

  const fetchData = async (query: string) => {
    console.log("limit", limit)
    await fetchCities(query, limit).then((data) => {
      console.log("data", data)
      setSearchQuery(query);
      setResults(data?.data);
      setPaginatorData(data?.metadata)
    });
  }

  const debouncedFetchData = debounce(fetchData, 1000);

  const handleOnChange = useCallback((value: string): void => {
    setQuery(value);
    debouncedFetchData(value);
  }, [limit]);

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === 'Enter') {
      await fetchData(query);
    }
  };

  return (
    <Field
      type="text"
      value={query}
      onChange={handleOnChange}
      placeholder="Search"
      onKeyDown={handleKeyDown}
    />
  );
};

export default React.memo(SearchBox);
