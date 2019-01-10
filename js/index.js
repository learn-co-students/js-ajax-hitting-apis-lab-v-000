// your code here
function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  const username = document.getElementById('username').value
  req.open('GET', `https://api.github.com/users/${username}/repos` )
  req.send()
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(
    r => '<li>' +
    r.name +
    ' - ' +
    r.owner.login +
    ' - <a href="https://github.com/' +
    r.full_name +
    '">Link</a>'+
    ' - <a href="#" data-repo="' +
    r.name +
    '" onclick="getCommits(this)">Get Commits </a></li>'
  ).join('')}
  </ul>`
  document.getElementById('repositories').innerHTML = repoList
}
