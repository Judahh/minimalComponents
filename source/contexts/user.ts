/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken';
import { createContext } from 'react';
import { request } from '../requests';

const catalog = {
  id: '000000000000000000000000',
  name: 'catalog',
  identification: 'catalog',
  type: 'API',
};

export enum UserFlow {
  base = 0,
  last,
  current,
}

export enum UserType {
  none = 0,
  base,
  client,
  regular,
  seller,
}

const getTTL = async (currentToken: string | undefined, offset?: number) => {
  offset = offset || 1000;
  let decode = await jwt.decode(currentToken || '');
  let exp = decode?.exp * 1000;
  let now = new Date().getTime();
  let ttl = exp - now - offset;
  return ttl;
};

const getStorageToken = (storage: number): string | undefined => {
  const currentStorage = 'current' + storage;

  const isBrowser = typeof window !== 'undefined';
  const token = isBrowser
    ? localStorage.getItem(currentStorage) || undefined
    : undefined;

  return token;
}

const refreshSingleToken = async (
  storage: number,
  token: string | undefined,
  setToken: (string?: string | undefined) => void,
  setUser: (newUser) => void,
  currentTimeout?: NodeJS.Timeout | undefined,
  setCurrentTimeout?: (newTimeout: NodeJS.Timeout | undefined) => void,
  timeoutFunction?: (token?) => void,
  setTimeoutFunction?: (timeoutFunction?: (token?) => void) => void,
  address?: string,
  path?: string,
  data?: string,
  offset?: number,
  refreshMethod?: string
): Promise<string | undefined> => {
  let receivedToken: string | undefined;
  const currentStorage = 'current' + storage;

  token = token
    ? token
    : getStorageToken(storage);

  let ttl = await getTTL(token, offset);

  const newTimeoutFuntion = timeoutFunction
    ? timeoutFunction
    : (token) => {
        refreshSingleToken(
          storage,
          token,
          setToken,
          setUser,
          currentTimeout,
          setCurrentTimeout,
          timeoutFunction,
          setTimeoutFunction,
          address,
          path,
          data,
          offset,
          refreshMethod
        );
      };

  // console.log('address: ' + address);

  if (address || path || ttl <= 0) {
    clearTimeout(currentTimeout);
    // console.log('ttl: ' + ttl, address, path, token);

    const received = await request(
      address || '',
      refreshMethod || 'post',
      path,
      token || undefined,
      data
    );
    receivedToken = received?.data?.token || received?.token || received || '';
    // console.log('receivedToken:', receivedToken);
    // console.log(currentStorage);
    // console.log('localStorage' + localStorage);

    ttl = await getTTL(receivedToken, offset);
    // console.log('ttl:', ttl);

    if (ttl > 0) {
      setTimeoutFunction?.((token) => newTimeoutFuntion(token));
      setCurrentTimeout?.(setTimeout(newTimeoutFuntion, ttl));
    } else {
      receivedToken = '';
    }
  } else {
    clearTimeout(currentTimeout);
    setTimeoutFunction?.((token) => newTimeoutFuntion(token));
    setCurrentTimeout?.(setTimeout(newTimeoutFuntion, ttl));
    receivedToken = token || '';
  }
  if (receivedToken == undefined || receivedToken?.trim() == '')
    receivedToken = '';

  const user =
    receivedToken == '' || receivedToken == undefined
      ? undefined
      : await jwt.decode(receivedToken);

  // console.log('pre setToken receivedToken:', receivedToken);
  // console.log('pre setToken user:', user);

  receivedToken = receivedToken === '' ? undefined : receivedToken;
  setToken?.(receivedToken);
  if (receivedToken) localStorage.setItem(currentStorage, receivedToken);
  else localStorage.removeItem(currentStorage);
  setUser?.(user);
  // console.log('final receivedToken:', receivedToken);
  return receivedToken;
};

const refreshToken = async (
  token: (flow: UserFlow) => string | undefined,
  setToken: (flow: UserFlow, string?: string | undefined) => void,
  setUser: (flow: UserFlow, newUser) => void,
  timeout?: (flow: UserFlow) => NodeJS.Timeout | undefined,
  setTimeout?: (flow: UserFlow, newTimeout: NodeJS.Timeout | undefined) => void,
  timeoutFunction?: (flow: UserFlow, token?) => void,
  setTimeoutFunction?: (
    flow: UserFlow,
    timeoutFunction?: (token?) => void
  ) => void,
  address?: string,
  path?: string,
  data?: string,
  offset?: number,
  refreshMethod?: string
): Promise<string | undefined> => {
  let receivedToken: string | undefined;
  if (token(UserFlow.base) == undefined) {
    // console.log('base token is undefined');
    receivedToken = await refreshSingleToken(
      UserFlow.base,
      token(UserFlow.base),
      (newToken) => setToken?.(UserFlow.base, newToken),
      (newUser) => setUser?.(UserFlow.base, newUser),
      timeout?.(UserFlow.base),
      (newTimeout) => setTimeout?.(UserFlow.base, newTimeout),
      (token) => timeoutFunction?.(UserFlow.base, token),
      (newTimeoutFunction) =>
        setTimeoutFunction?.(UserFlow.base, newTimeoutFunction),
      address,
      path,
      data,
      offset,
      refreshMethod
    );
  }

  const currentToken = token(UserFlow.current);
  const currentTimeout = timeout?.(UserFlow.current);

  // console.log('last refreshSingleToken');
  receivedToken = await refreshSingleToken(
    UserFlow.last,
    currentToken,
    (newToken) => setToken?.(UserFlow.last, newToken),
    (newUser) => setUser?.(UserFlow.last, newUser),
    currentTimeout,
    (newTimeout) => setTimeout?.(UserFlow.last, newTimeout),
    (token) => timeoutFunction?.(UserFlow.base, token),
    (newTimeoutFunction) =>
      setTimeoutFunction?.(UserFlow.base, newTimeoutFunction),
    undefined,
    undefined,
    undefined,
    undefined,
    refreshMethod
  );

  // console.log('current refreshSingleToken');
  receivedToken = await refreshSingleToken(
    UserFlow.current,
    currentToken,
    (newToken) => setToken?.(UserFlow.current, newToken),
    (newUser) => setUser?.(UserFlow.current, newUser),
    timeout?.(UserFlow.current),
    (newTimeout) => setTimeout?.(UserFlow.current, newTimeout),
    (token) => timeoutFunction?.(UserFlow.base, token),
    (newTimeoutFunction) =>
      setTimeoutFunction?.(UserFlow.base, newTimeoutFunction),
    address,
    path,
    data,
    offset,
    refreshMethod
  );

  return receivedToken;
};

const signOut = async (
  token: (flow: UserFlow) => string | undefined,
  setToken: (flow: UserFlow, string?: string | undefined) => void,
  setUser: (flow: UserFlow, newUser) => void,
  timeout?: (flow: UserFlow) => NodeJS.Timeout | undefined,
  setTimeout?: (flow: UserFlow, newTimeout: NodeJS.Timeout | undefined) => void,
  timeoutFunction?: (flow: UserFlow, token?) => void,
  setTimeoutFunction?: (
    flow: UserFlow,
    timeoutFunction?: (token?) => void
  ) => void,
  offset?: number,
  refreshMethod?: string
) => {
  const baseToken = token(UserFlow.base);
  const lastToken = token(UserFlow.last);
  // console.log('signOut', baseToken, lastToken);

  let receivedToken = await refreshSingleToken(
    UserFlow.last,
    baseToken,
    (newToken) => setToken?.(UserFlow.last, newToken),
    (newUser) => setUser?.(UserFlow.last, newUser),
    timeout?.(UserFlow.last),
    (newTimeout) => setTimeout?.(UserFlow.last, newTimeout),
    (token) => timeoutFunction?.(UserFlow.base, token),
    (newTimeoutFunction) =>
      setTimeoutFunction?.(UserFlow.base, newTimeoutFunction),
    undefined,
    undefined,
    undefined,
    offset,
    refreshMethod
  );

  // console.log('receivedToken 0', receivedToken);

  receivedToken = await refreshSingleToken(
    UserFlow.current,
    lastToken,
    (newToken) => setToken?.(UserFlow.current, newToken),
    (newUser) => setUser?.(UserFlow.current, newUser),
    timeout?.(UserFlow.current),
    (newTimeout) => setTimeout?.(UserFlow.current, newTimeout),
    (token) => timeoutFunction?.(UserFlow.last, token),
    (newTimeoutFunction) =>
      setTimeoutFunction?.(UserFlow.last, newTimeoutFunction),
    undefined,
    undefined,
    undefined,
    offset,
    refreshMethod
  );

  // console.log('receivedToken 1', receivedToken);

  return receivedToken;
};

const getUserType = (user): UserType => {
  // console.log('getUserType user:', user);
  return user?.level != undefined || user?.levelId != undefined
    ? UserType.regular
    : typeof user != 'string' && user?.active
    ? UserType.seller
    : user?.id != undefined
    ? user.id !== catalog.id ||
      user.identification !== catalog.identification ||
      user.name !== catalog.name
      ? UserType.client
      : UserType.base
    : UserType.none;
};

const getUserFlow = (userType: UserType): UserFlow => {
  switch (userType) {
    case UserType.client:
    case UserType.regular:
      return UserFlow.current;
    case UserType.seller:
      return UserFlow.last;
    default:
      return UserFlow.base;
  }
};

const createUserContext = <User>() =>
  createContext<
    | {
        token: {
          refresh: (
            address?: string,
            path?: string,
            data?,
            offset?: number,
            refreshMethod?: string
          ) => Promise<string | undefined>;
          current: string | undefined;
        };

        current: User | undefined;

        signOut: (offset?: number) => Promise<string | undefined | void>;

        doSignOut: (content?: string) => boolean | undefined;

        isHidden: (
          item?: {
            content?: string;
            href?: string;
          },
          userTypes?: UserType[]
        ) => boolean | undefined;
      }
    | undefined
  >({
    token: {
      refresh: async (
        address?: string,
        path?: string,
        data?,
        offset?: number,
        refreshMethod?: string
      ) =>
        refreshToken(
          () => undefined,
          () => {},
          () => {},
          undefined,
          () => {},
          () => {},
          () => {},
          address,
          path,
          data,
          offset,
          refreshMethod
        ),
      current: undefined,
    },

    current: undefined,

    signOut: async (offset?: number) =>
      signOut(
        () => undefined,
        () => {},
        () => {},
        undefined,
        () => {},
        () => {},
        () => {},
        offset,
        'put'
      ),
    doSignOut: () => undefined,

    isHidden: () => undefined,
  });

const isSignedIn = (element?, userTypes?: UserType[]): boolean => {
  // console.log('isSignedIn element:', element, userTypes);
  let signed = false;
  if (userTypes)
    for (
      let index = 0;
      index < (userTypes?.length || 0) && signed == false;
      index++
    ) {
      const userType = userTypes?.[index];
      switch (userType) {
        case UserType.client:
          signed =
            !element?.active &&
            element?.id != undefined &&
            (element?.id !== catalog.id ||
              element?.identification !== catalog.identification ||
              element?.name !== catalog.name);
          break;
        case UserType.regular:
          signed = element?.levelId != undefined || element?.level != undefined;
          break;
        case UserType.seller:
          signed = element?.active;
          break;
        case UserType.none:
          signed = element != undefined;
          break;
        default:
          signed =
            element?.id == catalog.id &&
            element?.identification == catalog.identification &&
            element?.name == catalog.name;
          break;
      }
    }
  return signed;
};

export {
  refreshToken,
  getUserType,
  getUserFlow,
  createUserContext,
  isSignedIn,
  signOut,
  catalog,
  getStorageToken,
};
