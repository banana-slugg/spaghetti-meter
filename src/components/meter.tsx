import { useContext } from "preact/hooks";
import AppContext from "../utilities/appcontext";

export default function Meter() {
    const context = useContext(AppContext);
    return <div>{context.level}</div>;
}
