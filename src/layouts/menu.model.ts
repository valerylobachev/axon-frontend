export interface BadgeItem {
  type: string;
  value: string;
}

export interface MenuModel {
  state?: string;
  name: string;
  type: string;
  fontSet?: string
  icon?: string;
  badge?: BadgeItem[];
  children?: MenuModel[];
  isOpen?: boolean;
}
