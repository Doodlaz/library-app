import { state } from './state'

let books = []
let book = {}
let emptyBook = {
  _id: 10,
  title: '',
  url: 'img/js-01.jpg',
  authors: '',
  publishingDate: '',
  publisherDames: '',
  publisherAddress: '',
  telephonePublisher: '',
  heading: '',
}

export function bookSingle() {

  state.getBookSingle().then( res => {
    book = res ? res : emptyBook
    single && singleCreate(book)
  } )

  state.getBooks().then( res => books = res )

  const single = document.getElementById('bookSingle')

  function randomId () {
    let rand = 158736 + Math.random() * (587349 - 158736);
    return Math.round(rand);
  }

  function newBook( id ) {
    return {
      _id: id,
      title: title.value,
      url: book.url,
      authors: authors.value,
      publishingDate: publishingDate.value,
      publisherDames: publisherDames.value,
      publisherAddress: publisherAddress.value,
      telephonePublisher: telephonePublisher.value,
      heading: heading.value,
    }
  }

  const singleCreate = book => {
    const formEdit = document.getElementById('formEdit')
    const formCreate = document.getElementById('formCreate')
    const bookImg = document.getElementById('bookImg')
    const title = document.getElementById('title')
    const authors = document.getElementById('authors')
    const publishingDate = document.getElementById('publishingDate')
    const publisherDames = document.getElementById('publisherDames')
    const publisherAddress = document.getElementById('publisherAddress')
    const telephonePublisher = document.getElementById('telephonePublisher')
    const heading = document.getElementById('heading')

    bookImg.setAttribute("src", book.url)
    title.value = book.title
    authors.value = book.authors
    publishingDate.value = book.publishingDate
    publisherDames.value = book.publisherDames
    publisherAddress.value = book.publisherAddress
    telephonePublisher.value = book.telephonePublisher
    heading.value = book.heading

    formEdit && formEdit.addEventListener("submit", () => {
      const newBooks = []
      books.filter(elem => {
        if( book._id !== elem._id ) newBooks.push(elem)
        else newBooks.push(newBook(book._id))
      })
      state.setBooks( newBooks )
      state.setBookSingle( newBook(book._id) )
    })
    formCreate && formCreate.addEventListener("submit", () => {
      const newBooks = []
      books.filter(elem => {
        newBooks.push(elem)
      })
      newBooks.push( newBook( randomId() ) )
      state.setBookSingle( newBook( randomId() ) )
      state.setBooks( newBooks )
    })
  }



}
