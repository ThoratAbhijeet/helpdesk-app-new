import { Component, OnInit, Renderer2 } from '@angular/core';
import { ChangePasswordComponent } from '../../components/auth/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../components/auth/auth.service';
import { SharedService } from '../../shared/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-super-admin-sidebar',
  templateUrl: './super-admin-sidebar.component.html',
  styleUrl: './super-admin-sidebar.component.scss'
})
export class SuperAdminSidebarComponent implements OnInit {
  user_id: any;
session_id:any;
  constructor(private router: Router, private dialog: MatDialog, private _authService: AuthService, private _tosterService: ToastrService, private _sharedService: SharedService,
    private renderer: Renderer2) {
  }
  ngOnInit(): void {
    let userData = localStorage.getItem('data');
      let session_id = localStorage.getItem('session_id');
    
    this.session_id = session_id;
    this.user_id = userData ? JSON.parse(userData).user_id : null;
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
    this.Logout()

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
  toggleAccordion(targetId: string) {
    const target = document.getElementById(targetId);
    const button = document.querySelector(`[aria-controls="${targetId}"]`);

    if (!target || !button) return;

    // Close all other accordions
    const allAccordions = document.querySelectorAll('.accordion-collapse');
    const allButtons = document.querySelectorAll('.accordion-button');

    allAccordions.forEach((el) => {
      if (el.id !== targetId) {
        el.classList.remove('show');
      }
    });

    allButtons.forEach((btn) => {
      if ((btn as HTMLElement).getAttribute('aria-controls') !== targetId) {
        btn.classList.add('collapsed');
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle clicked one
    const isOpen = target.classList.toggle('show');

    if (isOpen) {
      button.classList.remove('collapsed');
      button.setAttribute('aria-expanded', 'true');
    } else {
      button.classList.add('collapsed');
      button.setAttribute('aria-expanded', 'false');
    }
  }
  Logout() {
    const data = {
      user_id: this.user_id,
      session_id: this.session_id,
        status: 'logout'
    };
    if (data) {
      this._authService.Logout(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            localStorage.clear();
            this.router.navigate([''])
            this._sharedService.setLoading(false);
          } else {
            this._tosterService.warning(res.message)
          }
        },
        error: (err: any) => {
          this._sharedService.setLoading(false);
          if (err.error.status == 422) {
            this._tosterService.warning(err.error.message)
          } else {
            this._tosterService.error('Internal Server Error')
          }
        }
      })
    }
  }
}