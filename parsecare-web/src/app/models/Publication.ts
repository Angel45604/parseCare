import {Usuario} from "./Usuario";

export class Publication {
  id: number;
  contenido: string;
  topic: string;
  archivo: string;
  user: Usuario = new Usuario();
  comments: Comment[] = [];

}
