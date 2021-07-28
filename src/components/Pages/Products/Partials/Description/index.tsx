import Rating from "@components/Rating/Rating";
import classNames from "classnames";
import { truncate } from "fs";
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { specification } from "src/site-settings/product";
import Truncate from '../../../../truncate/truncate';
import styles from './styles.module.scss';
import AddNewComment from '@features/user-profile/comments/AddNewComment/add-comment';
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";


interface DescProps {
  deviceType?: { mobile: boolean; tablet: boolean; desktop: boolean };
  data: any;
  comments: any;
  productId: any
}


function Desc({deviceType, data, comments, productId}: DescProps) {
  const cookies = new Cookies();
  const token = cookies.get('token');

  return (
    <Tabs
      selectedTabClassName={styles.tabItem}
      selectedTabPanelClassName="active show"
      default={true}
      defaultIndex={0}
      dir="rtl"
    >
      <div className="mb-2">
        <TabList className="d-flex justify-content-around ">
          <Tab style={{ borderColor: "transparent", boxShadow: "none" }}>
            <div className="d-flex flex-column align-items-center">
              <img src="/comments.png" style={{ width: 35, height: 40 }} />
              <div className={classNames("mt-2", styles.label)}>مشخصات فنی</div>
            </div>
          </Tab>

          <Tab style={{ borderColor: "transparent", boxShadow: "none" }}>
            <div className="d-flex flex-column align-items-center">
              <img src="/comments.png" style={{ width: 35, height: 40 }} />
              <div className={classNames("mt-2", styles.label)}>
                نظرات ({comments && comments.length})
              </div>
            </div>
          </Tab>

          <Tab style={{ borderColor: "transparent", boxShadow: "none" }}>
            <div className="d-flex flex-column align-items-center">
              <img src="/naghd.png" style={{ width: 35, height: 40 }} />
              <div className={classNames("mt-2", styles.label)}>
                نقد و بررسی
              </div>
            </div>
          </Tab>
        </TabList>

        <div className={classNames(styles["tab-content"])}>
          <TabPanel className={styles["tab-pane"]}>
            <div className="container">
              {data.features.map((item: any) => (
                <div className="row mb-2">
                  <div
                    className={classNames(
                      styles.specBox,
                      "col-12 col-sm-4 p-1 p-sm-2 ml-1 ml-sm-4 "
                    )}
                    style={{
                      borderRadius: ".5rem",
                    }}
                  >
                    <div
                      className={classNames(
                        styles.productSpecification,
                        "text-center text-sm-right"
                      )}
                    >
                      {item.title}
                    </div>
                  </div>
                  <div
                    className="col-12 col-sm-7 p-1 p-sm-2 my-2 my-sm-0"
                    style={{
                      backgroundColor: "#F5F5F5",
                      borderRadius: ".5rem",
                    }}
                  >
                    <div
                      className={classNames(
                        styles.productSpecification,
                        "text-center text-sm-right"
                      )}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabPanel>

          <TabPanel className={styles["tab-pane"]}>
            <div className="container">
              <div className="row">
                {comments &&
                  comments.map((item: any) => (
                    <div
                      className="col-12 mx-1 mb-4"
                      style={{ borderBottom: ".01rem solid #516EFF" }}
                    >
                      <div className="row">
                        <div className="col-12 col-sm-2 text-right text-sm-center mb-1 ">
                          <div
                            className={styles.label}
                            style={{ fontWeight: "bold" }}
                          >
                            {item.user.first_name + " " + item.user.last_name}
                          </div>
                        </div>
                        <div className="col-12 col-sm-10 mt-3 mt-sm-0 text-right text-sm-left  ">
                          <Rating ratingNumber={item.rate} />
                        </div>
                      </div>
                      <div className="my-2 mx-0 mx-md-5">
                        <Truncate
                          character={deviceType && deviceType.mobile ? 50 : 200}
                          more="بیشتر"
                          less="کمتر"
                        >
                          {item.text}
                        </Truncate>
                      </div>
                    </div>
                  ))}

                {/* ADD NEW COMMENT SECTION */}
                {token && (
                  <div
                    className={classNames(
                      "mt-5 p-3",
                      styles.newCommentContainer
                    )}
                  >
                    <AddNewComment productId={productId} />
                  </div>
                )}
              </div>
            </div>
          </TabPanel>

          <TabPanel className={styles["tab-pane"]}>
            <div className="container">
              <div className="row" style={{ direction: "ltr" }}>
                <div className="col-12 col-md-5">
                  <img src={data.photo_main} />
                </div>
                <div className="col-12 col-md-7 mt-4 ">
                  <Truncate
                    character={deviceType && deviceType.mobile ? 200 : 900}
                    more="بیشتر"
                    less="کمتر"
                  >
                    {data.description}
                  </Truncate>
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </div>
    </Tabs>
  );
}



export default Desc;
