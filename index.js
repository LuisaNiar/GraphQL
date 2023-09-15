import {ApolloServer, gql} from 'apollo-server'
import {v1 as uuid} from "uuid";

const libros = [
    {
        nombre: "Crimen y Castigo",
        autor: "Fyodor Dostoevsky",
        paginas: 496,
        calificacion: "4.26",
        isbn: "9788418008122"
    },
    {
        nombre: "Omniscient Reader’s Viewpoint",
        autor: "Singshong",
        paginas: 2079,
        calificacion: "4.69"
    },
    {
        nombre: "Clean Code",
        autor: "Robert C. Martin",
        paginas: 464,
        calificacion: "4.38",
        isbn: "9780132350884"
    },
    {
        nombre: "Hooky",
        autor: "Míriam Bonastre Tur",
        paginas: 384,
        calificacion: "4.42",
        isbn: "9780358468295"
    },
    {
        nombre: "Clockwork Princess",
        autor: "Cassandra Clare",
        paginas: 567,
        calificacion: "4.56",
        isbn: "9781406321340"
    }
]

const typeDefinitions = gql`
  type Libro{
    nombre: String!
    autor: String!
    calificacion: String
    edicion: Edicion!
  }
  
  type Edicion{
    paginas: Int
    isbn: String
  }
      
  type Query{
    contarLibros: Int!
    mostrarLibros: [Libro]!
    encontrarLibro(nombre: String): Libro
  }
  
  type Mutation{
    agregarLibro(
        nombre: String!
        autor: String!
        calificacion: String
        paginas: Int
        isbn: String
    ): Libro
  }
`
const resolvers = {
    Query: {
        contarLibros: () => libros.length,
        mostrarLibros: () => libros,
        encontrarLibro: (root, args) => {
            const {nombre} = args
            return libros.find(libro => libro.nombre === nombre)
        }
    },
    Mutation:{
        agregarLibro: (root, args) => {
            const {nombre, autor, calificacion, paginas, isbn}=args
            const libro = {...args}
            libros.push(libro)
            return libro
        }
    },
    Libro: {
        edicion: (root) => {
            return {
                paginas: root.paginas,
                isbn: root.isbn
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
})
