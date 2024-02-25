let book = {
    title: '',
    author: '',
    pages: 0,
    read: false,
    category: '',
    readStartDate: ''
}

function Book(title, author, pages, read, category, readStartDate){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.category = category;
    this.readStartDate = readStartDate;
    this.info = function(){
        return `Titlul cartii este ${title}, autorul este ${author}, numarul de pagini este ${pages} si cartea ${read ? 'este citita' : 'nu este citita'}`; 
    }; 
}

let book1 = new Book("Harry Potter","Bogdan",450,true, "Action", '10 01 2020');
let book2 = new Book("LOTR","Petter Jackson",1230,false, "Scfi", '24 05 2022');

book1.info();
book2.info();

//Add a new book
const myBooks = [book1,book2];

function addBookToLibrary(book){
    myBooks.push(book);
}

//Create a new book HTML card
function loadAndAddBookCard(book){
    let bookElement = document.createElement("div");
    bookElement.classList.toggle("bookCard");

    let bookProp = Object.getOwnPropertyNames(book); //Get the properties

    bookProp.forEach(element => {
        if(element != "info"){
            let bookItem = document.createElement("div");
            bookItem.textContent = book[element];
            bookElement.appendChild(bookItem);
        }
    });

    document.querySelector(".c3").appendChild(bookElement);
}

document.addEventListener("DOMContentLoaded",function(e){
    for(let i = 0; i < myBooks.length; i++){
        loadAndAddBookCard(myBooks[i]);
    }
});

//Modal dialog
const modalButton = document.querySelector("#addBook");
const bookDialog = document.querySelector("#bookDialog");

modalButton.addEventListener("click",function(){
    bookDialog.showModal();
    const today = new Date().toISOString().slice(0, 10); // Update to current date
    bookDialog.querySelector("#readStartDate").value = today;
})

bookDialog.querySelector("#bookDialogConfirm").addEventListener("click",function(e){
    e.preventDefault();

    let title, author, pages, read, category, readStartDate;

    title = bookDialog.querySelector("#title").value.toLowerCase();
    let modTitle = title.charAt(0).toUpperCase() + title.slice(1);

    author = bookDialog.querySelector("#author").value;

    pages = bookDialog.querySelector("#pages").value;
    pages = +pages;

    read = bookDialog.querySelector("#read").checked;
    category = bookDialog.querySelector("#category").value;
    readStartDate = bookDialog.querySelector("#readStartDate").value.split('-').join(" "); //Break the string into an array of values then form it again without "-" char

    const newBook = new Book(modTitle, author, pages, read, category, readStartDate);

    addBookToLibrary(newBook);
    console.table(myBooks);
})

bookDialog.querySelector("#bookDialogClose").addEventListener("click",function(){
    bookDialog.close();
})

