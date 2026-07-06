import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../customer/customer.service';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  isEdit = false;
  TicketForm!: FormGroup;
  allCategoryList: Array<any> = [];
  searchCategoryValue: string = '';
  filteredCategoryList: any[] = []; 
  userId: any;
  TicketId: any;
    allTicketDetails: any = {};
    AiSupportDetails: any = {};
    aiResponse: string = '';
customerResponse: string = '';
isLoadingAi: boolean = false;
isKnowledgeOpen = true;
openedIndex: number = 0; 
  searchKey: any = '';
  TicketcategoryId: any;
  constructor(
    private fb: FormBuilder,
    private _toastrService: ToastrService,
    private _customerService: CustomerService,
    private _sharedService: SharedService,
    private url: ActivatedRoute,
    private location: Location,
    private ngZone: NgZone
  ) { }
  ngOnInit(): void {
    const data = localStorage.getItem('data');
    this.userId = data ? JSON.parse(data)?.user_id : null;
    this.createForm();
    this.getAllCategoryListWma();
    this.TicketId = this.url.snapshot.params['id'];
    
    //activate route get employee id


  }

  //Ticket form
  createForm() {
    this.TicketForm = this.fb.group({
      issue: [null],
      ticket_category_id: [''],
      description: [''],
      user_id:[this.userId ]
    });
    
  }

  get controls() {
    return this.TicketForm.controls;
  }
toggleAccordion(index: number) {
  this.openedIndex = this.openedIndex === index ? -1 : index;
}



 getSearchInput(searchKey: any) {
    this.searchKey = searchKey;
    this.getAiSupportById();
  }


getAiSupportById() {
  this._customerService.getAiSupportList('','',this.searchKey, this.TicketcategoryId ?? '').subscribe({
    next: (result: any) => {

      this.AiSupportDetails = result.data || [];

      if (this.AiSupportDetails.length > 0) {

        // Gemini response hide
        this.aiResponse = '';

        // Knowledge Base card show
        this.customerResponse = 'available';


      } else {

        this.customerResponse = '';
      }

    },
    error: () => {
      this.AiSupportDetails = [];
      this.customerResponse = '';
    }
  });
}

formatResponse(text: string): string {
  if (!text) return '';

  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\* (.*)$/gm, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}
  //Category list wma
  getAllCategoryListWma() {
    this._customerService.getAllCategoriesListWma('').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCategoryList = res.data;
          this.filteredCategoryList = this.allCategoryList;
        }
      }
    });
  }

  filterCategory() {
    if (this.searchCategoryValue !== '') {
      this.filteredCategoryList = this.allCategoryList.filter(project =>
        project.name.toLowerCase().includes(this.searchCategoryValue.toLowerCase())
      );
    } else {
      this.filteredCategoryList = this.allCategoryList;
    }
  }
onCategoryChange(categoryId: any) {

  // null ya undefined dono case handle
  this.TicketcategoryId = categoryId ?? '';

  const selectedCategory = this.filteredCategoryList.find(
    (x: any) => x.ticket_category_id == categoryId
  );

  if (selectedCategory) {

    this.TicketForm.patchValue({
      description: selectedCategory.description,
      issue: ''
    });

  } else {

    // All Category select hone par
    this.TicketForm.patchValue({
      description: '',
      issue: ''
    });

    this.TicketcategoryId = '';
  }

  this.TicketForm.get('issue')?.reset();

  this.getAiSupportById();
}


  // cancel route location service
  goToback() {
    this.location.back();
  }

}

