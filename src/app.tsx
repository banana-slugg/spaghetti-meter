import { useState, useEffect } from "preact/hooks";
import Controller from "./controller";
import Nav from "./nav";

export function App() {
    const REST_ADDR = "https://spagapi.crimsin.net";
    const STREAM_ADDR = REST_ADDR + "/stream";
    const AUTH_ADDR = REST_ADDR + "/auth";
    const [level, setLevel] = useState(1);
    const [password, setPassword] = useState("");
    const [isLoggedIn, setLogin] = useState(false);

    const submitHandler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();
        fetch(AUTH_ADDR, {
            headers: {
                Authorization: "Basic " + btoa("Spagett:" + password),
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            })
            .catch((error) => {
                error.log(error);
            });
    };

    const inputHandler = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        setPassword((e.target as HTMLInputElement).value);
    };

    useEffect(() => {
        // get first val with a normal get request
        fetch(REST_ADDR)
            .then((res) => res.json())
            .then((json) => {
                setLevel(json.level);
            });
        // as updates are pushed out it will update with the server sent event
        const stream = new EventSource(STREAM_ADDR);
        stream.onmessage = (e) => {
            setLevel(e.data);
        };
    }, []);

    return (
        <>
            <div className="flex h-screen w-full flex-col items-center">
                <Nav />
                <p>{level}</p>

                <form className="form-control" onSubmit={submitHandler}>
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={inputHandler}
                            onInput={inputHandler}
                            placeholder="Password"
                            className="input input-bordered"
                        />
                        <button className="btn" type="submit" name="submit">
                            Login
                        </button>
                    </div>
                </form>
                <p>{isLoggedIn ? "true" : "false"}</p>
                <Controller password={password} url={REST_ADDR} />
            </div>
        </>
    );
}
