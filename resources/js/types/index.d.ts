import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface PageProps<T extends Record<string, unknown> = Record<string, unknown>> extends T {
    auth: Auth;
    ziggy: Config & { location: string };
}
