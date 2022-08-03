import React, { createContext } from 'react';
import { mount } from '@cypress/react';
import Input from '../../src/components/Input';
import { default as lightTheme } from '../../src/styles/themes/light.json';
import { default as darkTheme } from '../../src/styles/themes/dark.json';
import { ThemeProvider } from 'styled-components';
import Checkbox from '../../src/components/Input/CheckBox';
import { TagList, Tag } from '../../src/components/Input/Tag';
import { ChangePicButton, CloseButton, ColorButton, DeleteButton, CleanButton, LinkButton, LocationButton, RedButton, SubmitButton } from '../../src/components/Input/Button';
import { CloseType } from '../../src/components/Input/Button/closeType';
import FileButton from '../../src/components/Input/Button/FileButton';
import Image from '../../src/components/Image';
import Notification from '../../src/components/Notification';
import {
  CopyrightText,
  Text,
  SubText,
  MediumText,
  P,
  Quantity,
  H1, H2, H3, H4, H5, H6,
  Error,
  Notification as NotificationText,
  Link,
  FixedLink,
} from '../../src/components/Text';
import { Flags } from '../../src/components/Input/Switch/styles';
import NotificationContextModel from '../../src/components/Notification/notificationContextModel';
import useState from './useStateMock';

const NotificationContext = createContext<NotificationContextModel>({setError:(_error?: boolean)=>{}, setText:(_text?:string)=>{}, setChildren:(_children?)=>{}, setTimer:(_timer?:number)=>{}});

const basicAll = (theme) => {
  const [notificationText, setNotificationText] = useState<string | undefined>(
    'TEST Notification Text'
  );
  const [notificationChildren, setNotificationChildren] = useState<
    [] | undefined
  >([]);
  const [notificationError, setNotificationError] = useState<
    boolean | undefined
  >(false);
  const [notificationError2, setNotificationError2] = useState<
    boolean | undefined
  >(true);
  const [notificationTimer, setNotificationTimer] = useState<
    number | undefined
  >(60000);


  return (
    <ThemeProvider theme={theme}>
      <div style={{backgroundColor: theme.background}}>
        <NotificationContext.Provider
                value={{
                  timer: notificationTimer,
                  children: notificationChildren,
                  text: notificationText,
                  error: notificationError,
                  setTimer: setNotificationTimer,
                  setChildren: setNotificationChildren,
                  setText: setNotificationText,
                  setError: setNotificationError,
                }}
        >
          <Notification context={NotificationContext} />
        </NotificationContext.Provider>
        <NotificationContext.Provider
                value={{
                  timer: notificationTimer,
                  children: notificationChildren,
                  text: notificationText,
                  error: notificationError2,
                  setTimer: setNotificationTimer,
                  setChildren: setNotificationChildren,
                  setText: setNotificationText,
                  setError: setNotificationError2,
                }}
        >
          <Notification context={NotificationContext} />
        </NotificationContext.Provider>
        <Input
          style={{
              fontSize: '16px',
              width: 'calc( 60% - 20px )',
              float: 'left',
              display: 'flex',
              padding: '10px',
              margin: '0px 5px',
            }}
          defaultValue={0}
          name="quantity"
          type="search"
          closeType={CloseType.red}
        />
        <Input
          style={{
              fontSize: '16px',
              width: 'calc( 60% - 20px )',
              float: 'left',
              display: 'flex',
              padding: '10px',
              margin: '0px 5px',
            }}
          defaultValue={0}
          name="quantity"
          type="search"
          closeType={CloseType.x}
        />
        <Checkbox
          style={{
            height: '20px',
            width: '20px',
          }}
          checked={true}
          onChange={(a)=>{console.log('Checkbox', a);}}
        />
        <TagList>
          <Tag>asdfasdf</Tag>
          <Tag>jfgj</Tag>
        </TagList>
        <CloseButton closeType={CloseType.red} />
        <CloseButton closeType={CloseType.x} />
        <LinkButton>Link</LinkButton>
        <SubmitButton>Submit</SubmitButton>
        <RedButton>Red</RedButton>
        <CleanButton>Edit</CleanButton>
        <ChangePicButton>-</ChangePicButton>
        <DeleteButton>-</DeleteButton>
        <ColorButton color={'red'}>-</ColorButton>
        <ColorButton color={'green'}>-</ColorButton>
        <LocationButton>Location</LocationButton>
        <FileButton Button={(p: {onClick}) => (<LinkButton onClick={p.onClick}>FILE</LinkButton>)} onChange={(a)=>{console.log('Checkbox', a);}}/>
        <Flags>
          <CleanButton
            type="submit"
          >
            <Text>BR</Text>
          </CleanButton>
          <CleanButton
            type="submit"
          >
            <Text>EN</Text>
          </CleanButton>
        </Flags>
        <Image images={['https://cdn.shopify.com/s/files/1/0076/0994/2086/articles/pexels-rachel-claire-5490975_1500x1001_crop_bottom.jpg?v=1627672147']} alt={'single'} />
        <Image images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf']} alt={'2'} />
        <Image images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf', 'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg']} alt={'3'} />
        <CopyrightText >CopyrightText</CopyrightText>
        <H1>Title</H1>
        <H2>Subtitle</H2>
        <H3>Subtitle 2</H3>
        <H4>Subtitle 3</H4>
        <H5>Subtitle 4</H5>
        <H6>Subtitle 5</H6>
        <Text>Text</Text>
        <SubText>SubText</SubText>
        <MediumText>MediumText</MediumText>
        <P>Paragraph</P><br /><br />
        <Quantity>13</Quantity><br /><br />
        <Error>Error</Error>
        <NotificationText>Notification</NotificationText>
        <Link>Link</Link>
        <FixedLink>FixedLink</FixedLink>
      </div>
    </ThemeProvider>
  );
}

it('can mount a light theme', () => {
  mount(basicAll(lightTheme));
});

it('can mount a dark theme', () => {
  mount(basicAll(darkTheme));
});
