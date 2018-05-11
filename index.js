function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name  + '<div>' + r.owner.login + ' </div>' + '<a href="' + r.html_url + '">Repo</a>' + ' - <a href="#"  data-username="' + r.owner.login + '" data-repository="' + r.name + '" onclick="getCommits(this)">Get Commits</a><br><a href="#" onclick="getBranches(this)" data-repository="' + r.name + '" data-username="' + r.owner.login + '">Get Branches</a> </li>'
  ).join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  let repository = el.dataset.repository;
  let username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  const commitsList = '<ul>' + commits.map(c => { 
    let authorLogin = c.author.login;
    let authorName = c.commit.author.name;
    let commitMessage = c.commit.message;
    return(`
      <li>
        <h3>Commiter: ${authorName} - Login: ${authorLogin}</h3>
        <p>Message: "${commitMessage}"</p>
      </li>
    `)
  }).join('') + '</ul>';
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  let repository = el.dataset.repository;
  let username = el.dataset.username
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches)
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  const branchesList = '<ul>' + branches.map(b => {
    let name = b.name
    return(`
      <li>
        <h3>Name: ${name}</h3>
      </li>
    `)
  }).join('') + '</ul>';
  document.getElementById('details').innerHTML = branchesList;
}