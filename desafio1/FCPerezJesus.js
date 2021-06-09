function Usuario2 (nombre,apellido,libros =[] ,mascotas = []){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    this.getFullName = function(){
        return `${this.nombre} ${this.apellido}`;
    }

    this.addMascota = function(mascota){
        this.libros.push(mascota)
    }

    this.getMascotas= function(){
        return this.mascotas.length;
    }

    this.addBook= function(book,author){
        let libro = {
            nombre:book, 
            autor:author
        }
        this.libros.push(libro);
    }

    this.getBooks = function(){
        return this.libros.map(libro => libro.nombre);
    }

}

let usuario2 = new Usuario('Jesus', 'Perez',[{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}],['perro', 'gato'])

console.log(usuario)