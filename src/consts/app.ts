export const APP_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  DASHBOARD_TABLES: "/dashboard/tables",
  DASHBOARD_TABLES_NEW: "/dashboard/tables/new",
  DASHBOARD_TABLES_EDIT:(id: number) => `/dashboard/tables/${id}`,
  DASHBOARD_CLIENTS: "/dashboard/clients",
  DASHBOARD_CLIENTS_NEW: "/dashboard/clients/new",
  DASHBOARD_CLIENTS_EDIT: (id: string) => `/dashboard/clients/${id}`,
} as const;