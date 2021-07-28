import React from 'react';
import { dashboardMenuItems } from 'src/site-settings/dashboard-menu';
import NavLink from '../../../components/nav-link/nav-link';

type Props = {
  onLogout?: () => void;
};

export const AuthorizedMenu: React.FC<Props> = ({ onLogout }) => {
  return (
    <>
      {dashboardMenuItems.map((item, idx) => (
        <NavLink
          key={idx}
          className="menu-item"
          href={item.link}
          label={item.label}

        />
      ))}
      <div className="menu-item text-right" onClick={onLogout}>
        <a>
          <span>
            خروج
          </span>
        </a>
      </div>
    </>
  );
};
