import "dotenv/config";
import express, { response, request } from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import {getAllBooks, newMember, getMemberByName} from "./data";
import {newBook} from "./data";
// import {bookRemoval} from "./data"
// import {bookID} from "./data"
// import {copiesAvailable} from "./data";
import {getBookById} from "./data";
// import {deleteBook} from "./data";
import {getAllMembers} from "./data";
import {bookRemove} from "./data";


//Below we are initialising express and outr port.
const app = express();
const port = process.env['PORT'] || 3000;


const srcPath = __dirname + "/../stylesheets";
const destPath = __dirname + "/../public";
app.use(
    sassMiddleware({
        src: srcPath,
        dest: destPath,
        debug: true,
        outputStyle: 'compressed',
        prefix: '',
    }),
    express.static('public')
);

app.use(
    express.urlencoded({extended:true})
);

const PATH_TO_TEMPLATES = "./templates/";
nunjucks.configure(PATH_TO_TEMPLATES, { 
    autoescape: true,
    express: app
});

//Index page 
app.get("/", (request, response) => {
    const model = {
        message: "Management System"
    }
    response.render('index.html', model);
});

//Book and Author listints/Quick book/author // 
app.get("/book", async(request, response) => {
    const title = request.query.bookName || "";
    const author = request.query.authorName || "";
    const bookList = await getAllBooks(title as string, author as string);
    const books= {
        books: bookList
    }
    response.render('bookTemplate.html', books);
    
});


//Add Book

app.get("/added", async (request, response) => {
    response.render('added.html')
});

app.get("/book/manage", (request, response)  => {
    response.render('addBook.html')
});
app.post("/book/manage", async(request, response) => {
    const book = request.body
    console.log(book)
     await newBook(book)
     response.render('added.html')
});






//Single book Display 
app.get("/book/:bookid", async(request, response) => {
    const bookID = parseInt(request.params.bookid); 
    const model = {
        book:  await getBookById(bookID)
    };   
    response.render('bookInfo.html', model)
});


//REMOVE

app.get("/deleted", async (request, response) => {
    response.render('deleted.html')
});

app.post("/book/remove", async (request, response) =>{
    const removal = request.body;
    await bookRemove(removal.bookId);
    console.log("book_id")
    response.render('deleted.html');
})

///////////////// Copies Available , Check out and and Edit Books 
// app.get("/book/copies", async(request, response) =>{
//     const id = request.query.bookId || "";
//     const title = request.query.bookName || "";
//     const quantity = request.query.quantity || "";
//     const getCopies  = await copiesAvailable(quantity as string, title as string, id)
//     const copies = {
//            copies_of_books : getCopies
//     }
//     response.render('inventory.html', copies)

// })






// app.get("/book/edit-book", async(request, response)=>{
//     return(
//         response.render('editbook.html')
//     )
// })

// app.post("/book/edit-book", async(request,response)=>{
//     // const bookname = [];
//     // bookname.book(
//     //     {newtitle: book.title}
//     // )
//     const changeBook = request.body;
//     const sqlResult = await editBook(changeBook)
//     response.send('book updated')
// })

// // app.get("/books/checkout-book", async (request,response)=>{
// //     return(
// //         response.render('checkoutBook.html')
// //     )
// // })

// app.post("/books/checkout-book", async (request, response)=>{
//     const bookCheckedout= request.body.user_id;
//     const bookidCheckout= request.body.book_id;
//     await userCheckOutBook(bookCheckedout, bookidCheckout);
//     response.send('Book checked out')
// })

// app.get("/books/checkout-book", async (request, response)=>{
//     const chekoutThing = await CheckoutHistory()
//     const moda = {
//         check_out_history : chekoutThing
//     }
//     return(
//         response.render('checkoutBook.html', moda)
//     )
// })





/////////////////Member List /////////////

app.get("/member", async(request, response) => {
    const memberName = request.query.first_name || "";
    const lastName = request.query.last_name || "";
    const memberList = await getAllMembers(memberName as string, lastName as string)
    const model= {
        members: memberList
    }
    response.render('memberInfo.html', model);
});


//Add Member

app.get("/member/manage", (request, response)  => {
    response.render('manageMember.html')
});

app.post("/member/manage", async(request, response) => {
    const member = request.body
    console.log(member)
     await newMember(member)
     response.render('added.html')
    //  response.send("Thanks for adding your new Member you can check out ");
});

//Single Member Display 
app.get("/member/:memberid", async(request, response) => {
    const firstName = request.params.first_name;
    const lastName = request.params.last_name;
    const model = {
        individualMember:  await getMemberByName(firstName, lastName)
    };   
    response.render('memberInfo.html', model)
});



//Listen on port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});


