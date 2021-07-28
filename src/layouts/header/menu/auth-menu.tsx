import Link from 'next/link';
import React from 'react';
import { Button } from '../../../components/button/button';
import Popover from '../../../components/popover/popover';
import { UserAvatar } from '../header.style';
import { AuthorizedMenu } from './authorized-menu';

interface Props {
  isAuthenticated: boolean;
  onJoin?: () => void;
  onLogout?: () => void;
  avatar?: string;
}

const AuthMenu = ({ isAuthenticated, onJoin, onLogout, avatar }: Props) => {
  return !isAuthenticated ? (
    <Button
      variant="outlined"
      style={{ borderColor: "gray", color: "#000000" }}
      onClick={onJoin}
    >
      حساب کاربری
      <img
        src="/profile.svg"
        style={{ width: 15, height: 19, marginLeft: 7 }}
      />
    </Button>
  ) : (
    <Popover
      direction="right"
      className="user-pages-dropdown"
      handler={<img src={avatar} alt="user" style={{height: 50, width: 50, borderRadius: '5rem'}} />}
      content={<AuthorizedMenu onLogout={onLogout} />}
    />
  );
};
export default AuthMenu;
