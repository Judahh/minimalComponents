import React, { createContext, useEffect } from 'react';
import useState from 'react-usestateref';
import { mount } from '@cypress/react18';
import Input from '../../source/components/Input';
import { default as lightTheme } from '../../source/styles/themes/light.json';
import { default as darkTheme } from '../../source/styles/themes/dark.json';
import { ThemeProvider } from 'styled-components';
import Image from '../../source/components/Image';
import Notification from '../../source/components/Notification';
import {
  Text,
  P,
  Quantity,
  Error,
  Notification as NotificationText,
  Link,
  FixedLink,
} from '../../source/components/Text';
import NotificationContextModel from '../../source/components/Notification/notificationContextModel';
import {
  Bar,
  FlowType,
  Milk,
  Progress,
} from '../../source/components/Loading/Progress';
import Animation from '../../source/components/Loading/Animation';
import {
  Falling,
  Hanging,
  Rowling,
} from '../../source/components/Loading/Animation/styles';
import Collapsible from '../../source/components/Collapsible';
import Modal from '../../source/components/Modal';
import Drawer from '../../source/components/Drawer';
import List from '../../source/components/List';
import {
  DrawerItem,
  IconItem,
  ItemHolder,
} from '../../source/components/Drawer/styles';
import ToggleButton from '../../source/components/Input/toggleButton';
import {
  CloseButton,
  TagList,
  Toggle,
  Flags,
  FlagHolder,
} from '../../source/components/Input/styles';
import Table from '../../source/components/Table';
import { IconType } from '../../source/components/Input/icon';
import useObjectState from '../../source/components/Table/useObjectState';
// import SList from '../../source/components/List';
import SListItem from '../../source/components/List/Item';
// import SListAction from '../../source/components/List/Action';
import OpenButton from '../../source/components/Collapsible/openButton';
import Action from '../../source/components/List/Action';

const NotificationContext = createContext<NotificationContextModel>({
  setError: (_error?: boolean) => {},
  setText: (_text?: string) => {},
  setChildren: (_children?) => {},
  setTimer: (_timer?: number) => {},
});

const BasicAll = (props: { theme }) => {
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
  const [radio2, setRadio2] = useState<string | undefined>(undefined);

  useEffect(() => {
    console.log('radio2 changed', radio2);
  }, [radio2]);

  const personController = [
    {
      index: 'id',
      name: 'ID',
      defaultValue: 0,
      type: 'number',
      hasAdd: true,
      hasDelete: true,
      addProps: { inverted: true },
      deleteProps: { inverted: true },
    },
    {
      index: 'name',
      name: 'FULL NAME',
      defaultValue: 'Someone',
      type: 'text',
      hasEdit: true,
      actions: {
        onKeyDown: (e) => {
          console.log('name key:', e);
        },
      },
      inputStyle: {
        width: '100%',
        minWidth: '100%',
      },
    },
    {
      index: 'age',
      name: 'AGE',
      defaultValue: 0,
      type: 'number',
      hasEdit: true,
      actions: {
        onKeyDown: (e) => {
          console.log('age key:', e);
        },
      },
      inputStyle: {
        width: '50px',
        minWidth: '50px',
      },
      inputProps: {
        min: 1,
        max: 150,
      },
    },
    {
      index: 'enabled',
      name: 'ENABLED',
      defaultValue: true,
      type: 'checkbox',
      hasEdit: true,
      actions: {
        onClick: (indexes: [index: number, prop: string]) => {
          console.log('enabled value', indexes);
        },
      },
    },
    {
      index: 'blocked',
      name: 'BLOCKED',
      defaultValue: false,
      type: 'checkbox',
      hasEdit: true,
      actions: {
        onChange: (e, indexes: [index: number, prop: string]) => {
          console.log('blocked value', e.target.value, indexes);
        },
      },
    },
    {
      index: 'namingSystem',
      name: 'NAMING SYSTEM',
      defaultValue: 'ssd',
      type: 'test',
      hasEdit: true,
      actions: {
        onChange: (e, indexes: [index: number, prop: string]) => {
          console.log('namingSystem value', e.target.value, indexes);
        },
      },
    },
    {
      index: 'namingSystem2',
      name: 'NAMING SYSTEM2',
      defaultValue: 'ssd',
      type: 'test',
      hasEdit: true,
      actions: {
        onKeyUp: (e, indexes: [index: number, prop: string]) => {
          console.log('namingSystem2 value', e.target.value, indexes);
        },
      },
    },
  ];
  let [people, setPeople, addPerson, updatePeople, deletePeople] =
    useObjectState([
      {
        id: 1,
        name: 'John Doe',
        age: 20,
        enabled: true,
        blocked: false,
        namingSystem: 'ssd',
        namingSystem2: 'ssd',
      },
      {
        id: 2,
        name: 'Bob Smith',
        age: 18,
        enabled: false,
        blocked: true,
        namingSystem: 'ssv',
        namingSystem2: 'ssv',
      },
    ]);
  const basePerson = {
    name: 'NEW',
    age: 25,
    enabled: true,
    blocked: false,
    namingSystem: 'ssd',
    namingSystem2: 'ssd',
  };
  const [newPerson, setNewPerson, _addNewPerson, updateNewPerson] =
    useObjectState({ ...basePerson });
  const [notificationTimer, setNotificationTimer] = useState<
    number | undefined
  >(60000);
  const [isOpen, setIsOpen] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [searchValue, setSearchValue] = useState<string | undefined>(
    'asdfasdf'
  );
  const openModal = () => {
    console.log('openModal');
    setIsOpen(true);
  };
  const closeModal = () => {
    console.log('closeModal');
    setIsOpen(false);
  };
  const [isOpen2, setIsOpen2] = useState(false);
  const openModal2 = () => {
    console.log('openModal2');
    setIsOpen2(true);
  };
  const closeModal2 = () => {
    console.log('closeModal2');
    setIsOpen2(false);
  };

  useEffect(() => {}, [newPerson, people]);

  return (
    <ThemeProvider theme={props.theme}>
      <div style={{ backgroundColor: props.theme.background }}>
        <Drawer
          top={true}
          navToggleIndexes={[0]}
          nav={
            <>
              <List style={{ background: 'red' }}>
                <ToggleButton>
                  <Toggle>
                    <span></span>
                  </Toggle>
                </ToggleButton>
              </List>
              <List style={{ background: 'green' }}>
                <ItemHolder>
                  <Link to="/">
                    <FixedLink>
                      <IconItem size={'large'} alt="app" />
                    </FixedLink>
                  </Link>
                </ItemHolder>
              </List>
              <List style={{ background: 'blue' }}>
                <ItemHolder>
                  <Link to="/cart">
                    <FixedLink>
                      <IconItem size={'large'} alt="cart" />
                    </FixedLink>
                  </Link>
                </ItemHolder>
              </List>
            </>
          }
        >
          <DrawerItem>
            <ItemHolder>A</ItemHolder>
          </DrawerItem>
          <DrawerItem>
            <ItemHolder>B</ItemHolder>
          </DrawerItem>
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
          iconType={IconType.x}
        >
          <Image
            onClick={() => {
              console.log('image clicked');
            }}
            images={[
              'https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8',
              'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf',
              'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg',
            ]}
            alt={'3'}
            left={'<'}
            right={'>'}
          />
        </Modal>

        <Modal
          title={'Modal Title'}
          isOpen={isOpen2}
          setClose={closeModal2}
          onRequestClose={closeModal2}
          setOpen={openModal2}
          ariaHideApp={false}
          iconType={IconType.circle}
        >
          <Image
            onClick={() => {
              console.log('image clicked');
            }}
            images={[
              'https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8',
              'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf',
              'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg',
            ]}
            alt={'3'}
            left={'<'}
            right={'>'}
          />
        </Modal>
        <Table
          controllers={personController}
          data={people}
          update={updatePeople}
          new={newPerson}
          updateNew={updateNewPerson}
          add={(value) => {
            console.log('add:', value);
            if (value != undefined) {
              const newValue = {
                ...value,
                id: Math.round(Math.random() * 100),
              };
              addPerson?.(undefined, newValue);
            }
          }}
          delete={(index) => {
            if (index != undefined) {
              console.log('delete:', index);
              deletePeople?.([index]);
            }
          }}
          loading={false}
        />
        <TagList>
          <Input type={'button'} value={'tag 0'} />
          <Input type={'button'} value={'tag 1'} />
        </TagList>
        <br />
        <CloseButton iconType={IconType.circle} />
        <CloseButton iconType={IconType.x} />
        <br />
        <Input link type={'button'} value={'Link'} />
        <br />
        <Input big roudedEdges inverted type={'submit'} value={'Submit'} />
        <br />
        <Input
          big
          roudedEdges
          inverted
          color={'red'}
          type={'reset'}
          value={'Red'}
        />
        <br />
        <Input
          small
          noBackground
          color={'yellow'}
          type={'button'}
          value={'Edit'}
        />
        <br />
        <Input
          small
          noBackground
          inverted
          color={'yellow'}
          type={'button'}
          value={'Edit'}
        />
        <br />
        <Input
          small
          noBackground
          crude
          color={'yellow'}
          type={'button'}
          value={'Edit'}
        />
        <br />
        <Input
          small
          noBackground
          crude
          inverted
          color={'yellow'}
          type={'button'}
          value={'Edit'}
        />
        <br />
        <Input small crude color={'yellow'} type={'button'} value={'Edit'} />
        <br />
        <Input
          small
          crude
          inverted
          color={'yellow'}
          type={'button'}
          value={'Edit'}
        />
        <br />
        <Input
          roudedEdges
          inverted
          color={'red'}
          type={'button'}
          value={'−'}
          iconValue
        />
        <br />
        <Input
          roudedEdges
          color={'green'}
          type={'button'}
          value={'+'}
          iconValue
        />
        <br />
        <Input
          roudedEdges
          type={'button'}
          value={'−'}
          color={'red'}
          iconValue
        />
        <br />
        <Input
          roudedEdges
          noBackground
          type={'button'}
          value={'+'}
          color={'green'}
          iconValue
        />
        <br />
        <Input
          roudedEdges
          type={'file'}
          value={'File'}
          onChange={(a) => {
            console.log('FILE', a);
          }}
        />
        <Input
          roudedEdges
          type={'file'}
          label={'File2'}
          onChange={(a) => {
            console.log('FILE', a);
          }}
        />

        <Input
          roudedEdges
          type={'file'}
          onChange={(a) => {
            console.log('FILE', a);
          }}
        >
          File3
        </Input>
        <br />
        <br />
        <Input type="color" />
        <br />
        <Input type="image" />
        <br />
        <Input type="range" />
        <br />
        <br />
        <Input
          value={searchValue}
          setValue={setSearchValue}
          type="search"
          placeholder="maluko"
        />
        <br />
        <Input type="url" />
        <br />
        <Input type="email" />
        <br />
        <Input type="password" />
        <br />
        <Input type="number" />
        <br />
        <Input type="tel" />
        <br />
        <Input type="text" setValue={(a) => console.log('t0', a)} />
        <Input
          type="text"
          options={{ type: 'debounce', wait: 1000 }}
          setValue={(a) => console.log('t1', a)}
        />
        <Input
          type="text"
          options={{ type: 'throttle', wait: 1000 }}
          setValue={(a) => console.log('t2', a)}
        />
        <Input
          type="text"
          options={{ type: 'debounce' }}
          setValue={(a) => console.log('t3', a)}
        />
        <Input
          type="text"
          options={{ type: 'throttle' }}
          setValue={(a) => console.log('t4', a)}
        />
        <br />
        <br />
        <Input type="datetime-local" />
        <br />
        <Input type="date" />
        <br />
        <Input type="month" />
        <br />
        <Input type="week" />
        <br />
        <Input type="time" />
        <br />
        <br />
        <Input
          style={{ fontSize: '16px' }}
          defaultValue={0}
          name="quantity"
          type="search"
          closeIconType={IconType.circle}
        />
        <Input
          style={{ fontSize: '16px' }}
          defaultValue={0}
          name="quantity"
          type="search"
          closeIconType={IconType.x}
        />
        <Input
          type={'checkbox'}
          value={checkbox}
          setValue={setCheckbox}
          style={{
            height: '20px',
            width: '20px',
          }}
        />
        <Input
          type={'checkbox'}
          style={{
            height: '20px',
            width: '20px',
          }}
        />
        <Input
          name="radio"
          type={'radio'}
          style={{
            height: '20px',
            width: '20px',
          }}
        />
        <Input
          name="radio"
          type={'radio'}
          style={{
            height: '20px',
            width: '20px',
          }}
        />
        <Input
          tag
          name="radio2"
          type={'radio'}
          style={{
            height: '20px',
            width: '20px',
          }}
          roudedEdges
          id={'buy'}
          setValue={() => setRadio2('buy')}
          baseValue={'buy'}
          value={radio2}
        />
        <label htmlFor="buy">buy</label>
        <br />
        <Input
          tag
          name="radio2"
          type={'radio'}
          style={{
            height: '20px',
            width: '20px',
          }}
          roudedEdges
          id={'rent'}
          setValue={() => setRadio2('rent')}
          baseValue={'rent'}
          value={radio2}
        />
        <label htmlFor="rent">rent</label>
        <Input
          tag
          name="radio2"
          type={'radio'}
          style={{
            height: '20px',
            width: '20px',
          }}
          roudedEdges
          id={'bla'}
          setValue={() => setRadio2('bla')}
          baseValue={'bla'}
          value={radio2}
        />
        <label htmlFor="bla">bla</label>
        <List vertical>
          <SListItem
            leading={
              <>
                <Action
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>add');
                  }}
                >
                  add
                </Action>
                <Action
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>edit');
                  }}
                >
                  edit
                </Action>
              </>
            }
            onClick={(s, i, e) => console.log('>>click', s, i, e)}
            onHold={(s, i, e) => console.log('>>hold', s, i, e)}
            onHoldEnd={(s, i, e) => console.log('>>hold end', s, i, e)}
          >
            <Text>TEST</Text>
          </SListItem>
          <SListItem
            trailing={
              <>
                <Action
                  destructive
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>remove');
                  }}
                >
                  remove
                </Action>
              </>
            }
            onClick={(s, i, e) => console.log('>>click', s, i, e)}
            onHold={(s, i, e) => console.log('>>hold', s, i, e)}
            onHoldEnd={(s, i, e) => console.log('>>hold end', s, i, e)}
          >
            <Text>TEST</Text>
          </SListItem>
          <SListItem
            leading={
              <>
                <Action
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>add');
                  }}
                >
                  add
                </Action>
                <Action
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>edit');
                  }}
                >
                  edit
                </Action>
              </>
            }
            trailing={
              <>
                <Action
                  destructive
                  style={{ display: 'inline', margin: '0 5px' }}
                  onClick={() => {
                    console.log('>>remove');
                  }}
                >
                  remove
                </Action>
              </>
            }
            onClick={(s, i, e) => console.log('>>click', s, i, e)}
            onHold={(s, i, e) => console.log('>>hold', s, i, e)}
            onHoldEnd={(s, i, e) => console.log('>>hold end', s, i, e)}
          >
            <Text>TEST</Text>
          </SListItem>
        </List>
        <Collapsible
          before={
            <OpenButton openned={<Text>{'V'}</Text>}>
              <Text>{'>'}</Text>
            </OpenButton>
          }
          trigger={<Text>PARENT</Text>}
        >
          <Text>CHILD</Text>
        </Collapsible>
        <Collapsible
          before={
            <OpenButton rotate rotation={90} time={0.5}>
              <Text>{'>'}</Text>
            </OpenButton>
          }
          trigger={<Text>PARENT</Text>}
        >
          <Text>CHILD</Text>
        </Collapsible>
        <br />
        <br />
        <FlagHolder>
          <Flags>
            <Input type="submit" value={'BR'} />
            <Input type="submit" value={'EN'} />
            <Input type="submit" value={'RUS'} />
          </Flags>
        </FlagHolder>
        <br />
        <Image
          onClick={() => {
            console.log('image clicked');
          }}
          images={[
            'https://cdn.shopify.com/s/files/1/0076/0994/2086/articles/pexels-rachel-claire-5490975_1500x1001_crop_bottom.jpg?v=1627672147',
          ]}
          alt={'single'}
        />
        <Image
          images={[
            'https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8',
            'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf',
          ]}
          alt={'2'}
          maxHeight={'70%'}
        />
        <Image
          onClick={() => {
            console.log('image clicked');
          }}
          images={[
            'https://cf.shopee.com.br/file/5ec10ed168c77d023d2f54231e5d24f8',
            'https://cf.shopee.com.br/file/439843b0125bb0793cde7ec406739ebf',
            'https://ph-cdn3.ecosweb.com.br/imagens01/foto/moda-feminina/conjunto/conjunto-folhagem-de-blusa-com-amarracao-e-short_341333_301_1.jpg',
          ]}
          alt={'3'}
          leftElement={
            <>
              <Input
                roudedEdges
                color={'green'}
                type={'button'}
                value={'+'}
                iconValue
              />
              <Input
                roudedEdges
                type={'button'}
                value={'−'}
                color={'red'}
                iconValue
              />
            </>
          }
          rightElement={
            <>
              <Input
                roudedEdges
                color={'yellow'}
                type={'button'}
                value={'+'}
                iconValue
              />
              <Input
                roudedEdges
                type={'button'}
                value={'−'}
                color={'red'}
                iconValue
              />
            </>
          }
        />
        <br />
        <Text sizeType={'minimal'}>CopyrightText</Text>
        <Text sizeType={'h1'}>Title</Text>
        <Text sizeType={'h2'}>Subtitle</Text>
        <Text sizeType={'h3'}>Subtitle 2</Text>
        <Text sizeType={'h4'}>Subtitle 3</Text>
        <Text sizeType={'h5'}>Subtitle 4</Text>
        <Text sizeType={'h6'}>Subtitle 5</Text>
        <Text>Text</Text>
        <Text sizeType={'small'}>SubText</Text>
        <P>Paragraph</P>
        <br />
        <br />
        <Quantity>13</Quantity>
        <br />
        <br />
        <Error>Error</Error>
        <NotificationText>Notification</NotificationText>
        <Link>Link</Link>
        <FixedLink>FixedLink</FixedLink>
        <Progress
          id={0}
          max={12}
          current={6}
          percentage={true}
          flow={FlowType.bottomToTop}
        >
          <Milk />
        </Progress>
        <Progress
          id={1}
          max={12}
          current={6}
          percentage={true}
          flow={FlowType.leftToRight}
          width={200}
          height={100}
        >
          <Bar />
        </Progress>
        <Progress
          id={2}
          max={12}
          current={6}
          percentage={true}
          flow={FlowType.bottomToTop}
          width={100}
          height={200}
        >
          <Bar />
        </Progress>
        <Animation Animation={Falling} from={'-100px'} to={'250px'}>
          <IconItem
            src={
              props.theme == lightTheme ? '/img/bag.svg' : '/img/bagInvert.svg'
            }
          />
        </Animation>
        <Animation Animation={Rowling}>
          <IconItem
            src={
              props.theme == lightTheme ? '/img/bag.svg' : '/img/bagInvert.svg'
            }
          />
        </Animation>
        <Animation Animation={Hanging}>
          <IconItem
            src={
              props.theme == lightTheme ? '/img/bag.svg' : '/img/bagInvert.svg'
            }
          />
        </Animation>
        <Animation Animation={Rowling} anti={true}>
          <IconItem
            src={
              props.theme == lightTheme ? '/img/bag.svg' : '/img/bagInvert.svg'
            }
          />
        </Animation>
        <Input
          type={'button'}
          onClick={() => openModal()}
          value={'Open Modal'}
        />
        <br />
        <br />
        <Input
          type={'button'}
          onClick={() => openModal2()}
          value={'Open Modal 2'}
        />
        <br />
        <br />
        <Drawer
          navToggleIndexes={[0]}
          nav={
            <>
              <ToggleButton>
                <Toggle>
                  <span></span>
                </Toggle>
              </ToggleButton>
              <ItemHolder>
                <Link to="/">
                  <FixedLink>
                    <IconItem alt="app" />
                  </FixedLink>
                </Link>
              </ItemHolder>
              <ItemHolder>
                <Link to="/cart">
                  <FixedLink>
                    <IconItem alt="cart" />
                  </FixedLink>
                </Link>
              </ItemHolder>
            </>
          }
        >
          <DrawerItem>
            <ItemHolder>A</ItemHolder>
          </DrawerItem>
          <DrawerItem>
            <ItemHolder>B</ItemHolder>
          </DrawerItem>
        </Drawer>
      </div>
    </ThemeProvider>
  );
};

it('can mount a light theme', () => {
  mount(<BasicAll theme={lightTheme} />);
});

it('can mount a dark theme', () => {
  mount(<BasicAll theme={darkTheme} />);
});
