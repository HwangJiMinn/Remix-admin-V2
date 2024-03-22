export {};

declare global {
  interface AdminUser {
    id: string;
    name: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
  }
}
