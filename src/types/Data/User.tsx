export type User = {
    _id: string
    username: string
    email: string
    image: string
    role: string
    is_active: boolean
}



export type DataLogin = {
    password: string;
    username: string;
};

export type DataRegister = {
    email: string;
    password: string;
    username: string;
    image?: string
};


export type AuthStore = {
    user: User | undefined;
    access_Token: string | undefined;
    setAccess_Token: (accessToken: string | undefined) => void;
    setUser: (userr: User | undefined) => void;
    // store: (accessToken: string | undefined) => void;
};