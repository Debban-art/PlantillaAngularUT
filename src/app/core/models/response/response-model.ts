export interface ApiResponse<T> {
    Status: number;
    Success: boolean;
    Message: string;
    Response: T;
}