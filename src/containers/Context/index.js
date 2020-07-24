import {createContext} from 'react';

const Context = createContext({
    dispatch: () => {},
    mx: null,
});

export default Context;