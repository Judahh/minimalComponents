const useState = <Type>(init:Type):[Type, (newState:Type) => void] => {
    let thisState = {
        current: init
    };
    const setState = (newState:Type) => {
        thisState.current = newState
    };
    setState(init);
    return [thisState.current, setState];
};
export default useState;