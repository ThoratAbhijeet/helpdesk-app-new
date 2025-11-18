import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  //api
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  //all department list wma ..............................................................
  getAllDepartmentListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/department/wma');
  }
  //all priority list wma ..............................................................
  getAllPriorityListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/priority/wma');
  }
  //all categories list wma ..............................................................
  getAllCategoriesListWma(department_id:any): Observable<any> {
      let params: any = {
      department_id: department_id
    };
    if (department_id === '' || department_id === 'null') delete params.department_id;
    return this.http.get(this.baseUrl + 'api/ticket-categories/wma',{
      params:params
    });
  }
  //customer wma assign to
  getAllCustomerListWma(user_id: any): Observable<any> {
    let params: any = {
      user_id: user_id
    };
  //  if (user_id === '' || user_id === 'null') delete params.user_id;
    return this.http.get(this.baseUrl + 'api/user/customer-wma', {
      params: params
    })
  }
    //customer wma assign to
  getAllTechnicianListWma(user_id: any): Observable<any> {
    let params: any = {
      user_id: user_id
    };
  //  if (user_id === '' || user_id === 'null') delete params.user_id;
    return this.http.get(this.baseUrl + 'api/user/technician-wma', {
      params: params
    })
  }
  //add new ticket...
  addTicket(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/ticket', data);
  }
  //update ticket...
  editTicket(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/ticket/' + id, data);
  }
  //ticket get by id ...
  getTicketById(id: any) {
    return this.http.get(this.baseUrl + 'api/ticket/' + id)
  }
  //ticket list
  getTicketList(key: any, page: any, perPage: any, user_id: any,customer_id:any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage,
      key: key,
      user_id: user_id,
      customer_id:customer_id
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }
    if (key === '' || key === 'null') delete params.key;
    if (user_id === '' || user_id === 'null') delete params.user_id;
      if (customer_id === '' || customer_id === 'null') delete params.customer_id;
    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/ticket', {
      params: params
    });

  }
  getOpenTicketList(key: any, page: any, perPage: any, user_id: any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage,
      key: key,
      user_id: user_id
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }
    if (key === '' || key === 'null') delete params.key;
    if (user_id === '' || user_id === 'null') delete params.user_id;
    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/ticket/today-open-ticket', {
      params: params
    });

  }
    getStatusWiseTicketList(key: any, page: any, perPage: any, ticket_status: any,user_id:any,customer_id:any): Observable<any> {
    let params: any = {
      page: page,
      perPage: perPage,
      key: key,
      ticket_status: ticket_status,
      user_id: user_id,
      customer_id:customer_id
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }
    if (key === '' || key === 'null') delete params.key;
    if (ticket_status === '' || ticket_status === 'null') delete params.ticket_status;
    if (user_id === '' || user_id === 'null') delete params.user_id;
     if (customer_id === '' || customer_id === 'null') delete params.customer_id;
    // Make the HTTP GET request
    return this.http.get(this.baseUrl + 'api/ticket/status-list', {
      params: params
    });

  }
  // status wise count ticket
  getDashBoardTicketStatusCount(user_id: any,customer_id:any): Observable<any> {
    let params: any = {
      user_id: user_id,
      customer_id:customer_id
    };
    if (user_id === '' || user_id === 'null') delete params.user_id;
    if (customer_id === '' || customer_id === 'null') delete params.customer_id;
    return this.http.get(this.baseUrl + 'api/ticket/status-count', {
      params: params
    })
  }
  // get date wise count graph Ticket api
  getTicketStatusCount(user_id: any,customer_id:any): Observable<any> {
    let params: any = {
      user_id: user_id,
      customer_id:customer_id
    };
    if (user_id === '' || user_id === 'null') delete params.user_id;
    if (customer_id === '' || customer_id === 'null') delete params.customer_id;
    return this.http.get(this.baseUrl + 'api/ticket/month-wise-status-count', {
      params: params
    })
  }
  //get all Tickets report list  ...............................................................
  getAllTicketsListReport(page: any, perPage: any, fromDate: any, toDate: any, department_id: any, priority_id: any, ticket_category_id: any, assigned_to: any, key: any, user_id: any,customer_id: any): Observable<any> {
    let params = {
      'page': page,
      'perPage': perPage,
      'fromDate': fromDate,
      'toDate': toDate,
      'department_id': department_id,
      'priority_id': priority_id,
      'ticket_category_id': ticket_category_id,
      'assigned_to': assigned_to,
      'key': key,
      'user_id': user_id,
      'customer_id':customer_id
    };
    // Check if page or perPage is empty and remove them from params if so
    if (page === '' || perPage === '') {
      delete params.page;
      delete params.perPage;
    }

    if (fromDate == '' || toDate == '') {
      delete params['fromDate'];
      delete params['toDate'];
    }
    if (department_id == '' || department_id == 'null') {
      delete params['department_id'];
    }
    if (priority_id == '' || priority_id == 'null') {
      delete params['priority_id'];
    }
    if (ticket_category_id == '' || ticket_category_id == 'null') {
      delete params['ticket_category_id'];
    }
    if (assigned_to == '' || assigned_to == 'null') {
       delete params['assigned_to'];
    }
    if (key === '' || key === 'null') delete params.key;
    if (user_id == '' || user_id == 'null') {
      delete params['user_id'];
    }
    if(customer_id== '' || customer_id == 'null') {
      delete params['customer_id'];
    }
    return this.http.get(this.baseUrl + 'api/ticket', {
      params: params
    })
  }
       // download Tikit  list
  downloadTikitList(user_id: any, key: any,customer_id:any): Observable<any> {
    let params: any = {
      user_id:user_id,
      key: key,
      customer_id:customer_id
    };
      if (user_id == '' || user_id == 'null') {
      delete params['user_id'];
    }
    if (key === ''|| key === 'null') delete params.key;
    if (customer_id == '' || customer_id == 'null') {
      delete params['customer_id'];
    }
    return this.http.get(this.baseUrl + 'api/ticket/download', {
      responseType: 'blob',
      params: params
    })
  }
     //download  Tikit attachment  document file
    downloadCustomerTicketAttachmentDocument(ticket_id:any): Observable<any> {
      let params: any = {
  ticket_id:ticket_id,
  };
   if (ticket_id === '' || ticket_id === 'null') delete params.ticket_id;
 
    return this.http.get(this.baseUrl + 'api/ticket/doc-download', {
      responseType: 'blob',
      params: params
    })
  }
    // Tikit report download
   downloadAllTikitReportList(fromDate: any, toDate: any, department_id: any, priority_id: any, ticket_category_id:any, assigned_to:any, key: any,user_id:any,customer_id:any): Observable<any> {
    let params = {
       'fromDate': fromDate,
      'toDate': toDate,
      'department_id': department_id,
      'priority_id': priority_id,
      'ticket_category_id': ticket_category_id,
      'assigned_to':assigned_to,
      'user_id': user_id,
      'key': key,
      'customer_id':customer_id
    };

 if (fromDate == '' || toDate == '') {
      delete params['fromDate'];
      delete params['toDate'];
    }
    if (department_id == '' || department_id == 'null') {
      delete params['department_id'];
    }
    if (priority_id == '' || priority_id == 'null') {
      delete params['priority_id'];
    }
    if (key === '' || key === 'null') delete params.key;
      if (ticket_category_id == '' || ticket_category_id == 'null') {
      delete params['ticket_category_id'];
    }
     if (assigned_to == '' || assigned_to == 'null') {
      delete params['assigned_to'];
    }
     if (user_id == '' || user_id == 'null') {
      delete params['user_id'];
    }if (customer_id == '' || customer_id == 'null') {
      delete params['customer_id'];
    }
    return this.http.get(this.baseUrl + 'api/ticket/download', {
      responseType: 'blob',
      params: params
    })
  }
   //all Company list wma ..............................................................
  getAllCompanyListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/user/customer-wma');
  }
  //all service list wma ..............................................................
  getAllServiceListWma(customer_id:any): Observable<any> {
      let params: any = {
      customer_id: customer_id
    };
    if (customer_id === '' || customer_id === 'null') delete params.customer_id;
    return this.http.get(this.baseUrl + 'api/user/customer-service',{
      params:params
    });
  }
}
