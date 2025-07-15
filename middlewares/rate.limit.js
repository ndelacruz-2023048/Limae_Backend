import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200000000,
    message:{
        message: "Your blocked, wait 15 minutes",
    },
    
})