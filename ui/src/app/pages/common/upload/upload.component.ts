import {
  Component, Input, OnInit,
  ViewEncapsulation, Output,
  EventEmitter, ViewChild, ElementRef
} from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {
  // Variables File Upload
  readonly WAITING_FILE = 'No se a cargado ningun archivo para procesar';
  public textFromFile: string;
  public isShowTextFromFile: boolean;
  public isBtnUploadShow: boolean;
  public textToStateFile: string;
  public filename: any;
  public columnsDescribe: Array<string>;
  @ViewChild('input')
  myInputVariable: any;
  @Output() upload = new EventEmitter<any>();
  @Input() isBase64;
  
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    
  }


  fileChange(input) {
    //console.log("file changes ")

    this.isShowTextFromFile = false;
    this.textFromFile = '';
    const reader = new FileReader();
    if (input.files.length) {

      this.filename = input.files[0].name;
      //console.log("es base 64 ")
      //console.log(this.isBase64)
      if (this.toBoolean(this.isBase64)) {

        this.base64(reader, input);
      }
      else {

        this.textFile(reader, input);
      }
    }
  }


  base64(reader: FileReader, input: any) {
  //console.log("Es un base 64")

    reader.readAsDataURL(input.files[0]);
    reader.onload = () => {
 
      this.textFromFile = reader.result;
    };
    reader.onerror = error => {
      console.log('Error: ', error);
    };



  }
  textFile(reader: FileReader, input: any) {
    //console.log("Es un texto")


    reader.onloadstart = event => {
      this.textToStateFile = 'Archivo listo para procesar, de click en el boton de subir archivo para iniciar';
      this.isBtnUploadShow = true;
    }
    reader.onload = event => {
      this.textFromFile = reader.result;
    }
    reader.onerror = event => {
      this.textToStateFile = 'A ocurrido un error al leer el archivo';
    }
    reader.readAsText(input.files[0]);



  }

  readFile() {
    this.isShowTextFromFile = true;

    if (this.toBoolean(this.isBase64)) {
      this.upload.emit({ name: this.filename, data: this.textFromFile });


    } else {
      this.upload.emit(this.textFromFile);
    }

    this.removeFile();

  }


  removeFile(): void {
    this.filename = '';
    this.textFromFile = '';
    this.isShowTextFromFile = false;
    this.textToStateFile = this.WAITING_FILE;
    this.isBtnUploadShow = false;
    this.myInputVariable.nativeElement.value = "";

  }

  /**
   * 
   * @param val 
   */
  public toBoolean(val: string): boolean {
    try {
        return JSON.parse(val);
    }
    catch (e) {
      return false;
    }
  }

}
