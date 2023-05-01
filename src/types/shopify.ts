export type ThemeRole = 'main' | 'unpublished' | 'demo' | 'development';

export type Theme = {
  id: number
  name: string
  created_at: string
  updated_at: string
  role: ThemeRole
  previewable: false
  processing: true
};

export type CreateTheme = {
  name: string
  src: string
  role: ThemeRole
};

export type UpdateTheme = {
  name?: string
  role?: ThemeRole
};
