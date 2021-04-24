import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  LinkWrapper,
  LinksGroup,
  PageBaseStyled,
  PageHeader,
  PageLogo,
  PageContentWrapper,
} from './PageBase.styled';
import WEXT_Logo from '../../assets/img/WEXT_logo.jpg';
import { smallerThanTabletLandscape } from '../../styles/media';

// Ajax
import Axios from '../../service/axios';

// Constants
import { USER, CSRF_TOKEN_LS_KEY } from '../../constants/authConstants';

// Router
import { Link, useHistory } from 'react-router-dom';

const LogoLink = styled(LinkWrapper)`
  border: none;
  padding: 0;
  height: 80px;
  width: 300px;
  margin: 0;
  @media (${smallerThanTabletLandscape}) {
    width: 400px;
    height: auto;
  }
`;

const LogoutLink = styled(LinkWrapper)`
  cursor: pointer;
`;

function PageBase({ children, className, ...props }) {
  const [adminUrl, setAdminUrl] = useState('');
  const history = useHistory();
  const handleLogout = () => {
    Axios.delete('token/');
    localStorage.removeItem(CSRF_TOKEN_LS_KEY);
    localStorage.removeItem(USER);
    history.replace('/');
  };

  useEffect(() => {
    if (localStorage.getItem(USER)) {
      Axios.get('/users/').then(({ data }) => setAdminUrl(data?.results[0].admin_url || ''));
    }
  }, []);

  return (
    <PageBaseStyled {...props}>
      <PageHeader>
<<<<<<< HEAD
        <LogoLink>
          <Link to="/">
            <PageLogo src={dearLogo} alt="DEAR logo" />
          </Link>
        </LogoLink>
        <LinksGroup>
          {localStorage.getItem(USER) && (
            <LinkWrapper>
              <Link to="/">New Petition</Link>
            </LinkWrapper>
          )}
          <LinkWrapper>
            <Link to="/help">Help</Link>
          </LinkWrapper>
          {adminUrl ? (
            <LinkWrapper>
              <a href={adminUrl}>Admin</a>
            </LinkWrapper>
          ) : null}
          <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
        </LinksGroup>
=======
          <LogoLink href='/'>
            <PageLogo src={WEXT_Logo} alt="WNC Expungement Tool logo" />
          </LogoLink>
          <LinksGroup>
            {localStorage.getItem(USER) && <Link href='/'>New Petition</Link>}
            {adminUrl ? <Link href={adminUrl}>Admin</Link> : null}
            <LogoutLink onClick={handleLogout}>Logout</LogoutLink>
          </LinksGroup>
>>>>>>> replace DEAR logo with WExT logo
      </PageHeader>
      <PageContentWrapper className={className}>{children}</PageContentWrapper>
    </PageBaseStyled>
  );
}

export default PageBase;
