export interface BaseResponse<ResponseType> {
    data: ResponseType;
    status: Status;
}

export interface Status {
    code: string;
    messageKey: string;
    values: string[] | number[];
}