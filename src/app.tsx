import { useState, useEffect } from "preact/hooks";
import Controller from "./components/controller";
import Nav from "./components/nav";
import Meter from "./components/meter";
import AppContext from "./utilities/appcontext";
import { handleGet, handleStream } from "./utilities/handlers";

export function App() {
    const [level, setLevel] = useState(1);
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLogin] = useState(false);

    useEffect(() => {
        // get first val with a normal get request
        handleGet().then((res) => {
            setLevel(res);
        });
        // as updates are pushed out it will update with the server sent event
        handleStream().onmessage = (e) => {
            setLevel(e.data);
        };
    }, []);

    return (
        <>
            <AppContext.Provider value={{ level, password, isLoggedIn, setLevel, setPassword, setLogin }}>
                <div className="flex h-screen w-full flex-col items-center">
                    <Nav />
                    <Meter />
                    <Controller />
                </div>
            </AppContext.Provider>
        </>
    );
}
