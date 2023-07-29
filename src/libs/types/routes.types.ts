export interface Route {
  path: string;
  element: any;
  children?: any;
  redirect?: () => void;
}
