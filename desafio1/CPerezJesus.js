class Usuario {
    constructor(nombre,apellido,libros =[] ,mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(mascota){
        this.libros.push(mascota)
    }

    getMascotas(){
        return this.mascotas.length;
    }

    addBook(book,author){
        let libro = {
            nombre:book, 
            autor:author
        }
        this.libros.push(libro);
    }

    getBooks(){
        const nombreLibros = this.libros.map(libro => libro.nombre);
        return nombreLibros;
    }

}

let usuario = new Usuario('Jesus', 'Perez',[{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}],['perro', 'gato'])

console.log(usuario)