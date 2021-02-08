import { Component, OnInit } from '@angular/core';
import { CnnService } from '../../services/cnn.service';
import {FormControl, FormGroup, Validators , FormBuilder} from '@angular/forms';
import {Message, MessageService} from 'primeng/api';
import { element } from 'protractor';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [MessageService]
})
export class CrudComponent implements OnInit {

  submitted = false;
  numero: any;
  persona: any; 
  listaPersonas: any; 
  listIdentificacion: any;
  personaForm: FormGroup;
  personaEdit: FormGroup;
  lnumero:any
  id_param: string;

  constructor(private cnn: CnnService,private messageService: MessageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.GetAll();
    this.FromInit();
    this.personaForm = this.formBuilder.group({
      id: new FormControl(''),
      codigoInterno: new FormControl(''),
      fechaCreacion: new FormControl(''),
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido:  new FormControl(''),
      identificacion: new FormControl('', Validators.required) ,
      fechaExpedicion: new FormControl('',Validators.required),
      lugarExpedicion: new FormControl('') ,
      tipo: new FormControl('') ,
      estadoCivil: new FormControl('') ,
      sexo: new FormControl('') ,
      correoElectronico: new FormControl('', [Validators.required, Validators.email]) ,
      fechaNacimiento: new FormControl('',Validators.required) ,
      entidad: new FormControl('', Validators.required) ,
      fechaIngreso: new FormControl('',Validators.required) ,
      estadoAfiliacion: new FormControl('') ,
      category: new FormControl('')
    });

  }

  FromInit(){
    this.personaEdit = this.formBuilder.group({
      id: new FormControl(''),
      codigoInterno: new FormControl(''),
      documentVersion: new FormControl(''),
      fechaCreacion: new FormControl(''),
      primerNombre: new FormControl('', Validators.required),
      segundoNombre: new FormControl(''),
      primerApellido: new FormControl('', Validators.required),
      segundoApellido:  new FormControl(''),
      identificacion: new FormControl('', Validators.required) ,
      fechaExpedicion: new FormControl(''),
      lugarExpedicion: new FormControl('') ,
      tipo: new FormControl('') ,
      estadoCivil: new FormControl('') ,
      sexo: new FormControl('') ,
      correoElectronico: new FormControl('') ,
      fechaNacimiento: new FormControl('') ,
      entidad: new FormControl('') ,
      fechaIngreso: new FormControl('') ,
      estadoAfiliacion: new FormControl('') ,
      category: new FormControl('')
    });

  }
  
get f() {return this.personaForm.controls}

Limpiar()
{  
this.personaForm.reset({
  primerNombre: '',
  segundoApellido: '',
  identificacion: ''
}

);
}

  Guardar(){

    this.submitted = true;
  if (this.personaForm.invalid)
  {
    return
  }
  
    this.cnn.create(this.setPersona()).subscribe( x => { console.log(x);
      if(x)
      {
        this.messageService.add({severity:'success', summary: 'Enviado', detail: 'Se Guardo correctamente'});
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Message Content'});
      }
      
      this.GetAll();
    } );
    this.Limpiar();
    this.submitted = false;
  }

  GetAll(){
    this.cnn.getAll().subscribe(v => {
      console.log(v);
    this.listaPersonas = v
    });
  }

  Delete( id)
  {
    this.cnn.delete(id).subscribe( v => { console.log(v);
      this.messageService.add({severity:'error', summary: 'Eliminado', detail: 'Registro Eliminado'});
    this.GetAll();
    });

  }

  CargarEditar( item)
  {
    let enti,fIngreso,eAfiliacion;

    item.coreEps.forEach(element => {
     enti = element.entidad,
     fIngreso = element.fechaIngreso,
      eAfiliacion = element.estadoAfiliacion;
    });

    this.id_param = item.id;

    this.personaEdit.setValue({
    id: item.id,
    documentVersion: item.documentVersion,
    fechaCreacion: item.fechaCreacion,
    codigoInterno: item.codigoInterno,
    primerNombre: item.primerNombre,
    segundoNombre: item.segundoNombre,
    primerApellido: item.primerApellido,
    segundoApellido:  item.segundoApellido,
    identificacion: item.identificacion.numero ,
    fechaExpedicion: item.identificacion.fechaExpedicion,
    lugarExpedicion: item.identificacion.lugarExpedicion,
    tipo: item.identificacion.tipo ,
    estadoCivil: item.estadoCivil,
    sexo: item.sexo,
    correoElectronico: item.correoElectronico.correo ,
    fechaNacimiento: item.fechaNacimiento,
    entidad: enti,
    fechaIngreso: fIngreso ,
    estadoAfiliacion: eAfiliacion ,
    category: new FormControl('')
    });
  
  }

  Editar()
  {
    this.id_param
    this.cnn.editar(this.id_param, this.setPersonaEdit()).subscribe( x => {
      this.messageService.add({severity:'info', summary: 'Guardado', detail: 'Se modifico correctamente'});
    this.GetAll();
    });

  }

  setPersona()
  {
    let persona = Object.assign({}, this.personaForm.value);
    persona = {
      schemaVersion: "1",
      documentVersion: 1,
      fechaCreacion: new Date(),
      codigoInterno: persona.codigoInterno,
      primerNombre: persona.primerNombre,
      segundoNombre: persona.segundoNombre,
      primerApellido: persona.primerApellido,
      segundoApellido: persona.segundoApellido,
      identificacion: { numero: persona.identificacion,
        fechaExpedicion: persona.fechaExpedicion,
        lugarExpedicion: persona.lugarExpedicion,
        tipo: persona.tipo
      },
      estadoCivil: persona.estadoCivil,
      sexo: persona.sexo,
      correoElectronico: {correo: persona.correoElectronico},
      fechaNacimiento: persona.fechaNacimiento,
      coreEps: [{entidad: persona.entidad,
        fechaIngreso: persona.fechaIngreso,
        estadoAfiliacion: persona.estadoAfiliacion
      }]
    };

    return persona;
  }

  setPersonaEdit()
  {
    let persona = Object.assign({}, this.personaEdit.value);
    persona = {
      id : persona.id,
      schemaVersion: "1",
      documentVersion: persona.documentVersion + 1,
      fechaCreacion: persona.fechaCreacion,
      fechaUltimaModificacion : new Date(),
      codigoInterno: persona.codigoInterno,
      primerNombre: persona.primerNombre,
      segundoNombre: persona.segundoNombre,
      primerApellido: persona.primerApellido,
      segundoApellido: persona.segundoApellido,
      identificacion: { numero: persona.identificacion,
        fechaExpedicion: persona.fechaExpedicion,
        lugarExpedicion: persona.lugarExpedicion,
        tipo: persona.tipo
      },
      estadoCivil: persona.estadoCivil,
      sexo: persona.sexo,
      correoElectronico: {correo: persona.correoElectronico},
      fechaNacimiento: persona.fechaNacimiento,
      coreEps: [{entidad: persona.entidad,
        fechaIngreso: persona.fechaIngreso,
        estadoAfiliacion: persona.estadoAfiliacion
      }]
    };

    return persona;
  }


}
