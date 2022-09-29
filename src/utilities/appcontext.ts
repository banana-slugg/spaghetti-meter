import { createContext } from "preact";
import type { StateUpdater } from "preact/hooks";

interface AppContextInterface {
    level: number;
    password: string;
    isLoggedIn: boolean;

    setLevel: StateUpdater<number>;
    setPassword: StateUpdater<string>;
    setLogin: StateUpdater<boolean>;
}

const AppContext = createContext({} as AppContextInterface);

export default AppContext;
