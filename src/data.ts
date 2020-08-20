import Knex from "knex";

interface CheckOutOptions{
    check_out_id: number;
    check_out_date:  number;
    return_date:    number;
    book_id:        number;
    member_id: number;
}

// create ourselves a new client.
const client = Knex({
    client: "pg",
    debug: true,
    connection: {
        user: "postgres",
        host: "localhost",
        database: "bookish",
        password: process.env.POSTGRES_PASSWORD,
    }
});

//List out all books and authors 
interface Book{
    bookId:        number;
    bookName:      string;
    authorName:    string;
    quantity:      number;
}
export const getAllBooks = (title : string, author : string) => {
    return client.select("*").from<Book>("book")
    .where("book_name", "like", `%${title}%`).andWhere("author_name ", "like", `%${author}%`).andWhere("deleted", false)
    };
   

//List single book 
export const getBookById = (id : any) => {
    return client.select("*").from<Book>("book")
    .where('book_id', id).first();
};    
  
//Insert book 
export const newBook = (book: Book) => {
   return client.insert({book_name: book.bookName, book_id: book.bookId, author_name: book.authorName, book_quantity: book.quantity})
    .into("book")
};



//REMOVE book
export const bookRemove = (id : number) => {
    console.log(id)
    return client('book')
    .update({deleted: true, book_quantity: 0})
    .where ('book_id', id)  
}

///////////// Copies Available , Check out and and Edit Books 
// export const copiesAvailable = (quantity : any, title : string, id: any) => {
//     console.log(quantity, title, id)
//     return client.select('quantity').from<Book>("book")
//     .where("book_name", "like", `%${title}%`).andWhere("book_id", "like", `%${id}%`).andWhere("deleted", false)
    
// }





// interface editBook{
//     id: number;
//     newtitle: string;
// }

// export const editBook = (book : editBook) => {
//     return client('books')
//     .where('id', book.id)
//     .update({title: book.newtitle})
// }

// export const userCheckOutBook = (user_id: number, copy_id: number) => {
//     return client('check_out_history')
//     .insert({
//         user_id: user_id,
//         copy_id: copy_id,
//         checked_out_date: client.fn.now(),
//         return_date: client.raw("now() + interval '7 days'")

//     })
// }
// export const CheckoutHistory = () => { 
//     return client('check_out_history')
//     .select()
// }












//MEMBER INFO

interface Member{
    member_id: number;
    first_name: string;
    last_name: string;
}

    export const getAllMembers = (title : string, lastName : string) => {
     return client.select("*").from<Member>("member")
     .where("first_name", "like", `%${title}`).andWhere("last_name", "like", `%${lastName}`)
     };

    //List single member
    export const getMemberByName = (firstName : string, lastName : string) => {
        return client.select("*").from<Member>("book")
        .where("first_name", "like", `%${firstName}`).andWhere("last_name", "like", `%${lastName}`).first();
    }; 


    //Insert Member 
    export const newMember = (member: Member) => {
    return client.insert({member_id : member.member_id, first_name: member.first_name, last_name: member.last_name})
     .into("member")
 };