import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { LoginService } from "src/app/login-screen/login.service";
import { Project } from "src/model/project";
import { DashboardService } from "../dashboard.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
    public isMenuCollapsed = true;

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.router.navigate(["dashboard/project-list"]);
    }

    
}