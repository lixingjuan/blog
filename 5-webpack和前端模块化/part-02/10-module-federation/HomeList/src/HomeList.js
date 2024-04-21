const HomeList = (num) => {
  let str = '<url>'
  for (let i = 0; i < num; i++) {
    str += `<li> item ${i} </li>`
  }

  return str + "</ul>"
}

export default HomeList;