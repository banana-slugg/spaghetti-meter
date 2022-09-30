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
            {context.level}
            <div className="relative flex w-full items-center justify-center">
                <img src={meterbg} alt="a" className="drop-shadow-xl" />
                <img
                    src={needle}
                    alt="a"
                    className={`absolute origin-[50%_86.5%] self-end drop-shadow-2xl transition-all duration-300 ${
                        steps[context.level] || ""
                    }`}
                />
            </div>
        </div>
    );
}

//  9: 74
// 10: 94
