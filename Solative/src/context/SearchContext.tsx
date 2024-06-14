import React, { createContext, useContext, useState } from 'react';

interface SearchContextType {
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    results: any[];
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
    paginatorData: IinitialPaginatorData;
    setPaginatorData: React.Dispatch<React.SetStateAction<IinitialPaginatorData>>

}

interface IinitialPaginatorData {
    currentOffset: number,
    totalCount: number
}

const initialPaginatorData: IinitialPaginatorData = {
    currentOffset: 0,
    totalCount: 0
}

const initialData = {
    searchQuery: '',
    setSearchQuery: () => { },
    limit: 5,
    setLimit: () => { },
    results: [],
    setResults: () => { },
    paginatorData: initialPaginatorData,
    setPaginatorData: () => { },
}

const SearchContext = createContext<SearchContextType>(initialData);

export const SearchProvider: React.FC = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [limit, setLimit] = useState<number>(5);
    const [results, setResults] = useState<any[]>([]);
    const [paginatorData, setPaginatorData] = useState(initialPaginatorData);

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery, limit, setLimit, results, setResults, paginatorData, setPaginatorData }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = (): SearchContextType => {
    return useContext(SearchContext);
};
