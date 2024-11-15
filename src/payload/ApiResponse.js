class ApiResponse {
    constructor(status, message, data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static success(message, data) {
        return new ApiResponse('success', message, data);
    }

    static error(message, data) {
        return new ApiResponse('error', message, data);
    }

    static unauthorized(message, data) {
        return new ApiResponse('unauthorized', message, data);
    }

    static forbidden(message, data) {
        return new ApiResponse('forbidden', message, data);
    }

    static notFound(message, data) {
        return new ApiResponse('not found', message, data);
    }

    static conflict(message, data) {
        return new ApiResponse('conflict', message, data);
    }
}

export default ApiResponse