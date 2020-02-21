const initial = [
  {
    _id: 452365,
    title: 'Изучаем JavaScript',
    url: 'img/js-01.jpg',
    authors: 'Этан Браун',
    publishingDate: '2020',
    publisherDames: 'Диалектика',
    publisherAddress: 'Киев, ул. Генерала Наумова, 23Б, Киев',
    telephonePublisher: '(044) 259-02-48',
    heading: 'Программирование',
  },
  {
    _id: 578009,
    title: 'Изучаем Java',
    url: 'img/java-01.jpg',
    authors: 'Кэти Сьерра, Берт Бэйтс',
    publishingDate: '2020',
    publisherDames: 'Эксмо',
    publisherAddress: 'г. Москва, Ул. Зорге, д.1.',
    telephonePublisher: '+7 (495) 411-68-86',
    heading: 'Мировой компьютерный бестселлер',
  },
  {
    _id: 161437,
    title: 'React и Redux: функциональная веб-разработка',
    url: 'img/react-01.jpg',
    authors: 'Автор- Алекс Бэнкс, Ева Порселло',
    publishingDate: '2018',
    publisherDames: 'Питер',
    publisherAddress: 'г. Киев, пр. Московский, д. 6, корп. 2, к. 33',
    telephonePublisher: '38067121-68-86',
    heading: 'Книги по программированию',
  },
  {
    _id: 337967,
    title: 'Learn React with TypeScript 3',
    url: 'img/ts-01.jpg',
    authors: 'Carl Rippon',
    publishingDate: '2018',
    publisherDames: 'Packt',
    publisherAddress: 'Livery Place 35 Livery Street Birmingham B3 2PB',
    telephonePublisher: '0121 265 6484',
    heading: 'Книги по программированию',
  }
]

export class state {

  static getBooks () {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem('books'))
    })
  }

  static setBooks ( value ) {
    return Promise.resolve().then(function () {
      localStorage.setItem('books', JSON.stringify(value))
    })
  }

  static getBookSingle () {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem('bookSingle'))
    })
  }

  static getBookSingleClear () {
    return Promise.resolve().then(function () {
      return localStorage.removeItem('bookSingle')
    })
  }

  static setBookSingle ( value ) {
    return Promise.resolve().then(function () {
      localStorage.setItem('bookSingle', JSON.stringify( value ))
    })
  }
}

state.getBooks().then( res => {
  if ( !res || res.length < 1 ) {
    state.setBooks( initial )
  }
})



