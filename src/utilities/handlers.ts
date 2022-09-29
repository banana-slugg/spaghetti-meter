const REST_ADDR = "https://spagapi.crimsin.net";
const STREAM_ADDR = REST_ADDR + "/stream";
const AUTH_ADDR = REST_ADDR + "/auth";

export async function handleGet() {
    const res = await fetch(REST_ADDR);
    const json = await res.json();
    return json.level;
}

export function handlePost(level: number, password: string) {
    fetch(REST_ADDR, {
        method: "POST",
        headers: {
            Authorization: "Basic " + btoa("Spagett:" + password),
            "Content-type": "application/json",
        },
        body: `{"level": ${level}}`,
    });
}

export function handleStream() {
    return new EventSource(STREAM_ADDR);
}

export function handleAuth(password: string) {
    return fetch(AUTH_ADDR, {
        headers: {
            Authorization: "Basic " + btoa("Spagett:" + password),
        },
    });
}
