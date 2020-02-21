import { state } from './state'

let books = []

export async function bookList() {
  const list = document.getElementById('bookList')

  await state.getBooks().then(res => books = res)

  if (list) await state.getBookSingleClear()

  const listCreate = item => {
    const col = document.createElement('div')
    col.classList.add("col-3")

    const card = document.createElement('a')
    card.classList.add("book-card")
    card.setAttribute("href", "book-single.html")

    card.addEventListener("click", () => state.setBookSingle( item ) )

    const imgWrap = document.createElement('div')
    imgWrap.classList.add("book-card__img")

    const img = document.createElement('img')
    img.setAttribute("src", item.url)

    const title = document.createElement('p')
    title.classList.add("book-card__title")

    const removeBtn = document.createElement('button')
    removeBtn.classList.add("book-card__remove")

    removeBtn.addEventListener("click", e => {
      e.preventDefault()
      const newState = []
      books.filter(elem => { item._id !== elem._id && newState.push(elem) })

      state.setBooks( newState )

      location.reload()
    })

    const titleText = document.createTextNode(item.title)
    title.appendChild(titleText)

    imgWrap.appendChild(img)
    card.appendChild(imgWrap)
    card.appendChild(removeBtn)
    card.appendChild(title)
    col.appendChild(card)
    list.appendChild(col)
  }

  list && books.map(item => {
    listCreate(item)
  })
}
