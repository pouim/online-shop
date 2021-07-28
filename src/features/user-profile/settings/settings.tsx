import React, { useContext } from 'react';
import { Col } from 'react-styled-flexboxgrid';
import { openModal } from '@redq/reuse-modal';
import RadioCard from '@components/radio-card/radio-card';
import { ProfileContext } from '@context/profile/profile.context';

import {
  SettingsForm,
  SettingsFormContent,
  HeadingSection,
  Title,
  // Input,
  Row,
  ButtonGroup,
} from '../UserAccountInfo/settings.style';
import RadioGroup from '@components/radio-group/radio-group';

import UpdateAddress from '@features/user-profile/my-location/address-card/address-card';
import UpdateContact from '@components/contact-card/contact-card';
import { Button } from '@components/button/button';
import { Input } from '@components/forms/input';

import { Label } from '@components/forms/label';

type SettingsContentProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};

const SettingsContent: React.FC<SettingsContentProps> = ({ deviceType }) => {
  const { state, dispatch } = useContext(ProfileContext);
 

  const { address, card } = state;
  

  const contact = [
     {
       id: 0,
       type: 'primary',
       number: 9335274005,
     },
     {
      id: 0,
      type: 'secondary',
      number: 9118372920,
    }
  ];

  const handleChange = (e: { target: { value: any; name: any; }; }) => {
    const { value, name } = e.target;
    dispatch({
      type: 'HANDLE_ON_INPUT_CHANGE',
      payload: { value, field: name },
    });
  };
  // Add or edit modal
  const handleModal = (
    modalComponent: any,
    modalProps = {},
    className: string = 'add-address-modal'
  ) => {
    openModal({
      show: true,
      config: {
        width: 360,
        height: 'auto',
        enableResizing: false,
        disableDragging: true,
        className: className,
      },
      closeOnClickOutside: true,
      component: modalComponent,
      componentProps: { item: modalProps },
    });
  };

  const handleEditDelete = async (item: any, type: string, name: string) => {
    if (type === 'edit') {
      const modalComponent = name === 'address' ? UpdateAddress : UpdateContact;
      handleModal(modalComponent, item);
    } else {
      console.log(name, item, type, 'delete');
      switch (name) {
        case 'payment':
          dispatch({ type: 'DELETE_CARD', payload: item.id });

        case 'contact':
          dispatch({ type: 'DELETE_CONTACT', payload: item.id });

        case 'address':
          dispatch({ type: 'DELETE_ADDRESS', payload: item.id });

        default:
          return false;
      }
    }
  };

  const handleSave = async () => {
    
  };

  return (
    <SettingsForm>
      <SettingsFormContent>
        <HeadingSection>
          <Title>
             Your Profile  
          </Title>
        </HeadingSection>
        <Row style={{ alignItems: 'flex-end', marginBottom: '50px' }}>
          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
               Your Name
            </Label>
            <Input
              type='text'
              label='Name'
              name='name'
              value={state.name}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              height='48px'

            />
          </Col>

          <Col xs={12} sm={5} md={5} lg={5}>
            <Label>
               Your Email  
            </Label>
            <Input
              type='email'
              name='email'
              label='Email Address'
              value={state.email}
              onChange={handleChange}
              backgroundColor='#F7F7F7'
              // intlInputLabelId="profileEmailField"
            />
          </Col>

          <Col xs={12} sm={2} md={2} lg={2}>
            <Button size='big' style={{ width: '100%' }} onClick={handleSave}>
                Save    
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                  Contact Numbers
                </Title>
              </HeadingSection>
              <ButtonGroup>
                <RadioGroup
                  items={contact}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.type}
                      content={item.number}
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_CONTACT',
                          payload: item.id.toString(),
                        })
                      }
                      name='contact'
                      onEdit={() => handleEditDelete(item, 'edit', 'contact')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'contact')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      size='big'
                      variant='outlined'
                      type='button'
                      className='add-button'
                      onClick={() =>
                        handleModal(UpdateContact, {}, 'add-contact-modal')
                      }
                    >
                      Add Contact
                    </Button>
                  }
                />
              </ButtonGroup>
            </SettingsFormContent>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} style={{ position: 'relative' }}>
            <SettingsFormContent>
              <HeadingSection>
                <Title>
                   Delivery Address
                </Title>
              </HeadingSection>
              <ButtonGroup>
                <RadioGroup
                  items={address}
                  component={(item: any) => (
                    <RadioCard
                      id={item.id}
                      key={item.id}
                      title={item.name}
                      content={item.info}
                      name='address'
                      checked={item.type === 'primary'}
                      onChange={() =>
                        dispatch({
                          type: 'SET_PRIMARY_ADDRESS',
                          payload: item.id.toString(),
                        })
                      }
                      onEdit={() => handleEditDelete(item, 'edit', 'address')}
                      onDelete={() =>
                        handleEditDelete(item, 'delete', 'address')
                      }
                    />
                  )}
                  secondaryComponent={
                    <Button
                      size='big'
                      variant='outlined'
                      type='button'
                      className='add-button'
                      onClick={() =>
                        handleModal(UpdateAddress, {}, 'add-address-modal')
                      }
                    >
                     Add Address
                    </Button>
                  }
                />
              </ButtonGroup>
            </SettingsFormContent>
          </Col>
        </Row>

      </SettingsFormContent>
    </SettingsForm>
  );
};

export default SettingsContent;
