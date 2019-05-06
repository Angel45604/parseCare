import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../services/Usuarios.Service";
import {PublicacionService} from "../services/Publicaciones.Service";
import {Publication} from "../models/Publication";
import {Router} from "@angular/router";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-memes',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {
  publication: Publication;
  picture: any;
  constructor(private publicationService: PublicacionService, private usuarioService: UsuarioService, private publicacionService: PublicacionService, private router: Router, private firebaseStorage: AngularFireStorage) {
    this.publication = new Publication();
  }
  usuarios = [];

  publicaciones = [];

  submitPublication() {
    console.log(this.publication.archivo);
    this.publication.user.id = parseInt(sessionStorage.getItem('id'));
    this.submitPicture();
  }

  getBase64(file) {
    let reader = new FileReader();
    let base;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.publication.archivo = reader.result;
    }
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

  }

  submitPicture() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg')
      .putString(this.publication.archivo, 'data_url');

    pictures.then(response => {
      this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg')
        .getDownloadURL();

      this.picture.subscribe(picture => {
        this.publication.archivo = picture;

        this.publicationService.addPublicacion(this.publication)
          .subscribe(res => {
            console.log(res);
            alert('Publicacion publicada');
            this.router.navigate(['/']);
          }, err => {
            console.error(err);
          });
      }, err => {
        console.error(err);
      });
    }).catch(err => {
      console.error(err);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.getBase64(fileInput.target.files[0]);
  }

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
     //console.log(usuarios);
      this.usuarios = usuarios;
    }, err => {
      console.error(err);
    });
    this.publicacionService.getPublicaciones().subscribe(publicaciones => {
      console.log(publicaciones);
      this.usuarios = publicaciones;
    }, err => {
      console.error(err);
    });
  }
}