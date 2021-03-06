import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter(); 
  model: any = {};

  constructor(private accountService: AccountService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
  }

  register (){
    this.accountService.register(this.model).subscribe(response => {
      
      
      window.setTimeout(function(){location.reload()},500)
      this.router.navigateByUrl('/')
    }, error => {
      console.log(error);
      this.toastr.error("Neispravno korisnicko ime ili lozinka");
    })
  }

  cancel (){
    this.cancelRegister.emit(false);
  }

}
