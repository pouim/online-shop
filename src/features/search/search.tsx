import React, { useState } from 'react';
import { SearchBox } from '@components/search-box/search-box';
// import { useAppState, useAppDispatch } from '../../context/app/app.provider';
import { useRouter } from 'next/router';


interface Props {
  minimal?: boolean;
  showButtonText?: boolean;
  onSubmit?: () => void;
  [key: string]: unknown;
}

const Search: React.FC<Props> = ({ onSubmit, ...props }) => {
  // const searchTerm = useAppState('searchTerm');
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState<any>("");


  const handleOnChange = (e: any) => {
   setSearchValue(e.target.value);
  };
  const { pathname, query } = router;
  const onSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // const { type, ...rest } = query;
    // if (type) {
    //   router.push(
    //     {
    //       pathname,
    //       query: { ...rest, text: 'searchTerm' },
    //     },
    //     {
    //       pathname: `/${type}`,
    //       query: { ...rest, text: 'searchTerm' },
    //     }
    //   );
    // } else {
    //   router.push({
    //     pathname,
    //     query: { ...rest, text: 'searchTerm' },
    //   });
    // }
    router.push(`/shop/search/${searchValue}`)
    // dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
    if (onSubmit) {
      onSubmit();
    }
  };

  console.log(searchValue)
  return (
    <SearchBox
      onEnter={onSearch}
      onChange={handleOnChange}
      value= {searchValue}
      name="search"
      placeholder="جستجو در محصولات ..."
      buttonText='Search'
      {...props}
    />
  );
};

export default Search;
