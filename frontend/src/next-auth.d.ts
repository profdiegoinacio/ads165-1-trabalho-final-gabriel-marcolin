import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        accessToken?: string; // Token do backend
        user: {
            id?: string;
            roles?: string[];
            username?: string;
        } & DefaultSession['user']; // Mantém as propriedades padrão
    }

    // O objeto User retornado pelo `authorize` do CredentialsProvider
    // ou de um provedor OAuth
    interface User extends DefaultUser {
        id?: string;
        accessToken?: string;
        roles?: string[];
        username?: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id?: string;
        accessToken?: string;
        roles?: string[];
        username?: string;
    }
}