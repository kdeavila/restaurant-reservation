// ==================== Admin ====================
export interface Admin {
  id_admin: number;
  name: string;
  email: string;
  password?: string; // optional when receiving from backend
}

// ==================== Customer ====================
export interface Customer {
  id_customer: number;
  name: string;
  email: string;
  phone?: string;
}

export interface CustomerTableData {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

// ==================== Table ====================
export type TableStatus = 'available' | 'occupied';
export type TableLocation = 'window' | 'terrace' | 'indoor' | 'vip room';

export interface Table {
  id_table: number;
  capacity: number;
  status: TableStatus;
  location: TableLocation;
}

export interface TableManagementData {
  id: number;
  name: string;
  capacity: number;
  status: TableStatus;
  location: TableLocation;
}

// ==================== Reservation ====================
export type ReservationStatus = 'confirmed' | 'cancelled';

export interface Reservation {
  id_reservation: number;
  customer_id: number;
  table_id: number;
  date: string; // ISO format YYYY-MM-DD
  time: string; // HH:mm
  people: number;
  status: ReservationStatus;
}

// ==================== Reservation with relationships ====================
export interface ReservationDetails extends Reservation {
  Customer: Customer;
  Table: Table;
}

export interface ReservationTableData {
  id: number;
  client: string;
  customer_id: number;
  table_id: number;
  table: TableLocation;
  tableCapacity?: number;
  date: string;
  time: string;
  people: number;
  status: ReservationStatus;
}

// ==================== Login ====================
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  admin: {
    id: number;
    name: string;
    email: string;
  };
}

// ==================== Create Reservation DTO ====================
export interface CreateReservationDTO {
  customer_id: number;
  table_id: number;
  date: string;
  time: string;
  people: number;
}

// ==================== Update Reservation DTO ====================
export interface UpdateReservationDTO {
  table_id: number;
  date: string;
  time: string;
  people: number;
}

// ==================== Create Table DTO ====================
export interface CreateTableDTO {
  capacity: number;
  location: TableLocation;
}

// ==================== Update Table DTO ====================
export type UpdateTableDTO = Partial<CreateTableDTO>;

// ==================== Create Customer DTO ====================

export interface CreateCustomerDTO {
  name: string;
  email: string;
  phone?: string;
}

//  ==================== Update Customer DTO ====================
export type UpdateCustomerDTO = Partial<CreateCustomerDTO>