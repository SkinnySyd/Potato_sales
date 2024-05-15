import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
// import { SalesService } from 'src/app/_services/sales.service';
// import { Sales, SalesData, TableColumn,} from 'src/app/models/sales.model';


// Interface for column definitions in the table
interface Column {
  header: string;
  field?: string;
  subHeaders?: { header: string; field: string }[];
}

// Interface for the sales data structure
interface Data {
  [key: string]: any;
  productID: string;
  productName: string;
  salesQ1: number;
  salesQ2: number;
  salesQ3: number;
  salesQ4: number;
}


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  columns: Column[] = []; // to store column definitions
  data: Data[] = []; // to store sales data
  headers: any; // to store table headers
  sortColumn: string = ''; // Currently sorted column
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredData: Data[] = []; // to store filtered sales data
  searchQuery: string = ''; // Search query for filtering data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch data when the component is initialized
    this.fetchData()
  }

    // calculate the total sales for a product
  calculateTotalSales(product: Data): number {
    return product.salesQ1 + product.salesQ2 + product.salesQ3 + product.salesQ4;
  }

  // fetch data from  JSON file
  fetchData(): void {
    
    this.http.get<any>('assets/data/potato_sales.json').subscribe(response => {
      this.columns = response.column;
      this.data = response.data;
      this.filteredData = [...this.data]; // Initialize filteredData with all data
    });
  }

  //sort data based on a column
  //the column to be sorted are chosen in the template file
  sortData(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Sort the filtred variable data because it's the one used in the template
    // this.Data.sort((a, b) => {
    this.filteredData.sort((a, b) => {
      let aValue: any;
      let bValue: any;
      // Sort by total sales
      if (this.sortColumn === 'Total sales') {
        aValue = this.calculateTotalSales(a);
        bValue = this.calculateTotalSales(b);
      } else {
      // Sort by column
        aValue = a[this.getFieldByHeader(this.sortColumn)];
        bValue = b[this.getFieldByHeader(this.sortColumn)];
      }
      // Compare values
      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  //get the field name based on a given header
  //to be used in the sorting method
  getFieldByHeader(header: string): string {
    for (const column of this.columns) {
      if (column.header === header && column.field) {
        return column.field;  // Return field if header matches
      }
      if (column.subHeaders) {
        for (const subHeader of column.subHeaders) {
          if (subHeader.header === header) {
            return subHeader.field; // Return field if subHeader matches
          }
        }
      }
    }
    return ''; // Return empty string if no match found
  }

  // Method to filter data based on the general search query
  applyFilter(): void {
    if (!this.searchQuery) {
      // Reset filter if search query is empty
      this.filteredData = [...this.data]; 
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredData = this.data.filter(item => {
      for (const key in item) {
        // Check if the item has the property and it contains the search query
        if (item.hasOwnProperty(key) && typeof item[key] === 'string' && item[key].toLowerCase().includes(query)) {
          return true;
        }
      }
      return false;
    });
  }
}


  
