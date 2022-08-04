const useState = <Type>(init:Type):[Type, (newState:Type) => void] => {
    let thisState = {
        current: init
    };
    const setState = (newState:Type) => {
        console.log('setting state', newState);
        thisState.current = newState
        console.log('thisState', thisState);
    };
    setState(init);
    return [thisState.current, setState];
};
export default useState;