export type TUser = {
    id: string,
    password: string,
    needsPassChange: boolean,
    role: 'admin' | 'faculty' | 'student',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean,
}

export type NewUser = {
    password: string,
    role: string,
    id: string,
}