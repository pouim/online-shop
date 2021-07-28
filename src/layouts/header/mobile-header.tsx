import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { openModal, closeModal } from '@redq/reuse-modal';
import MobileDrawer from './mobile-drawer';
import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  SearchWrapper,
  SearchModalWrapper,
  SearchModalClose,
} from './header.style';
import Search from '../../features/search/search';


import { SearchIcon } from '../../assets/icons/SearchIcon';
import { LongArrowLeft } from '../../assets/icons/LongArrowLeft';
import Logo from '../logo/logo';

import useDimensions from '../../utils/useComponentSize';

type MobileHeaderProps = {
  className?: string;
  closeSearch?: any;
};

const SearchModal: React.FC<{}> = () => {
  const router = useRouter();

  // const onSubmit = () => {
    
  //   // dispatch({ type: 'SET_SEARCH_TERM', payload: '' });
  //   if (onSubmit) {
  //     onSubmit();
  //   }
  //   closeModal();
  // };
  return (
    <SearchModalWrapper>
      <SearchModalClose type="submit"  onClick={() => closeModal()}>
     
        <LongArrowLeft />
      </SearchModalClose>
      <Search
        className="header-modal-search"
        showButtonText={false}
        onSubmit={() => closeModal()}
      />
    </SearchModalWrapper>
  );
};

const MobileHeader: React.FC<MobileHeaderProps> = ({ className }) => {
  const { pathname, query } = useRouter();

  const [mobileHeaderRef, dimensions] = useDimensions();

  const handleSearchModal = () => {
    openModal({
      show: true,
      config: {
        enableResizing: false,
        disableDragging: true,
        className: 'search-modal-mobile',
        width: '100%',
        height: '100%',
      },
      closeOnClickOutside: false,
      component: SearchModal,
      closeComponent: () => <div />,
    });
  };
  const type = pathname ===  query.type;



  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className} ref={mobileHeaderRef}>
        <DrawerWrapper>
          <MobileDrawer />
        </DrawerWrapper>

        <LogoWrapper>
          <Logo imageUrl="/logo.png" alt="shop logo" />
        </LogoWrapper>

        {/* <LanguageSwitcher /> */}

        
          <SearchWrapper
            onClick={handleSearchModal}
            className="searchIconWrapper"
          >
            <SearchIcon />
          </SearchWrapper>
      
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeader;
