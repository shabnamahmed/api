import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { ApiCallService } from './api-call.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
 

  
export class AppComponent {
  title = 'apiApp';

  form!: FormGroup;
  call: any;
  command:any;
  error = false;
  success = false;
  msg : any;
  data:any;
  id:any;
  constructor( private http: HttpClient,private router: Router, private api:ApiCallService,
    fb: FormBuilder,
  )
  
  {}
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      command: new FormControl('', Validators.required),
      data: new FormControl('', Validators.required),
      id:new FormControl('', Validators.required),
     
    });
  }
  get f(){
    return this.form.controls;
  }
    
  submit(){
    console.log(this.form.value);
   
    this.call  = this.form.get('name');
    this.command= this.form.get('command');
    this.data = this.form.get('data');
    this.id= this.form.get('id');
    console.log(this.command.value);
   
    switch(this.command.value){
     
      case 'PUT':
        this.api.getput(this.call.value,this.id.value).subscribe(res => {
         this.msg = res;
          this.success = true;

        },
        err=>
        {
          this.error = true;
          this.msg = err;
        })
        break;

      case 'DELETE':
        this.api.delete(this.call.value,this.id.value).subscribe(res => {
          this.msg = res;
          this.success = true;
        },
        err=>
        {
          this.error = true;
          this.msg = err;
          
        })
        break;

        case 'POST':
        this.api.create(this.call.value,this.data.value).subscribe(res => {
          this.msg = res;
          this.success = true;
        },
        err=>
        {
          this.error = true;
          this.msg = err;
          
        })
        break;

      default:
        console.log("No match");
    }
  
  
  
  }

   
  
  
}
