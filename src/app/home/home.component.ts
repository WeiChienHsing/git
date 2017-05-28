import { Component, Input, ViewChild } from '@angular/core';
import { FullTreeComponent } from '../fulltree/fulltree.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'xx',
  styles: [  
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `
      <nav class="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button class="navbar-toggler navbar-toggler-right hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand" href="#">Dashboard</a>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active"  (click)="showAlert();" (follow)="doFollow()">
            <a class="nav-link" href="#">Home</a>
          </li>
        </ul>
        <form class="form-inline mt-2 mt-md-0">
          <input class="form-control mr-sm-2" type="text" placeholder="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>
      <div class="container-fluid">
      <div class="row">
        <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar" style="padding:0px;padding-left:20px;">
            <app-fulltree></app-fulltree>
        </nav>

        <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
          <h2>Section title</h2>
          <div class="table-responsive">
            <home-list></home-list>
          </div>
        </main>
      </div>
    </div>
  `
})
export class HomeComponent {
  @ViewChild(FullTreeComponent) alert: FullTreeComponent;

  showAlert() {
    console.log(this.alert.show());
  }
}