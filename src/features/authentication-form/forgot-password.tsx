import React, { useContext } from 'react';
import {
  Wrapper,
  Container,
  LogoWrapper,
  Heading,
  SubHeading,
  // Input,
  Button,
  LinkButton,
  Offer,
} from './authentication-form.style';

import { Input } from '@components/forms/input';
import { AuthContext } from '@context/auth/auth.context';
export default function ForgotPasswordModal() {
  const { authDispatch } = useContext<any>(AuthContext);

  const toggleSignInForm = () => {
    authDispatch({
      type: 'SIGNIN',
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        <Heading>
           Forgot Password
        </Heading>

        <SubHeading>
           We'll send you a link to reset your password  
        </SubHeading>

        <Input
          type='text'
          placeholder= 'Email Address or Contact No.'
          height='48px'
          backgroundColor='#F7F7F7'
          mb='10px'
        />

        <Button
          variant='primary'
          size='big'
          style={{ width: '100%' }}
          type='submit'
        >
          Reset Password
        </Button>
        <Offer style={{ padding: '20px 0 0' }}>
           Back to  
          <LinkButton onClick={toggleSignInForm}>
             Login
          </LinkButton>
        </Offer>
      </Container>
    </Wrapper>
  );
}
