export interface User {
  id?: string;
  role?: any;
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
}

export interface Permission {
  _id: string;
  label: string;
  value: string;
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum EPermission {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE',
  DOWNLOAD = 'DOWNLOAD',
  READ = 'READ',
}
