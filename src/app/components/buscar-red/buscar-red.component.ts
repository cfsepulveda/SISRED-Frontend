import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Red } from '../../services/red/red';
import { BuscarRedsService } from '../../services/red/buscar-reds/buscar-reds.service';

declare function setup(): any;

@Component({
  selector: 'app-buscar-red',
  templateUrl: './buscar-red.component.html',
  styleUrls: ['./buscar-red.component.css']
})
export class BuscarRedComponent implements OnInit {

  public buscarRedForm: FormGroup;
  userId: number = 4;
  reds: Red[] = [];
  pagina: number = 1;
  paginaSize: number = 5;
  cargando: boolean = false;

  constructor(private buscarRedsService: BuscarRedsService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    setup();
    this.buscarRedForm = new FormGroup({
      fechaInicio: new FormControl(),
      fechaCierre: new FormControl(),
      palabra: new FormControl(),
    });
  }

  buscarRed() {
    this.cargando = true;
    this.spinner.show()
    this.buscarRedsService.buscarReds(this.userId, this.formatFecha(this.buscarRedForm.get('fechaInicio').value), 
      this.formatFecha(this.buscarRedForm.get('fechaCierre').value), this.buscarRedForm.get('palabra').value)
      .then(reds => {
        console.log(reds);
        this.spinner.hide()
        this.reds = reds;
      })
      .catch(err => {
        this.spinner.hide();
        console.log(err);
      });
  }

  formatFecha(fecha) {
    let res = null;
    if(fecha !== null) {
      let year = fecha.year;
      let month = fecha.month<10 ? `0${fecha.month}` : fecha.month;
      let day = fecha.day<10 ? `0${fecha.day}` : fecha.day;
      res = `${year}-${month}-${day}`;
    }
    return res
  }

}
