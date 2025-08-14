export type Role = 'admin' | 'vendor' ; 

export type User = { name: string; role: Role; id: string };

export type UserContextType = {
    user: User | undefined;
    isLogged: boolean;
    fetchUser: (force?: boolean) => void;
    error:{type:string;message:string;code?:number}
};