import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent  {
  uploadService: any;

  constructor(
    private httpClient: HttpClient,
  ) { }
  
  public uploadfile(file: File) {
    let formParams = new FormData();
    formParams.append('file', file)
    return this.httpClient.post('http://localhost:4200/uploadFile', formParams)
  }



  file: any;
 
 
  onFilechange(event: any) {
    //console.log(event.target.files[0])
    this.file = event.target.files[0]
  }
  
  upload() {
    if (this.file) {
      this.uploadService.uploadfile(this.file).subscribe(() => {
        alert("Uploaded")
      })
    } else {
      alert("Please select a file first")
    }
  }



/*fileToUpload: File | null=null;
  httpClient: any;


*choose(files: FileList){
  this.fileToUpload=files.item(0);
}*/


/*postFile(fileToUpload: File): Observable<boolean> {
  const endpoint = 'your-destination-url';
  const formData: FormData = new FormData();
  formData.append('fileKey', fileToUpload, fileToUpload.name);
  return this.httpClient
    .post(endpoint, formData, )
    .map(() => { return true; })
    .catch((e: any) => this.handleError(e));
}
  handleError(e: any) {
    throw new Error('Method not implemented.');
  }*/


}





