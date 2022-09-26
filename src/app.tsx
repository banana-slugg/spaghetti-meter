import { useState, useEffect } from "preact/hooks";
import "./app.css";

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
            <div>
                <p>{level}</p>
                <form onSubmit={submitHandler}>
                    <button type="submit" name="submit">
                        Submit
                    </button>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={inputHandler}
                        onInput={inputHandler}
                    />
                    <p>{isLoggedIn ? "true" : "false"}</p>
                </form>
            </div>
        </>
    );
}
