import {Usuario} from "./Usuario";

export class Comment {
  comentario: string;
  user: Usuario = new Usuario();
  publicationId: number;
}
