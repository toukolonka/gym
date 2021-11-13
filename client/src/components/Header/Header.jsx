import React, { useContext } from 'react';

import NavigationBar from './NavigationBar';
import NavigationBarMobile from './NavigationBarMobile';
import { AuthContext } from '../../context/auth';

const Header = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {user
      && (
      <>
        <NavigationBar />
        <NavigationBarMobile />
      </>
      )}
    </>
  );
};

export default Header;
