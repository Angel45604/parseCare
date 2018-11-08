export class Publication {
    constructor(
        public topic : string,
        public content : string,
        public user: string,
        public likes: number
    ){}
}