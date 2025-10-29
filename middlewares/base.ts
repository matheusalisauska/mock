import { os } from "@orpc/server";


export const base = os.$context<{request: Request}>().errors({
    RATE_LIMITED: {
        message: "Too many requests. Please try again later.",
    },
    UNAUTHORIZED: {
        message: "You must be logged in to perform this action.",
    },
    BAD_REQUEST: {
        message: "The request was invalid or cannot be served.",
    },
    NOT_FOUND: {
        message: "The requested resource was not found.",
    },
    FORBIDDEN: {
        message: "You do not have permission to perform this action.",
    },
    INTERNAL_SERVER_ERROR: {
        message: "An unexpected error occurred. Please try again later.",
    }
});