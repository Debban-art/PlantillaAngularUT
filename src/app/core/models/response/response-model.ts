export interface ApiResponse<T> {
    StatusCode: number;
    succes: boolean;
    message: string;
    response: T
}