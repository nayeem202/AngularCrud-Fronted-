import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './productModel';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product();

  constructor(private http: HttpClient) { }

  Products: any;
  isShowTable: boolean = false;
  isSave: boolean = true;

  ngOnInit(): void {
    this.loadProductData();
  }


  loadProductData() {
    this.http.get('http://localhost:8080/showProduct').subscribe(pro => {
      console.log(pro);
      this.Products = pro;
    })

  }

  saveStudent() {
    const headers = { 'content-Type': 'application/json' };
    this.http.post("http://localhost:8080/productSave", JSON.stringify(this.product), { headers: headers })
      .subscribe(data => {
        console.log(data);

      })
  }

  updateProduct(product:any) {
    console.log("Update student");
    this.isSave = true;
    const headers = { 'content-Type': 'application/json' };
    this.http.post("http://localhost:8080/updateProduct/"+product.productId, JSON.stringify(this.product), { headers: headers })
      .subscribe(data => {
        console.log(data);

      })
  }


  toggleStudentList() {
    console.log("Heloooooo");
    this.isShowTable = !this.isShowTable;
    console.log(this.isShowTable);
  }

  editProduct(product: any) {
    console.log("Edit button");
    this.product = product;
    this.isSave = false;
  }


  deleteProduct(product:any) {
    console.log("delete button");
    const headers = { 'content-Type': 'application/json' };
    this.http.get("http://localhost:8080/deleteById/"+product.productId,{ headers: headers })
      .subscribe(data => {
        console.log(product.id);
        
        console.log(data);

      })


}
}
