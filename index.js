
function displayRepositories (event, data) {
  //console.log(this.responseText)
  let repos = JSON.parse(this.responseText)

  let repoList = '<ul>' + repos.map(repo => {
    let username = 'data-username="' + repo.owner.login + '"'
    let repoName = 'data-repository="' + repo.name + '"'
    return (
      `<li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a>
        <br><br>
        <a href="#" ${repoName} ${username} onclick="getCommits(this)">Get Commits</a>
        <br><br>
        <a href="#" ${username} ${repoName} onclick="getBranches(this)">Get Branches</a>
      </li>`
    )}).join('') + '</ul>'
  document.getElementById('repositories').innerHTML = repoList
}

// get the repositories from github
function getRepositories () {
  const request = new XMLHttpRequest(); //set request = to a new XMLHttpRequest
  let username = document.getElementById('username').value

  request.addEventListener('load', displayRepositories) // add event listener to the request

  request.open('GET', `https://api.github.com/users/${username}/repos`, true) // send a get request to github for repost

  request.send() // process the receipt of the request in order to show it
}
////////////////////////////////////////////////////////////////////


function displayCommits () {
  let commits = JSON.parse(this.responseText)
  const commitsList = `<ul>
    ${commits.map(commit => '<li><h2>' + commit.commit.author.name + '('+ commit.author.login + ')</h2> -  ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById('details').innerHTML = commitsList
}

function getCommits (el) {
  const name = el.dataset.username
  const repoName = el.dataset.repository
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayCommits)
  request.open("GET", `https://api.github.com/repos/${name}/${repoName}/commits`)
  request.send();
}
///////////////////////////////////////////////////////////////////


function displayBranches () {
  let branches = JSON.parse(this.responseText)
  const branchesList = `<ul>
    ${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>')}
  </ul>`
  document.getElementById('details').innerHTML = branchesList
}


function getBranches (el) {
  const name = el.dataset.username
  const repoName = el.dataset.repository
  const request = new XMLHttpRequest();
  request.addEventListener('load', displayBranches)
  request.open('GET', `https://api.github.com/repos/${name}/${repoName}/branches`, true)
  request.send();
}
