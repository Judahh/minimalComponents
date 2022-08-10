import React, { createContext, useState } from 'react';
import { mount } from '@cypress/react';
import Input from '../../source/components/Input';
import { default as lightTheme } from '../../source/styles/themes/light.json';
import { default as darkTheme } from '../../source/styles/themes/dark.json';
import { ThemeProvider } from 'styled-components';
import Image from '../../source/components/Image';
import Notification from '../../source/components/Notification';
import {
  CopyrightText,
  Text,
  SubText,
  P,
  Quantity,
  H1, H2, H3, H4, H5, H6,
  Error,
  Notification as NotificationText,
  Link,
  FixedLink,
} from '../../source/components/Text';
import { Flags } from '../../source/components/Input/Switch/styles';
import NotificationContextModel from '../../source/components/Notification/notificationContextModel';
import { Bar, FlowType, Milk, Progress } from '../../source/components/Loading/Progress';
import Animation from '../../source/components/Loading/Animation';
import { Hanging, Rowling } from '../../source/components/Loading/Animation/styles';
import { Logo, LogoHolder } from '../../source/components/Image/Icons/styles';
import Modal from '../../source/components/Modal';
import Drawer from '../../source/components/Drawer';
import { Item, ItemHolder } from '../../source/components/Drawer/styles';
import ToggleButton from '../../source/components/Input/toggleButton';
import { CloseButton, TagList, Toggle } from '../../source/components/Input/styles';
import Table from '../../source/components/Table';
import { CloseType } from '../../source/components/Input/closeType';

const NotificationContext = createContext<NotificationContextModel>({setError:(_error?: boolean)=>{}, setText:(_text?:string)=>{}, setChildren:(_children?)=>{}, setTimer:(_timer?:number)=>{}});

const BasicAll = (props:{theme}) => {
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
  const personController = [
    {name: 'id', defaultValue: 0, type: 'number', hasAdd: true, hasDelete:true},
    {name: 'name', defaultValue: 'Someone', type: 'text', hasEdit: true},
    {name: 'age', defaultValue: 0, type: 'number', hasEdit: true},
  ];
  let people = [{
    id: 1,
    name: 'John Doe',
    age: 20,
  },{
    id: 2,
    name: 'Bob Smith',
    age: 18,
  }];
  const newPerson = {
    name: 'NEW',
    age: 25,
  };
  const [notificationTimer, setNotificationTimer] = useState<
    number | undefined
  >(60000);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const [isOpen2, setIsOpen2] = useState(false);
  const openModal2 = () => {
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    setIsOpen2(false);
  };


  return (
    <ThemeProvider theme={props.theme}>
      <div style={{backgroundColor: props.theme.background}}>
        <Drawer
          top={true}
          navToggleIndexes={[0]}
          nav={
            (<>
              <ToggleButton>
                <Toggle>
                  <span></span>
                </Toggle>
              </ToggleButton>
              <LogoHolder>
                <Link to="/">
                  <FixedLink >
                    <Logo alt="catalog" />
                  </FixedLink>
                </Link>
              </LogoHolder>
              <LogoHolder>
                <Link to="/cart">
                  <FixedLink>
                    <Logo alt="cart"
                    />
                  </FixedLink>
                </Link>
              </LogoHolder>
            </>)
          }
        >
          <Item>
            <ItemHolder>
              A
            </ItemHolder>
          </Item>
          <Item>
            <ItemHolder>
              B
            </ItemHolder>
          </Item>
        </Drawer>
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

        <Modal
            isOpen={isOpen}
            setClose={closeModal}
            onRequestClose={closeModal}
            setOpen={openModal}
            ariaHideApp={false}
            closeType={CloseType.x}
          >
          <Image images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf', 'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg']} alt={'3'} />
        </Modal>

        <Modal
            title={'Modal Title'}
            isOpen={isOpen2}
            setClose={closeModal2}
            onRequestClose={closeModal2}
            setOpen={openModal2}
            ariaHideApp={false}
            closeType={CloseType.red}
          >
          <Image images={['https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8', 'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf', 'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg']} alt={'3'} />
        </Modal>
        <Table
          controllers={personController}
          data={people}
          new={newPerson}
          add={(value)=>{
            value?.id?.[1]?.(Math.random());
            console.log('add', value);
            people = [...people, value];
            console.log('people', people);
            //@ts-ignore
            newPerson?.id?.[1]?.(undefined);
          }}
          delete={(index)=>{people = people.splice(index, 1)}}
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
        <Input
          type={'checkbox'}
          style={{
            height: '20px',
            width: '20px',
          }}
          checked={true}
          onChange={(a)=>{console.log('Checkbox', a);}}
        />
        <TagList>
          <Input value={'tag 0'}/>
          <Input value={'tag 1'}/>
        </TagList>
        <CloseButton closeType={CloseType.red} />
        <CloseButton closeType={CloseType.x} />
        <Input type={'button'} value={'Link'}/>
        <Input filled={true} type={'submit'} value={'Submit'}/>
        <Input filled={true} color={'red'} type={'reset'} value={'Red'}/>
        <Input filled={true} color={'yellow'} type={'button'} value={'Edit'}/>
        <Input filled={true} color={'red'} type={'button'} value={'-'}/>
        <Input color={'green'} type={'button'} value={'-'}/>
        <Input filled={true} invert={true} type={'button'} value={'-'} color={'red'}/>
        <Input filled={true} type={'button'} value={'-'} color={'green'}/>
        <Input filled={true} type={'file'} value={'File'} onChange={(a)=>{console.log('FILE', a);}}/>
        <Flags>
          <Input
            type="submit"
            value={'BR'}
          />
          <Input
            type="submit"
            value={'EN'}
          />
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
        <P>Paragraph</P><br /><br />
        <Quantity>13</Quantity><br /><br />
        <Error>Error</Error>
        <NotificationText>Notification</NotificationText>
        <Link>Link</Link>
        <FixedLink>FixedLink</FixedLink>
        <Progress id={0} max={12} current={6} percentage={true} flow={FlowType.bottomToTop}><Milk/></Progress>
        <Progress id={1} max={12} current={6} percentage={true} flow={FlowType.leftToRight} width={200} height={100}><Bar/></Progress>
        <Progress id={2} max={12} current={6} percentage={true} flow={FlowType.bottomToTop} width={100} height={200}><Bar/></Progress>
        <Animation Animation={Rowling}><Logo source={'img/bag.svg'}/></Animation>
        <Animation Animation={Hanging}><Logo source={'img/bag.svg'}/></Animation>
        <Animation Animation={Rowling} anti={true}><Logo source={'img/bag.svg'}/></Animation>
        <Input type={'button'} onClick={()=>openModal()} value={'Open Modal'}/><br /><br />
        <Input type={'button'} onClick={()=>openModal2()} value={'Open Modal 2'}/><br /><br />
        <Drawer
          navToggleIndexes={[0]}
          nav={
            (<>
              <ToggleButton>
                <Toggle>
                  <span></span>
                </Toggle>
              </ToggleButton>
              <LogoHolder>
                <Link to="/">
                  <FixedLink >
                    <Logo alt="catalog" />
                  </FixedLink>
                </Link>
              </LogoHolder>
              <LogoHolder>
                <Link to="/cart">
                  <FixedLink>
                    <Logo alt="cart"
                    />
                  </FixedLink>
                </Link>
              </LogoHolder>
            </>)
          }
        >
          <Item>
            <ItemHolder>
              A
            </ItemHolder>
          </Item>
          <Item>
            <ItemHolder>
              B
            </ItemHolder>
          </Item>
        </Drawer>
      </div>
    </ThemeProvider>
  );
}

it('can mount a light theme', () => {
  mount(<BasicAll theme={lightTheme}/>);
});

it('can mount a dark theme', () => {
  mount(<BasicAll theme={darkTheme}/>);
});
