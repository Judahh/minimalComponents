const useState = <Type>(init:Type):[Type, (newState:Type) => void] => {
    let state = init;
    const setState = (newState:Type) => state = newState;
    return [state, setState];
};
export default useState;