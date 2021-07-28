import { Modal } from "@redq/reuse-modal";
import {
  PageWrapper,
  SidebarSection,
  ContentBox,
} from "@features/user-profile/user-profile.style";
import Sidebar from "@features/user-profile/sidebar/sidebar";
import { SEO } from "@components/seo";
import CommentsCard from "@features/user-profile/comments/Comments-card";
import React, { FC, useEffect, useState } from "react";
import Sticky from "react-stickynode";
import jwtAxios, { setAuthToken } from "src/axios-config/jwtAxios";
import { useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import { AppState } from "@store/store";




const CommentsPage  = () => {
  const [myComments, setMyComments] = useState<any>();
  const {user} = useSelector((state: AppState) => state.auth);
  const userId = user && user.id;

  const fetchComments = async () => {
    try {
      console.log("fetching my comments started");
      const cookeis = new Cookies();
      const token = cookeis.get('token');
      if (token) {
        setAuthToken(token);
      }
      const res = await jwtAxios.get(`comments/?user__id=${userId}`);
      setMyComments(res.data);
      console.log("fetching my comments succed", res.data);
    } catch (error) {
      console.log("fetching my comments failed", error);
    }
  };

  useEffect(() => {
    fetchComments();
}, []);
  return (
    <>
      <SEO title="فروشگاه الفبای روشنایی" description="فروشگاه الفبای روشنایی - نظرات من" />
      <div>
        <PageWrapper>
          <ContentBox>
            {myComments && myComments.map((comment: any) => (
              <CommentsCard comment={comment && comment} />
            ))}
          </ContentBox>
          <SidebarSection>
            <Sticky enabled={true} top={110}  bottomBoundary={700}>
              <Sidebar />
            </Sticky>
          </SidebarSection>
        </PageWrapper>
      </div>
    </>
  );
};

export default CommentsPage;
