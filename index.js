


function getRepositories() {
  const username = document.getElementById('username').value;
  const query =  'https://api.github.com/users/' + username + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", query)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList =
  `<ul>${repos.map(r =>
    '<li>' +
      r.name +
      '<a href="' + r.html_url + '">' +
      r.html_url +
      '<a/>' +
      '<br>' +
      '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + '<br>' +
      '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a>' +
    '</li>').join('')}
    </ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  const query =  'https://api.github.com/repos/' + username + '/'+ name + '/branches'
  req.addEventListener("load", displayBranches)
  req.open("GET", query)
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  const query =  'https://api.github.com/repos/' + el.dataset.username +'/' + name + '/commits'
  req.addEventListener("load", displayCommits)
  req.open("GET", query)
  req.send()
}


function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h2>' + commit.author.login + '</h2>' + commit.commit.author.name + ' - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
