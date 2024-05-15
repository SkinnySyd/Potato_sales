// models/sales.model.ts

export interface Sales {
    column: TableColumn[];
    data: SalesData[];
  }
  
  export interface TableColumn {
    header: string;
    field?: string;
    subHeaders?: TableColumn[];
  }
  
  export interface SalesData {
    productID: string;
    productName: string;
    salesQ1: number;
    salesQ2: number;
    salesQ3: number;
    salesQ4: number;
    [key: string]: string | number; // Add index signature
  }
  