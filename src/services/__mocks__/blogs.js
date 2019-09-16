const blogs = {
  data: [
    {
      'likes': 0,
      'author': 'Edsger W. Dijkstra',
      'title': 'titel 1',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      'user': {
        'username': 'sarju',
        'name': 'sarju',
        'id': '5d79408def742e1c2ef86190'
      },
      'id': '5d7940c0ef742e1c2ef86191'
    },
    {
      'likes': 0,
      'author': 'Edsger W. Dijkstra',
      'title': 'titel 2',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      'user': {
        'username': 'sarju',
        'name': 'sarju',
        'id': '5d79408def742e1c2ef86190'
      },
      'id': '5d7940c8ef742e1c2ef86192'
    },
    {
      'likes': 0,
      'author': 'Edsger W. Dijkstra',
      'title': 'titel 3',
      'url': 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      'user': {
        'username': 'sarju',
        'name': 'sarju',
        'id': '5d79408def742e1c2ef86190'
      },
      'id': '5d794293a0a4a5204d279539'
    }
  ]
}


const setToken = (token) => {
  return
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken}