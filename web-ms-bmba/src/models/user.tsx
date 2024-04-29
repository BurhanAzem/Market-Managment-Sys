export interface IUser {
    Id: string
    CreatedDate: Date
    CardId: string
    Discriminator: string
    ImagePath: string
    BirthDate: Date
    userName: string
    NormalizedUserName: string
    Email: string
    NormalizedEmail: string
    EmailConfirmed: boolean
    SecurityStamp: string
    PhoneNumber: boolean
    PhoneNumberConfirmed: boolean
    ConcurrencyStamp: string
    TwoFactorEnabled: boolean
    LockoutEnd: Date
    LockoutEnabled: boolean
    AccessFailedCount: number
}

