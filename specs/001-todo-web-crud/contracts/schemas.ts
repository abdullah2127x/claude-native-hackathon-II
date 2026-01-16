/**
 * Zod Schemas for Full-Stack Todo Web Application
 *
 * Feature: 001-todo-web-crud
 * Generated: 2026-01-16
 *
 * These schemas provide:
 * - Form validation (React Hook Form + Zod resolver)
 * - API response validation (runtime type checking)
 * - TypeScript type inference
 */

import { z } from "zod";

// =============================================================================
// AUTH SCHEMAS
// =============================================================================

/**
 * Sign Up form validation
 * FR-001: Allow new users to create accounts
 * FR-002: Validate email format
 * FR-003: Password min 8 chars, at least 1 number
 */
export const signUpSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

/**
 * Sign In form validation
 * FR-004: Authenticate via email/password
 */
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required"),
});

export type SignInInput = z.infer<typeof signInSchema>;

// =============================================================================
// TASK SCHEMAS
// =============================================================================

/**
 * Create Task form validation
 * FR-007: Required title (max 200 chars)
 * FR-008: Optional description (max 2000 chars)
 */
export const taskCreateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or less")
    .optional()
    .nullable()
    .transform(val => val === "" ? null : val),
});

export type TaskCreateInput = z.infer<typeof taskCreateSchema>;

/**
 * Update Task form validation
 * FR-012: Allow editing title and description
 * FR-015: Validate title is not empty
 */
export const taskUpdateSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less")
    .optional(),
  description: z
    .string()
    .max(2000, "Description must be 2000 characters or less")
    .optional()
    .nullable()
    .transform(val => val === "" ? null : val),
  completed: z.boolean().optional(),
});

export type TaskUpdateInput = z.infer<typeof taskUpdateSchema>;

/**
 * Task response schema (API response validation)
 */
export const taskSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string().max(200),
  description: z.string().max(2000).nullable(),
  completed: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime().nullable(),
});

export type Task = z.infer<typeof taskSchema>;

/**
 * Task list response schema
 */
export const taskListResponseSchema = z.object({
  data: z.array(taskSchema),
  total: z.number().int().nonnegative(),
});

export type TaskListResponse = z.infer<typeof taskListResponseSchema>;

// =============================================================================
// ERROR SCHEMAS
// =============================================================================

/**
 * API error response schema
 */
export const errorSchema = z.object({
  error: z.string(),
  message: z.string(),
});

export type ApiError = z.infer<typeof errorSchema>;

/**
 * Validation error detail
 */
export const validationErrorDetailSchema = z.object({
  field: z.string(),
  code: z.string(),
  message: z.string(),
});

/**
 * Validation error response schema
 */
export const validationErrorSchema = z.object({
  error: z.literal("Validation Error"),
  message: z.string(),
  details: z.array(validationErrorDetailSchema),
});

export type ValidationError = z.infer<typeof validationErrorSchema>;

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Form state with draft preservation
 * FR-021: Preserve unsaved changes during session expiry
 */
export interface TaskFormDraft {
  title: string;
  description: string | null;
  savedAt: number; // Unix timestamp
  taskId?: string; // For edit mode
}

/**
 * Network error state
 * FR-022: Handle network failures with retry
 */
export interface NetworkErrorState {
  hasError: boolean;
  message: string;
  retryFn: (() => void) | null;
  preservedData: unknown;
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate API response with Zod schema
 * Throws ZodError if validation fails
 */
export function validateResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}

/**
 * Safe parse API response (returns result object)
 */
export function safeValidateResponse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): z.SafeParseReturnType<unknown, T> {
  return schema.safeParse(data);
}
