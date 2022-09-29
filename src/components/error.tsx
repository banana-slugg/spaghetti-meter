import { useState, useEffect } from "preact/hooks";

type ErrorProps = {
    errors: number;
};

export default function Error(props: ErrorProps) {
    const errorList = [...Array(props.errors)].map((d, index) => ErrorMessage(index));

    return <div className="toast toast-start">{errorList}</div>;
}

function ErrorMessage(index: number) {
    const [isVisible, setVisibile] = useState(true);
    const [isHidden, setHidden] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setVisibile(false);
        }, 2000);
        setTimeout(() => {
            setHidden(true);
        }, 2500);
    }, []);
    return (
        <div
            key={index}
            className={`alert alert-error transition-all duration-500 ${isHidden ? "hidden" : ""} ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div>
                <span>Wrong password. Scram!</span>
            </div>
        </div>
    );
}
