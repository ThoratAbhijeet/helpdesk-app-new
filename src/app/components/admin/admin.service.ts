import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
//api
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
    //ticket-categories list
    getTicketCategoriesList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/ticket-categories', {
        params: params
      });
  
    }
       //add new Categories...
  addCategories(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/ticket-categories', data);
  }
  //update Categories...
  editCategories(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/ticket-categories/' + id, data);
  }
  // Categories get by id ...
  getCategoriesById(id: any) {
    return this.http.get(this.baseUrl + 'api/ticket-categories/' + id)
  }
  // Categories enable disable
  CategoriesEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/ticket-categories/' + id, body, {
      params: params
    });
  }

     //ticket-department list
    getDepartmentList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/department', {
        params: params
      });
  
    }
    //Department wma  
    getAllDepartmentListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/department/wma')
  }
   //add new departments...
  addDepartment(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/department', data);
  }
  //update departments...
  editDepartment(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/department/' + id, data);
  }
  // departments get by id ...
  getDepartmentById(id: any) {
    return this.http.get(this.baseUrl + 'api/department/' + id)
  }
  // departments enable disable
  departmentEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/department/' + id, body, {
      params: params
    });
  }
    //Role wma  
    getAllRoleListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/role/wma')
  }
     //add new Role...
  addRole(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/role', data);
  }
  //update Role...
  editRole(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/role/' + id, data);
  }
  // Role get by id ...
  getRoleById(id: any) {
    return this.http.get(this.baseUrl + 'api/role/' + id)
  }
  // Role enable disable
  roleEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/role/' + id, body, {
      params: params
    });
  }
        //priority list
    getPriorityList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/priority', {
        params: params
      });
  
    }
         //add new priority...
  addPriority(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/priority', data);
  }
  //update priority...
  editPriority(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/priority/' + id, data);
  }
  // priority get by id ...
  getPriorityById(id: any) {
    return this.http.get(this.baseUrl + 'api/priority/' + id)
  }
  // priority enable disable
  priorityEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/priority/' + id, body, {
      params: params
    });
  }
          //role list
    getRoleList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/role', {
        params: params
      });
  
    }
     //customer wma assign to
    getAllCustomerListWma(user_id: any,): Observable<any> {
    let params: any = {
      user_id: user_id
    };
    return this.http.get(this.baseUrl + 'api/user/customer-wma', {
      params: params
    })
  }
     // User list
    getUsersList(key: any, page: any, perPage: any,role_id:any,customer_id:any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key,
        role_id: role_id,
        customer_id:customer_id
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      if(role_id === '' || role_id ==='null')delete params.role_id;
      if(customer_id === '' || customer_id ==='null')delete params.customer_id;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/user', {
        params: params
      });
  
    }
   //add new user...
  addUser(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/user', data);
  }
    //update user...
  editUser(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/user/' + id, data);
  }
  //user get by id ...
  getUserById(id:any) {
    return this.http.get(this.baseUrl + 'api/user/' + id)
  }
   //employee technician wma  
    getAllTechnicianEmployeeListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/user/technician-wma')
  }
     // download user  list
  downloadUserList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/user/download', {
      responseType: 'blob',
      params: params
    })
  }
   // user enable disable
 userEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/user/' + id, body, {
      params: params
    });
  }
    //delete  User Assigned ...
  deleteUserAssigned(id: any): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/user/' + id)
  }
      // download role  list
  downloadRoleList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/role/download', {
      responseType: 'blob',
      params: params
    })
  }
  // download priority  list
  downloadPriorityList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/priority/download', {
      responseType: 'blob',
      params: params
    })
  }
   // download department  list
  downloadDepartmentList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/department/download', {
      responseType: 'blob',
      params: params
    })
  }
   // download Category  list
  downloadCategoryList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/ticket-categories/download', {
      responseType: 'blob',
      params: params
    })
  }
    // download Services  list
  downloadServicesList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/service/download', {
      responseType: 'blob',
      params: params
    })
  }
       //Services list
    getServicesList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/service', {
        params: params
      });
  
    }
  // wma Services 
   getAllServicesListWma(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/service/wma')
  }
     //add new Services...
  addServices(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'api/service', data);
  }
  //update Services...
  editServices(id: any, data: any,): Observable<any> {
    return this.http.put(this.baseUrl + 'api/service/' + id, data);
  }
  // Services get by id ...
  getServicesById(id: any) {
    return this.http.get(this.baseUrl + 'api/service/' + id)
  }
  // Services enable disable
  ServicesEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/service/' + id, body, {
      params: params
    });
  }
  //customer wma assign to
    getUserAgentById(department_id: any,): Observable<any> {
    let params: any = {
      department_id: department_id
    };
    return this.http.get(this.baseUrl + 'api/user/wma', {
      params: params
    })
  }
       // Customer list
    getCustomerList(key: any, page: any, perPage: any): Observable<any> {
      let params: any = {
        page: page,
        perPage: perPage,
        key: key
      };
      // Check if page or perPage is empty and remove them from params if so
      if (page === '' || perPage === '') {
        delete params.page;
        delete params.perPage;
      }
      if (key === '' || key === 'null') delete params.key;
      // Make the HTTP GET request
      return this.http.get(this.baseUrl + 'api/user/customer', {
        params: params
      });
  
    }
     getCustomerById(id:any) {
    return this.http.get(this.baseUrl + 'api/user/customer/' + id)
  }
       // download customer  list
  downloadCustomerList(key: any): Observable<any> {
    let params: any = {
      key: key
    };
    if (key === ''|| key === 'null') delete params.key;
    return this.http.get(this.baseUrl + 'api/user/download', {
      responseType: 'blob',
      params: params
    })
  }
   // customer enable disable
 customerEnableDisable(id: any, status: any,): Observable<any> {
    const body = { status: status };
    let params = new HttpParams().set('status', status);
    return this.http.patch(this.baseUrl + 'api/user/customer' + id, body, {
      params: params
    });
  }
}

