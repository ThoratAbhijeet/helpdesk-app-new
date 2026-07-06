import { Component, NgZone, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../customer/customer.service';
import { SharedService } from '../../../shared/shared.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ai-support',
  templateUrl: './ai-support.component.html',
  styleUrl: './ai-support.component.scss'
})
export class AiSupportComponent implements OnInit {
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
       issue: ['', [this.technicalQueryValidator()]],
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

submit() {

  if (this.TicketForm.get('issue')?.invalid) {
    this.TicketForm.get('issue')?.markAsTouched();
    return;
  }

  this.addTicketAISupport();
}

  //add Ticket
addTicketAISupport() {

  const data = this.TicketForm.getRawValue();

  // Form data save
  localStorage.setItem('aiSupportForm', JSON.stringify(data));

  this.isLoadingAi = true;

  this._customerService.addTicketAiSupport(data).subscribe({

    next: (res: any) => {

      this.isLoadingAi = false;

      if (res.status === 200 || res.status === 201) {

        this.aiResponse = res.data;
        this.customerResponse = '';
        this.openedIndex = -1;

        const savedData = localStorage.getItem('aiSupportForm');

        if (savedData) {
          const formData = JSON.parse(savedData);
          this.getAiSupportById(formData.ticket_category_id);
        }

        // Clear only issue field
        this.TicketForm.patchValue({
          issue: ''
        });

        this._toastrService.success(res.message);

      } else {
        this._toastrService.warning(res.message);
      }

    },

    error: (err: any) => {

      this.isLoadingAi = false;
      this._sharedService.setLoading(false);

      if (err.error?.status === 422) {
        this._toastrService.warning(err.error.message);
      } else {
        this._toastrService.error('Internal Server Error');
      }

    }

  });

}


getAiSupportById(id: any) {
  this._customerService.getAiSupportById(id).subscribe({
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
onCategoryChange(categoryId: number) {
  this.getAiSupportById(categoryId)
  const selectedCategory = this.filteredCategoryList.find(
    (x: any) => x.ticket_category_id == categoryId
  );

  if (selectedCategory) {
    this.TicketForm.patchValue({
      description: selectedCategory.description
    });
     this.TicketForm.patchValue({
      issue: ''
    });
    this.TicketForm.get('issue')?.reset();
  }
}


  // cancel route location service
  goToback() {
    this.location.back();
  }
technicalQueryValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = (control.value || '').toLowerCase().trim();

    if (!value) {
      return null;
    }

   // Non Technical Keywords
  const blockedKeywords = [
    'distance',
    'weather',
    'temperature',
    'train',
    'flight',
    'movie',
    'cricket',
    'ipl',
    'football',
    'recipe',
    'hotel',
    'restaurant',
    'shopping',
    'amazon',
    'flipkart',
    'salary',
    'stock',
    'bitcoin',
    'news',
    'pune',
    'mumbai',
    'delhi',
    'goa',
    'tour',
    'travel',
    'visa',
    'google',
    'youtube',
    'instagram',
    'facebook',
    'whatsapp status'
  ];

    if (blockedKeywords.some(x => value.includes(x))) {
      return { technicalQuery: true };
    }

    return null;
  };
}
}

