function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  console.log(repos);

  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - ' + '<a href="'+ r.clone_url + '" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onClick = "getCommits(this)" target="_blank">' + 'Link' + '</a>' + ' ' +
    '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onClick = "getBranches(this)">' + 'Show Branches' + '</a>'
    +'</li>').join('')} </ul>`;

  document.getElementById("repositories").innerHTML = repoList;
}

function getRepositories() {
  let username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username +'/repos');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + '</strong> - ' + commit.commit.message + commit.author.login+'</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getCommits(element) {
  const name = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/' + name +'/commits');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - '+'</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}

function getBranches(element) {
  const name = element.dataset.repository;
  const username = element.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/' + name +'/branches');
  req.send();
}
