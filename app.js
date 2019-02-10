// SELECTORS
const tableBody = document.getElementById('table-body');
const addBookButton = document.getElementById('button-add-book')
const newBookButton = document.getElementById('button-new-book');

const form = document.getElementById('form-wrapper');
const formTitle = document.getElementById('book-title');
const formAuthor = document.getElementById('book-author');
const formPages = document.getElementById('form-pages');
const formRead = document.getElementById('read-check');

const warning = document.getElementById('empty-warning');
const bookAddedMessage = document.getElementById('message-added');

// EVENT LISTENERS
addBookButton.addEventListener('click', addBookToList);
newBookButton.addEventListener('click', newBookFormToggle);
tableBody.addEventListener('click', e => removeBook(e));
tableBody.addEventListener('click', e => bookReadToggle(e));



let myLibrary = [];

function Book (title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  
  this.createBookId = function () {
    this.bookId =  this.author.replace(/[^a-z]/gi, '') + this.pages;
  }

  this.createBookId();
}

Book.prototype.bookReadToggle = function () {
  this.haveRead = !this.haveRead;
}


function addBookToLibrary(book) {
  myLibrary.push(book);

}

// TEST BOOKS
const hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 293, false);
const room = new Book('Room', 'Emma Donoghue', 354, false);

myLibrary.push(hobbit);
myLibrary.push(room);
renderLibrary(myLibrary);

function renderLibrary(library) {
  // CLEAR THE TABLE BODY FIRST
  while(tableBody.firstChild){
    tableBody.removeChild(firstChild);
  }
  library.forEach(book => renderBook(book));
}

function renderBook(book) {
  let readOrNotIcon = 'far fa-circle';
  if (book.haveRead) {
    readOrNotIcon = 'fas fa-check-circle';
  }
  const row = document.createElement('tr');
  const dataId = book.bookId;
  row.setAttribute('data-id', dataId);
  const html = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td>
    <td><i class="${readOrNotIcon}"></i></td>
    <td><i class="fa fa-trash"></i></td>`;
  row.innerHTML = html;
  tableBody.appendChild(row);
}


function addBookToList () {
  const titleVal = formTitle.value;
  const authorVal = formAuthor.value;
  const pagesVal = formPages.value;
  const readVal = formRead.checked;

  if(titleVal === '' || authorVal === '' || pagesVal === '') {
    warning.style.visibility = 'visible';
    setTimeout(() => {
      warning.style.visibility = 'hidden';
    }, 3000);
    return;
  }

  const book  = new Book(titleVal, authorVal, pagesVal, readVal);
  addBookToLibrary(book);
  renderBook(book);


  formTitle.value = '';
  formAuthor.value = '';
  formPages.value = '';
  formRead.checked = false;

  addBookHideForm();
}

function addBookHideForm () {
  form.classList.remove('show');
  form.classList.add('hide');
  form.style.display = 'block';
  bookAddedMessage.style.display = 'block';
  setTimeout(() => {
  bookAddedMessage.style.display = 'none';    
  }, 2000);
}



function removeBook (e) {
  if (e.target.className === 'fa fa-trash') {
    // REMOVE FROM DOM
    const parentRow = e.target.parentNode.parentNode;
    const bookId = parentRow.dataset.id;
    parentRow.remove();
    
    // REMOVE FROM LIBRARY ARRAY
    const removeIndex = myLibrary.findIndex(book => book.bookId === bookId);
    myLibrary.splice(removeIndex, 1);

  }
}

function bookReadToggle (e) {
  if(e.target.className === 'far fa-circle' || e.target.className === 'fas fa-check-circle') {
    if (e.target.className === 'far fa-circle') {
      e.target.className = 'fas fa-check-circle';
    } else {
      e.target.className = 'far fa-circle';
    }

    const bookId = e.target.parentNode.parentNode.dataset.id;
    for (let book of myLibrary) {
      if (book.bookId === bookId) {
        book.bookReadToggle();
      }
    }
  }
}

function newBookFormToggle () {
  if (form.classList.contains('hide')) {
    form.classList.remove('hide');
    form.classList.add('show');
  } else if (form.classList.contains('show')) {
    form.classList.remove('show');
    form.classList.add('hide');
  }
}