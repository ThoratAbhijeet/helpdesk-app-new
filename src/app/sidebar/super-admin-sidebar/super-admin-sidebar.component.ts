import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChangePasswordComponent } from '../../components/auth/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-sidebar',
  templateUrl: './super-admin-sidebar.component.html',
  styleUrl: './super-admin-sidebar.component.scss'
})
export class SuperAdminSidebarComponent implements OnInit {

  constructor(private router:Router,private dialog: MatDialog,
   private renderer: Renderer2){
  }
  ngOnInit(): void {
    
  }
  handleMasterAccordionClick(): void {
    const collapseTwo = document.getElementById('collapseTwo');
    const collapseThree = document.getElementById('collapseThree');
    this.renderer.removeClass(collapseTwo, 'show');
    this.renderer.removeClass(collapseThree, 'show');
  }
  handleMeetingAccordionClick(): void {
    const collapseOne = document.getElementById('collapseOne');
    const collapseThree = document.getElementById('collapseThree');
    this.renderer.removeClass(collapseOne, 'show');
    this.renderer.removeClass(collapseThree, 'show');
  }

  handleReportsAccordionClick(): void {
    const collapseOne = document.getElementById('collapseOne');
    const collapseTwo = document.getElementById('collapseTwo');
    this.renderer.removeClass(collapseOne, 'show');
    this.renderer.removeClass(collapseTwo, 'show');
  }
  logout() {
    localStorage.clear();
    this.router.navigate([''])

  }
    //change password
       openChangePasswordDialog() {
          const dialogRef = this.dialog.open(ChangePasswordComponent, {
            width: '400px', // Adjust width as needed
            maxWidth: '90vw', // Keeps it responsive
            disableClose: false, // Prevents closing on outside click
            panelClass: 'custom-dialog-center', // Custom class for centering
          });
        
          dialogRef.afterClosed().subscribe((message: any) => {
         
          });
        }
}