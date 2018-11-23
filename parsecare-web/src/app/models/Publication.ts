import {Usuario} from "./Usuario";

export class Publication {
  contenido: string;
  topic: string;
  archivo: string;
  user: Usuario = new Usuario();
  comments: Comment[] = [];

}
