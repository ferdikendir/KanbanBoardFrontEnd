import { NgModule } from "@angular/core";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsModule } from "@ngxs/store";
import { ProjectState } from "../project-screen/state/project.state";

@NgModule({
    imports: [
        NgxsModule.forRoot([
            ProjectState
        ]),
        NgxsLoggerPluginModule,
        NgxsReduxDevtoolsPluginModule
    ],
    exports: []
  })
  export class StoreModule { }