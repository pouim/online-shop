import Link from 'next/link';
import React from 'react'
import styles from './styles.module.scss';


const ContactUs = () => {
    return (
      <div className="d-flex align-items-center justify-content-center p-0 px-sm-1 mb-1" style={{backgroundColor: '#516EFF', borderRadius: '2rem'}}>
         <Link href="#"><a className="p-3"><img className={styles.image} src="/images/shop/contactus/instagram.svg" /></a></Link>
         <Link href="#"><a className="p-3"><img className={styles.image} src="/images/shop/contactus/film.svg" /></a></Link>
         <Link href="#"><a className="p-3"><img className={styles.image} src="/images/shop/contactus/whatsapp.svg"  /></a></Link>
         <Link href="#"><a className="p-3"><img className={styles.image} src="/images/shop/contactus/telegram.svg" /></a></Link>
      </div>
    );
};

export default ContactUs