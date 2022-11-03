export interface AppRootParamList {
    new: undefined;
    pools: undefined;
    find: undefined;
}

export declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppRootParamList {
            details: {
                id: string;
            }
        }
    }
}