/** Standard API response envelope (spec §1.15). */
export interface ApiSuccess<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string>;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/** Cursor-paginated list (spec §1.7). */
export interface CursorPage<T> {
  items: T[];
  nextCursor: string | null;
  hasMore: boolean;
}

/** Offset-paginated list (used by admin tables). */
export interface OffsetPage<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
