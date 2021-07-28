import React from "react";
import { useRouter } from "next/router";
import {
  NoResultWrapper,
  ImageWrapper,
  ButtonWrapper,
} from "./no-result.style";
import { ArrowPrev } from "@assets/icons/ArrowPrev";
import { Button } from "@components/button/button";
// import { SearchContext } from 'contexts/search/search.context';

type NoResultFoundProps = {
  id?: string;
};

const NoResultFound: React.FC<NoResultFoundProps> = ({ id }) => {
  const router = useRouter();
  // const { dispatch } = React.useContext(SearchContext);

  function onClickButton() {
    // dispatch({
    //   type: 'RESET',
    // });
    const href = router.pathname;

    router.push('/shop/all');
  }
  return (
    <NoResultWrapper id={id}>
      <h3>":( متاسفانه محصولی پیدا نشد "</h3>

      <ImageWrapper>
        <img src="/images/no-result.svg" alt="No Result" />
      </ImageWrapper>

      <ButtonWrapper>
        <div onClick={onClickButton}>
          <Button>
            <ArrowPrev /> برو به فروشگاه
          </Button>
        </div>
      </ButtonWrapper>
    </NoResultWrapper>
  );
};

export default NoResultFound;
