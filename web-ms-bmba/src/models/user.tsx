export interface IUser {
    id: string;
    createdDate: string; // ✅ Keep as string since backend sends DateTime
    cardId: string;
    discriminator: string | null;
    imagePath: string | null;
    birthDate: string | null; // ✅ Use string to avoid TypeScript Date conversion issues
    firstName: string | null;
    lastName: string | null;
    normalizedUserName: string | null;
    email: string | null;
    normalizedEmail: string | null;
    emailConfirmed: boolean | null; // ✅ Can be null in backend
    securityStamp: string | null;
    concurrencyStamp: string | null;
    phoneNumber: string | null; // ✅ Fix: Must allow null
    phoneNumberConfirmed: boolean | null;
    twoFactorEnabled: boolean | null;
    lockoutEnd: string | null; // ✅ Backend sends DateTimeOffset, so keep as string
    lockoutEnabled: boolean | null;
    accessFailedCount: number | null; // ✅ Must allow null
}
