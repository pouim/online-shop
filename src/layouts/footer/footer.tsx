import styled from 'styled-components';
import css from '@styled-system/css';
import TelInput from './TelInput/TelInput';
import React from 'react';
import ContactUs from './ContactUs/ContactUs';
import RightBox from './RightBox/RightBox';
import styles from './styles.module.scss';
// import { FormattedMessage } from 'react-intl';
const Box = styled.div(
  css({
    fontFamily: 'body',
    fontSize: 'sm',
    fontWeight: 'regular',
    color: 'text.regular',
    px: 20,
    overflow: 'hidden',

    a: {
      color: 'text.regular',
    },
  }),
  {
    // marginTop: 50,
    // width: '100%',
    textAlign: 'center',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  }
);
const Footer = () => {
  return (
    <Box>
      <div className="container-fluid" style={{marginTop: '5rem'}}>
        <div className="row">

          <div className="col-md-4">
            <img src="/images/shop/contactus/map.png" style={{width: 400, height:200}} />
            <TelInput
              btnTitle="ثبت"
              inputPlaceholder="ثبت شماره برای اطلاع از تخفیف ها "
  
            />
            <ContactUs />
          </div>

          <div className="col-md-4 mb-2 mt-4 mt-md-2">
            <h3 className="mb-4" style={{color: '#000'}}>راه های ارتباطی</h3>
            <div className="d-flex align-items-center justify-centent-center ">
                <div className="ml-5 ml-sm-0">
                  <h5>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ 
                  </h5>
                  <h5>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ 
                  </h5>
                </div>
                <div className="mb-4 ">
                <img className={styles.icon} src="/images/shop/contactus/location.svg" />
                </div>
            </div>

            <div className="d-flex mt-3 " style={{justifyContent: 'center', marginLeft: '18%'}}>
                <div>
                  <h5>
                    021-33951766/021-3394651
                  </h5>
                </div>
                <div className="ml-2">
                <img className={styles.icon} src="/images/shop/contactus/phone.svg" />
                </div>
            </div>

          </div>

          <div className="col-md-4">
             <RightBox />

          </div>
        </div>
        <h5 className="mt-5">تمامی حقوق مادی و معنوی این وب سایت برای فروشگاه اینترنتی الفبای برق محفوظ است</h5>
      </div>
    </Box>
  );
};
export default Footer;
