import { handleAuth } from "../utilities/handlers";
import type { StateUpdater } from "preact/hooks";

type LoginProps = {
    isLoggedIn: boolean;
    password: string;
    setLogin: StateUpdater<boolean>;
    setPassword: StateUpdater<string>;
};

export default function Login({ isLoggedIn, password, setLogin, setPassword }: LoginProps) {
    const submitHandler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
        e.preventDefault();

        if (isLoggedIn) {
            setLogin(false);
            setPassword("");
            return;
        }

        handleAuth(password)
            .then((res) => {
                if (res.status === 200) {
                    setLogin(true);
                }
            })
            .catch((error) => {
                error.log(error);
            });
    };

    const changeHandler = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        setPassword((e.target as HTMLInputElement).value);
        (e.target as HTMLInputElement).value = "";
    };
    const inputHandler = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        setPassword((e.target as HTMLInputElement).value);
    };
    return (
        <form className="form-control" onSubmit={submitHandler}>
            <div className="input-group">
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={changeHandler}
                    onInput={inputHandler}
                    placeholder="Password"
                    className="input input-bordered"
                    disabled={isLoggedIn}
                />
                <button className={`btn ${isLoggedIn ? "btn-error" : "btn-primary"}`} type="submit" name="submit">
                    {isLoggedIn ? "Logout" : "Login"}
                </button>
            </div>
        </form>
    );
}
