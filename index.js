const BOOKS_API = 'http://localhost:3000/books';
const USERS_API = 'http://localhost:3000/users';
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
      bookEl.addEventListener('click', () => {
        const imageEl = document.createElement('img');
        imageEl.src = book.img_url;
        showPanelEl.innerHTML = '';
        readersListEl.innerHTML = '';
        showPanelEl.innerHTML = `<h2>${book.title}</h2><p>Description: ${book.description}.</p>`
        showPanelEl.appendChild(imageEl);
        const readButton = document.createElement('button');
        readButton.innerText = 'Like Book';
        likesReadersEl.appendChild(readButton);
        readButton.addEventListener('click', () => {
          let bookUsers = Array.from(book.users)
          for (const value of bookUsers) {
            const readerEl = document.createElement('li');
            readerEl.innerText = value.username;
            readersListEl.appendChild(readerEl);
          }
        })
      })
    });
  });
}

document.addEventListener("DOMContentLoaded", listBooks);
