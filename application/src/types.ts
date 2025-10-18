import { USER_ROLES } from 'lib/auth/roles';

// User type
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  image: string | null;

  role: UserRole;
  createdAt: Date;

  verificationToken?: string | null;
  emailVerified: boolean;
}

// Subscription type
export interface Subscription {
  id: string;
  userId: string;
  status: SubscriptionStatus | null;
  plan: SubscriptionPlan | null;
  customerId: string | null;
  createdAt: Date;
}

// Note type
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  category: string | null;
  status: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PENDING';

export type SubscriptionPlan = 'FREE' | 'PRO';

export interface UserWithSubscriptions extends User {
  subscription: Subscription | null;
}

export enum SubscriptionStatusEnum {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PENDING = 'PENDING',
}

export enum SubscriptionPlanEnum {
  FREE = 'FREE',
  PRO = 'PRO',
}

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export type PaginationParams = { pageIndex: number; pageSize: number };
export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;
