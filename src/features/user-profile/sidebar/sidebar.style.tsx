import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import NavLink from '@components/nav-link/nav-link';

const SidebarWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  background-color: ${themeGet('colors.primary.regular', '#516EFF')};
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
  border: 1px solid rgba( 255, 255, 255, 0.18 );
  color: ${themeGet('colors.white', '#FFFFFF')};
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
`;

const SidebarBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 0;
  background-color: ${themeGet('colors.primary.regular', '#516EFF')};
`;

const SidebarMenu = styled(NavLink)<any>`
  display: flex;
  a {
    font-family: ${themeGet('fonts.body', 'Lato')};
    font-size: ${themeGet('fontSizes.base', '15')}px;
    justify-content: space-between;
    font-weight: ${themeGet('fontWeights.bold', '700')};
    color: ${themeGet('colors.white', '#FFFFFF')};
    transition: color 0.35s ease;
    padding: 8px 65px;
    min-width: 250px;

   


    &.current-page {
      color: ${themeGet('colors.white', '#FFFFFF')};
      border: 0.05rem solid rgba(255,255,255, 0.3);
      border-radius: 2rem;
      background-color: rgba(255,255,255, 0.01);
      transition : 1s ease;
    }

    &:hover {
      border: 0.05rem solid rgba(255,255,255, 0.3);
      border-radius: 2rem;
      background-color: rgba(255,255,255, 0.01);
      transition : 1s ease;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  text-align: right;
  cursor: pointer;
  font-family: ${themeGet('fonts.body', 'Lato')};
  font-size: 25px;
  font-weight: ${themeGet('fontWeights.bold', '700')};
  color: ${themeGet('colors.text.bold', '#0D1136')};
  transition: color 0.35s ease;
  padding: 15px 60px;
  outline: 0;

  &:hover {
    color: ${themeGet('colors.primary.regular', '#009e7f')};
  }

  &:focus {
    box-shadow: none;
  }

  margin-bottom: 0;
`;

export { SidebarWrapper, SidebarTop, SidebarBottom, SidebarMenu, LogoutButton };
