export interface IUser {
    id: string
    createdDate: Date
    cardId: string
    discriminator: string
    imagePath: string
    BirthDate: Date
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    securityStamp: string
    phoneNumber: boolean
    phoneNumberConfirmed: boolean
    concurrencyStamp: string
    twoFactorEnabled: boolean
    lockoutEnd: Date
    lockoutEnabled: boolean
    accessFailedCount: number
}

