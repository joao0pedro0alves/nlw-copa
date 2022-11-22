export declare global {
    namespace NodeJS {
        interface ProcessEnv {
            JWT_ACCESS_SECRET: string
            NODE_ENV: 'development' | 'production'
        }
    }
}