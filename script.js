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
let book3 = new Book("Harry Potter","Bogdan",450,true, "Action", '10 01 2020');
let book4 = new Book("LOTR","Petter Jackson",1230,false, "Scfi", '24 05 2022');
let book5 = new Book("Harry Potter","Bogdan",450,true, "Action", '10 01 2020');
let book6 = new Book("LOTR","Petter Jackson",1230,false, "Scfi", '24 05 2022');
let book7 = new Book("Harry Potter","Bogdan",450,true, "Action", '10 01 2020');
let book8 = new Book("LOTR","Petter Jackson",1230,false, "Scfi", '24 05 2022');

book1.info();
book2.info();

//Add a new book
const myBooks = [book1,book2,book3,book4,book5,book6,book7,book8];

function addBookToLibrary(book){
    myBooks.push(book);
    loadAndAddBookCard(book);
}

//Create a new book HTML card
function loadAndAddBookCard(book){
    let bookElement = document.createElement("div");
    bookElement.classList.toggle("bookCard");
    let h5BookHeading = document.createElement('h5');
    h5BookHeading.textContent = "Book Details";
    bookElement.appendChild(h5BookHeading);

    bookElement.setAttribute("data",myBooks.indexOf(book));
    console.log(myBooks.indexOf(book));
    let bookProp = Object.getOwnPropertyNames(book); //Get the properties

    bookProp.forEach(element => {
        let label;
        switch(element){
            case "pages":
                label = document.createElement('div');
                label.textContent = `Pages: ${book[element]}`;
                bookElement.appendChild(label);
            break;
            case "read":
                label = document.createElement('div');
                label.textContent = `Status: ${book[element] ? 'You finished it!' : 'You have not finished it!'}`;
                bookElement.appendChild(label);
            break;
            case "category":
                label = document.createElement('div');
                label.textContent = "Category is: " + book[element];
                bookElement.appendChild(label);
            break;
            case "readStartDate":
                label = document.createElement('div');
                label.textContent = "Read start date: " + book[element];
                bookElement.appendChild(label);
            break;
            case "info":
            break;
            default:
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

