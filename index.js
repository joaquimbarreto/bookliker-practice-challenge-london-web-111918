const BOOKS_API = 'http://localhost:3000/books/';
const USERS_API = 'http://localhost:3000/users/';
const booksListEl = document.querySelector('#list');
const showPanelEl = document.querySelector('#show-panel');
const likesReadersEl = document.querySelector('#likes-readers');
const readersListEl = document.querySelector('#readers');


function listBooks() {
  fetch(BOOKS_API)
  .then(response => response.json())
  .then(data => {
    data.map(book => {
      const bookEl = document.createElement('li');
      bookEl.innerHTML = book.title;
      booksListEl.appendChild(bookEl);
      bookEl.addEventListener('click', () => getBook(book))
    });
  })
}

function getBook(book) {
  const imageEl = document.createElement('img');
  const readButton = document.createElement('button');
  imageEl.src = book.img_url;
  showPanelEl.innerHTML = '';
  readersListEl.innerHTML = '';
  showPanelEl.innerHTML = `<h2>${book.title}</h2><p>Description: ${book.description}.</p>`
  showPanelEl.appendChild(imageEl);
  readButton.innerText = 'Like book';
  showPanelEl.appendChild(readButton);
  readButton.addEventListener('click', () => getReadersWhoLike(book))
};


function getReadersWhoLike(book){
    const user = {"id":1, "username":"pouros"};
    if (book.users.filter(u => u.id === user.id).length > 0) {
      alert('Already like the book');
    } else {
      book.users.push(user)
      fetch(BOOKS_API + book.id, {
        method: 'PATCH',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(book)
      }).then(response => response.json())
      .then(data => {
        const readers = data.users;
        for (const value of readers){
          const readerEl = document.createElement('li');
          showPanelEl.appendChild(readersListEl);
          readersListEl.appendChild(readerEl);
          readerEl.innerText = value.username;
        }
      })
    }
}


document.addEventListener("DOMContentLoaded", listBooks);
