/**
 * fetch_timeout acts like fetch, but takes timeout in millisecs as parameter
 * 
 * @param url 
 * @param options 
 * @param ms
 * @returns response
 */
export async function fetch_timeout(url: string, options: RequestInit, ms: number): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(()=> controller.abort(), ms);

    // fetch
    const response: Response = await fetch(url, {
        ...options,
        signal: controller.signal
    });

    return response;
}