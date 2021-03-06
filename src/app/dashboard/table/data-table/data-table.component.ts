import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Http } from '@angular/http';

import { DataService } from '../../../shared/data/index';

@Component({
    selector: 'app-data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
    public data: any;
    public sortBy = 'Submitted Date';
    // data table settings
    public settings: any = {
        columns: {
            'Submitted Date': {
                title: 'Submitted Date'
            },
            Customer: {
                title: 'Customer'
            },
            Description: {
                title: 'Description'
            },
            Employee: {
                title: 'Employee'
            },
            'Open/Closed Status': {
                title: 'Status'
            },
            'Closed Timestamp': {
                title: 'Closed Timestamp'
            }
        }
    };
    errorMessage: string;
    source: LocalDataSource; // add a property to the component

    constructor(public dataService: DataService) {
        this.source = new LocalDataSource();
    }

    // call the function to fetch data from api 
    ngOnInit() {
        this.getTable();
        setInterval(() => {
            this.getTable();
        }, 30000);
    }

    getTable() {
        this.dataService.getIssuesList()
            .subscribe(
            names => {
                this.source.load(names);
                this.data = names;
            },
            error => this.errorMessage = <any>error
            );
    }
}
