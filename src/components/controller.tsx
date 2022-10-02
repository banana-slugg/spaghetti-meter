import { handlePost } from "../utilities/handlers";
import { useContext } from "preact/hooks";
import AppContext from "../utilities/appcontext";

export default function Nav() {
    const context = useContext(AppContext);

    function handleClick(i: number) {
        handlePost(i, context.password);
    }
    return (
        <div className="btn-group">
            {Array.from(Array(10), (e, i) => {
                return (
                    <input
                        disabled={!context.isLoggedIn}
                        type="radio"
                        name="options"
                        data-title={i + 1}
                        className="btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                        onClick={() => {
                            handleClick(i + 1);
                        }}
                    />
                );
            })}
        </div>
    );
}
