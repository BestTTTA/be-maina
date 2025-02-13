export class UserRankingResponseDto {
    id: string;
    name: string;
    email: string;
    avatar: string;
    markedSpotsCount: number;
    rank: number;
}


export class ApiResponseDto<T> {
    success: boolean;
    data: T;
    meta: {
        total: number;
        limit?: number;
        timestamp: string;
    };
}