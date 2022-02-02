import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServiceCall } from '../../services/service-call/service-call.service';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss'],
})
export class AuditTrailComponent implements OnInit {
  studyId: any;
  versionA: any;
  versionB: any;
  disableButton = true;
  columnDefs: ColDef[] = [
    {
      headerName: 'Date',
      field: 'entryDateTime',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'System ID',
      field: 'entrySystemId',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'System',
      field: 'entrySystem',
      suppressSizeToFit: false,
      width: 170,
    },
    {
      headerName: '(SDR) Record Version',
      field: 'studyVersion',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Tag',
      field: 'tag',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Status',
      field: 'status',
      suppressSizeToFit: false,
      width: 150,
    },
    {
      headerName: 'Compare A',
      field: '',
      cellRenderer: this.generateCompareA.bind(this),
      suppressSizeToFit: false,
      width: 150,
      sortable: false,
    },
    {
      headerName: 'Compare B',
      field: '',
      cellRenderer: this.generateCompareB.bind(this),
      suppressSizeToFit: false,
      width: 156,
      sortable: false,
    },
    {
      headerName: 'studyId',
      field: '',
      hide: true,
    },
  ];

  rowData = [];
  gridApi: any;
  gridColumnApi: any;
  defaultColDef: { sortable: boolean; resizable: boolean };
  icons = {
    sortAscending:
      '<img src="../../../../assets/Images/alpine-icons/asc.svg" class="imgStyle">',
    sortDescending:
      '<img src="../../../../assets/Images/alpine-icons/desc.svg" class="imgStyle">',
  };
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private serviceCall: ServiceCall,
    private spinner: NgxSpinnerService,
    private _elementRef: ElementRef
  ) {
    this.defaultColDef = {
      sortable: true,
      resizable: true,
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.versionA = '';
      this.versionB = '';
      this.disableButton = true;
      if (Object.keys(params).length !== 0) {
        this.studyId = params['studyId'];
      }
    });
    this.serviceCall.getAuditTrail(this.studyId).subscribe({
      next: (audit: any) => {
        //this.userExists = true;
        this.spinner.hide();

        this.studyId = audit.studyId;
        this.rowData = audit.auditTrail;
      },
      error: (error) => {
        console.log(error);
        // this.userExists = false;
      },
    });
  }
  generateCompareA(params: any) {
    console.log(params);
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio" name="compareA" class="radioA ' +
      params.data?.studyVersion +
      'A"> <span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      console.log('button clicked');
      self.setRadio(params.data, 'A');
    });

    return eDiv;
  }
  generateCompareB(params: any) {
    console.log(params);
    const eDiv = document.createElement('div');
    const self = this;
    eDiv.innerHTML =
      '<label class="container-radio"><input type="radio"  name="compareB" class="radioB ' +
      params.data?.studyVersion +
      'B"><span class="checkmark"></span></label>';
    eDiv.addEventListener('click', () => {
      console.log('button clicked');
      self.setRadio(params.data, 'B');
    });

    return eDiv;
  }
  onGridReady(params: {
    api: { sizeColumnsToFit: () => void };
    columnApi: any;
  }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    var defaultSortModel = [
      {
        colId: 'entryDateTime',
        sort: 'desc',
        sortIndex: 0,
      },
    ];
    params.columnApi.applyColumnState({ state: defaultSortModel });
  }
  setRadio(selectedVal: any, from: string) {
    let disableField = from === 'A' ? 'B' : 'A';
    if (from == 'A') {
      this.versionA = selectedVal.studyVersion;
    } else {
      this.versionB = selectedVal.studyVersion;
    }
    console.log('A', selectedVal, 'from', from);
    let domElement = this._elementRef.nativeElement.getElementsByClassName(
      'radio' + disableField
    );
    console.log(domElement);
    for (var i = 0; i < domElement.length; i++) {
      domElement[i].removeAttribute('disabled');
    }
    this._elementRef.nativeElement
      .getElementsByClassName(selectedVal.studyVersion + disableField)[0]
      .setAttribute('disabled', true);
    //this.disableButton = ! (typeof(this.versionA) == 'number' && typeof(this.versionB) == 'number')
    this.disableButton = this.versionA === '' || this.versionB === '';
  }

  versionCompare() {
    this.router.navigate(
      [
        'compare',
        {
          studyId: this.studyId,
          verA: this.versionA,
          verB: this.versionB,
        },
      ],
      { relativeTo: this.route }
    );
  }
}
