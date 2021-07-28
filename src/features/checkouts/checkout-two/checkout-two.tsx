import React, { useContext, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@components/button/button";
import RadioCard from "@components/radio-card/radio-card";
import RadioGroup from "@components/radio-group/radio-group";
import { addCommas, removeCommas, digitsEnToFa } from "persian-tools2";
import toast, { Toaster } from "react-hot-toast";
// import PaymentGroup from '@components/payment-group/payment-group';
import UpdateAddress from "@features/user-profile/my-location/address-card/address-card";
import UpdateContact from "@components/contact-card/contact-card";
import { CURRENCY } from "@utils/constant";
import { openModal, closeModal } from "@redq/reuse-modal";
import { Scrollbars } from "react-custom-scrollbars";
import DeleteDialog from "@components/Delete-Dialog";
import CheckoutWrapper, {
  CheckoutContainer,
  CheckoutInformation,
  InformationBox,
  DeliverySchedule,
  Heading,
  ButtonGroup,
  CheckoutSubmit,
  HaveCoupon,
  CouponBoxWrapper,
  CouponInputBox,
  // Input,
  CouponCode,
  RemoveCoupon,
  ErrorMsg,
  TermConditionText,
  TermConditionLink,
  CartWrapper,
  CalculationWrapper,
  OrderInfo,
  Title,
  ItemsWrapper,
  Items,
  Quantity,
  Multiplier,
  ItemInfo,
  Price,
  TextWrapper,
  Text,
  Bold,
  Small,
  NoProductMsg,
  NoProductImg,
  IconWrapper,
} from "./checkout-two.style";
import CouponBox from "@components/coupon-box/coupon-box";

import { Plus } from "@assets/icons/PlusMinus";
import { NoCartBag } from "@assets/icons/NoCartBag";

import Sticky from "react-stickynode";

import { useCart } from "@context/cart/use-cart";
import { useWindowSize } from "@utils/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import jwtAxios from "src/axios-config/jwtAxios";
import { deleteLocation } from "@store/actions/Locations";
import { AppState } from "@store/store";
import { postNewOrder } from "@store/actions/Orders";

// The type of props Checkout Form receives
interface MyFormProps {
  token?: string;
  deviceType: any;
}

type CartItemProps = {
  product: any;
};

const OrderItem: React.FC<CartItemProps> = ({ product }) => {
  const { id, title, name, unit, price, real_price } = product.product;
  const { quantity } = product;
  const displayPrice = price ? price : real_price;
  return (
    <Items key={id}>
      <div>
        <Quantity>{quantity}</Quantity>
        <Multiplier>x</Multiplier>
        <ItemInfo>
          {name ? name : title} {unit ? `| ${unit}` : ""}
        </ItemInfo>
      </div>

      <Price>
        {digitsEnToFa(addCommas(displayPrice * quantity))}
        <span> </span>
        {CURRENCY}
      </Price>
    </Items>
  );
};

const CheckoutWithSidebar: React.FC<MyFormProps> = ({ token, deviceType }) => {
  const [hasCoupon, setHasCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setError] = useState("");
  const { locations } = useSelector((state) => state.locations);
  const isRtl = true;
  const {
    items,
    removeCoupon,
    coupon,
    applyCoupon,
    clearCart,
    calculatePrice,
    calculateDiscount,
    calculateSubTotalPrice,
    isRestaurant,
    toggleRestaurant,
  } = useCart();
  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector((state: AppState) => state.common);
  const [isValid, setIsValid] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const { cart, cartItems } = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItemsCount = cartItems.length;
  // const { address, contact, card, schedules } = state;

  // const [deleteContactMutation] = useMutation(DELETE_CONTACT);
  // const [deleteAddressMutation] = useMutation(DELETE_ADDRESS);
  // const [deletePaymentCardMutation] = useMutation(DELETE_CARD);
  // const [appliedCoupon] = useMutation(APPLY_COUPON);
  const size: any = useWindowSize();

  const handleSubmit = async () => {
    
    if (selectedAddress) {
      dispatch(postNewOrder(selectedAddress.id));
      router.push('/user/orders');
    } else {
      toast.error("لطفا یک نشانی انتخاب کنید", {
        duration: 4000,
        style: {
          minWidth: "400px",
          minHeight: "100px",
        },
      });
    }
  };
  
  useEffect(() => {
    if (calculatePrice() > 0 && cartItemsCount > 0) {
      // address.length &&
      // contact.length &&
      // card.length &&
      // schedules.length
      setIsValid(true);
    }
  }, []);
  useEffect(() => {
    return () => {
      if (isRestaurant) {
        toggleRestaurant();
        clearCart();
      }
    };
  }, []);

  const handleCancel = () => {
    closeModal();
  };

  const handleDeleteLocation = async (id: any) => {
    try {
      console.log(`deleting id ${id} started`);
      const res = await jwtAxios.delete(`addresses/${id}/`);
      dispatch(deleteLocation(id));
      toast.success("نشانی با موفقیت حذف شد", {
        duration: 4000,
        style: {
          minWidth: "500px",
        },
      });
      console.log(`deleting id ${id} succedd`, res.data);
    } catch (error) {
      toast.error("متاسفانه نشانی حذف نشد", {
        duration: 4000,
        style: {
          minWidth: "500px",
        },
      });
      console.log(`deleting id ${id} failed`, error);
    }
  };
  // Add or edit modal

  const handleDeleteModal = (modalComponent: any) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: {
        onSubmitClick: handleDeleteLocation,
        onCancelClick: handleCancel,
      },
    });
  };

  const handleEditModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal"
  ) => {
    openModal({
      show: true,
      config: {
        width: 500,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps, type: "edit" },
    });
  };

  const handleAddModal = (
    modalComponent: any,
    modalProps = {},
    className: string = "add-address-modal"
  ) => {
    openModal({
      show: true,
      config: {
        width: 500,
        height: "auto",
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps, type: "add" },
    });
  };

  return (
    <form>
      <Toaster position="top-center" />
      <CheckoutWrapper>
        <CheckoutContainer>
          <CheckoutInformation>
            {/* DeliveryAddress */}
            <InformationBox>
              <Heading>آدرس تحویل گیرنده</Heading>
              <ButtonGroup>
                <RadioGroup
                  items={locations}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      content={item.postal_address}
                      name="address"
                      checked={item.id === selectedAddress?.id}
                      onChange={() => setSelectedAddress(item)}
                      // onChange={() =>
                      //   dispatch({
                      //     type: 'SET_PRIMARY_ADDRESS',
                      //     payload: item.id.toString(),
                      //   })
                      // }
                      onEdit={() =>
                        handleEditModal(
                          UpdateAddress,
                          item,
                          "add-contact-modal"
                        )
                      }
                      onDelete={() => handleDeleteLocation(item.id)}
                    />
                  )}
                  secondaryComponent={
                    <Button
                      className="addButton"
                      variant="text"
                      type="button"
                      onClick={() =>
                        handleAddModal(UpdateAddress, {}, "add-contact-modal")
                      }
                    >
                      <IconWrapper>
                        <Plus width="10px" />
                      </IconWrapper>
                      اضافه کردن آدرس جدید
                    </Button>
                  }
                />
              </ButtonGroup>
            </InformationBox>

            <InformationBox>
              <div className="d-flex flex-row-reverse justify-content-around align-ietms-center">
                <div>
                  <img src="/images/shop/pishtaz.png" alt="pishtaz" />
                </div>
                <div>
                  <Title className="mb-1">ارسال به وسیله پست پیشتاز</Title>
                  <Title style={{ fontWeight: "normal" }}>
                    (بین 2 تا 4 روز کاری)
                  </Title>
                </div>
              </div>
            </InformationBox>

            <CheckoutSubmit>
              <Button
                type="button"
                onClick={handleSubmit}
                // disabled={!isValid}
                size="big"
                loading={loading}
                style={{ width: "100%" }}
              >
                تایید و رفتن به صفحه پرداخت
              </Button>
            </CheckoutSubmit>
          </CheckoutInformation>

          <CartWrapper>
            {/* <Sticky enabled={true} top={totalHeight} innerZ={999}> */}
            <Sticky
              enabled={size.width >= 768 ? true : false}
              top={120}
              bottomBoundary={700}
              innerZ={999}
            >
              <OrderInfo>
                <Title>سفارش شما</Title>

                <Scrollbars
                  universal
                  autoHide
                  autoHeight
                  autoHeightMax="390px"
                  renderView={(props) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        marginLeft: isRtl ? props.style.marginRight : 0,
                        marginRight: isRtl ? 0 : props.style.marginRight,
                        paddingLeft: isRtl ? 15 : 0,
                        paddingRight: isRtl ? 0 : 15,
                      }}
                    />
                  )}
                >
                  <ItemsWrapper>
                    {cartItemsCount > 0 ? (
                      cartItems.map((item: { id: any }) => (
                        <OrderItem key={`cartItem-${item.id}`} product={item} />
                      ))
                    ) : (
                      <>
                        <NoProductImg>
                          <NoCartBag />
                        </NoProductImg>

                        <NoProductMsg>محصولی یافت نشد</NoProductMsg>
                      </>
                    )}
                  </ItemsWrapper>
                </Scrollbars>

                <CalculationWrapper>
                  <TextWrapper>
                    <Text>جمع قیمت</Text>
                    <Text>
                      {cart && digitsEnToFa(addCommas(cart.total_price))}
                      <span> </span>
                      {CURRENCY}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>هزینه ارسال</Text>
                    <Text>
                      0.00 <span> </span>
                      {CURRENCY}
                    </Text>
                  </TextWrapper>

                  <TextWrapper>
                    <Text>تخفیف</Text>
                    <Text>
                      {calculateDiscount()}
                      <span> </span>
                      {CURRENCY}
                    </Text>
                  </TextWrapper>

                  <TextWrapper style={{ marginTop: 20 }}>
                    <Bold>
                      جمع کل
                      {/* <Small>
                        (
                        <FormattedMessage
                          id='vatText'
                          defaultMessage='Incl. VAT'
                        />
                        )
                      </Small> */}
                    </Bold>
                    <Bold>
                    {cart && digitsEnToFa(addCommas(cart.total_price))}
                      <span> </span>
                      {CURRENCY}
                    </Bold>
                  </TextWrapper>
                </CalculationWrapper>
              </OrderInfo>
            </Sticky>
          </CartWrapper>
        </CheckoutContainer>
      </CheckoutWrapper>
    </form>
  );
};

export default CheckoutWithSidebar;
