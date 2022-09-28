type ControllerProps = {
    password: string;
    url: string;
};

export default function Nav({ password, url }: ControllerProps) {
    function post(level: number) {
        fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa("Spagett:" + password),
                "Content-type": "application/json",
            },
            body: `{
                "level": ${level}
               }`,
        });
    }

    return (
        <div className="btn-group">
            {Array.from(Array(10), (e, i) => {
                return (
                    <button
                        className="btn btn-square btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                        key={i}
                        onClick={() => {
                            post(i + 1);
                        }}
                    >
                        {i + 1}
                    </button>
                );
            })}
        </div>
    );
}
