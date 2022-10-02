import { useContext } from "preact/hooks";
import AppContext from "../utilities/appcontext";
import meterbg from "../assets/meterbg.svg";
import needle from "../assets/needle.svg";
import "../styles/meter.css";

export default function Meter() {
    const context = useContext(AppContext);
    const steps: { [key: number]: string } = {
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
    };

    return (
        <div className="flex h-min w-full flex-col">
            <div className="relative flex w-full touch-none select-none justify-center">
                <img src={meterbg} alt="a" className="drop-shadow-lg" />
                <img
                    src={needle}
                    alt="a"
                    className={`absolute origin-[50%_86.5%] self-end drop-shadow-2xl transition-transform duration-1000 ${
                        steps[context.level]
                    }`}
                />
            </div>
        </div>
    );
}
