export const AppPage = {
  LOGIN: "login",
  HOME: "home",
} as const;

export type AppPage = (typeof AppPage)[keyof typeof AppPage];

export interface NavigationProps {
  onNavigate: (page: AppPage) => void;
}
