export interface Request {
    name: string,
    url: string,
    method: string,
    headers: string,
    body: string,
    res: {
        status: number,
        body: string
    }
}
