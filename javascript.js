const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
    };
};

const newbook = document.querySelector('#newbook');
const form = document.querySelector('#bookadd');
const bookscontainer = document.querySelector('#bookscontainer');
const addbutton = document.querySelector('#addbutton');
const bookadd = document.querySelector('#bookadd');

const bookname = document.querySelector('#title');
const writer = document.querySelector('#author');
const pagecount = document.querySelector('#pages');
const readornot = document.querySelector('#readornot');
let number = -1;

form.style.display = 'none';

newbook.addEventListener('click', openForm);
addbutton.addEventListener('click', addBookToLibrary);

function openForm(e) {
    if ((form.style.display === 'flex')) {
        form.style.display = 'none';
        newbook.value = 'NEW BOOK';
    } else {
        form.style.display = 'flex';
        newbook.value = 'Close';
    };
};

function addBookToLibrary(e) {
    e.preventDefault();
    if (validateForm() == true) {
        myLibrary.push(new Book(bookname.value, writer.value, pagecount.value, isRead(readornot.checked)));
        /*empty form values for convenience, so you don't have to manually erase them after each book adding*/
        form.reset();
        showBook();
    };
}

function showBook() {
    /*empty parent container from children every time before updating it with the latest MyLibrary book objects array*/
    bookscontainer.textContent = '';
    number = -1;
    myLibrary.forEach((book) => {
        let shownBlock = document.createElement('div');
        number += 1;
        createBookItem(shownBlock, number, book);
        bookscontainer.appendChild(shownBlock);
    });
};

function createBookItem(shownBlock, number, book) {

    let wholeBook = document.createElement('p');

    wholeBook.textContent = book.info();
    wholeBook.style.alignSelf = 'center';
    shownBlock.style.display = 'flex';
    shownBlock.style.gap = '10px';
    shownBlock.style.margin = '20px';
    shownBlock.style.background = '#86efac';
    shownBlock.style.padding = '20px';
    shownBlock.style.borderRadius = '10px';
    shownBlock.style.border = '5px solid #f97316';

    let delButton = document.createElement('button');
    delButton.style.minWidth = 'minContent';
    delButton.textContent = 'DELETE';
    delButton.setAttribute('dataNumber', number);

    let readButton = document.createElement('button');
    readButton.style.minWidth = 'minContent';
    readButton.textContent = 'read';
    readButton.setAttribute('dataNumber', number);

    shownBlock.appendChild(wholeBook);
    shownBlock.appendChild(readButton); 
    shownBlock.appendChild(delButton);   

    readButton.addEventListener('click', changeReadStatus);
    delButton.addEventListener('click', deleteBookItem);
};

function isRead(status) {
    return status == true ? 'read' : 'not read';
}

function deleteBookItem() {
    let itemIndex = this.getAttribute('dataNumber');
    myLibrary.splice(itemIndex, 1);
    /*after the object to be deleted is found, refresh the array with remaining book objects*/
    showBook();
};

function changeReadStatus() {
    let itemIndex = this.getAttribute('dataNumber');
    myLibrary[itemIndex].read == 'not read' ? myLibrary[itemIndex].read = 'read' : myLibrary[itemIndex].read = 'not read';
    showBook();
}


function validateForm() {
    console.log(pagecount.validity);
    if (bookname.validity.valueMissing) {
        bookname.setCustomValidity('You need to add book name!');
        bookname.reportValidity();
        return false;
    };

    if (writer.validity.valueMissing) {
        writer.setCustomValidity('You need to add author!');
        writer.reportValidity();
        return false;
    };

    if ((pagecount.validity.valueMissing) || (pagecount.validity.patternMismatch)) {
        pagecount.setCustomValidity('You need to add number of pages!');
        pagecount.reportValidity();
        return false;
    };

    return true;
};
