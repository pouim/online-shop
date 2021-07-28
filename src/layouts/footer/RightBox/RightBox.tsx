import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const RightBox = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center mt-2">
      <div>
        <h3 style={{color: '#000'}}>لینک های مفید</h3>
      </div>

      <div className="d-flex align-items-center mt-4">
        <div className="mr-4">
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">محصولات</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">حریم خصوصی</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">همکاری با ما</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">درباره ما</h4>
            </a>
          </Link>
        </div>
        <div>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">محصولات</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">حریم خصوصی</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">همکاری با ما</h4>
            </a>
          </Link>
          <Link href="#">
            <a className="text-decoration-none" style={{ color: "#77798C" }}>
              <h4 className="p-1">درباره ما</h4>
            </a>
          </Link>
        </div>
      </div>

        <div className="d-flex mt-4 ml-5 " >
            <Link href="#"><a><img className={styles.certificatedIcons} src="/images/shop/enamad.png" alt="نماد اعتماد الکترونیکی" /></a></Link>
            <Link href="#"><a><img className={styles.certificatedIcons} src="/samandehi-1.png" alt="نماد ساماندهی"/></a></Link>
        </div>
    </div>
  );
};

export default RightBox;
