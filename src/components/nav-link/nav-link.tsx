import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { withRouter } from 'next/router';


type NavLinkProps = {
  router: any;
  href: string;
  label: string;
  intlId?: string;
  icon?: any;
  className?: string;
  iconClass?: string;
  dynamic?: boolean;
  onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink: React.FC<NavLinkProps> = ({
  href,
  label,
  intlId,
  router,
  icon,
  className,
  onClick,
  iconClass,
  dynamic,
}) => {
  const isCurrentPath = router.pathname === href || router.asPath === href;
  return (
    <div onClick={onClick} className={className ? className : ""}>
      {dynamic ? (
        <Link href={"/[type]"} as={href}>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
            aria-haspopup="true"
          >
            {icon ? <img src={icon} /> : ""}

            <span className="label">{label}</span>
          </a>
        </Link>
      ) : (
        <Link href={href}>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            aria-haspopup="true"
          >
            <span className="label" style={{ fontSize: "16px" }}>
              {label}
            </span>
            {icon ? (
              <img
                className="ml-2"
                style={{ height: 18, width: 18 }}
                src={icon}
                alt="icon"
              />
            ) : (
              ""
            )}
          </a>
        </Link>
      )}
    </div>
  );
};

export default withRouter(NavLink);
