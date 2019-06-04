function getRepositories() {
  const name = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${name}/repos`)
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos.map(r => '<li>' +
                                         r.name + '<br>' +
                                         `<a href="${r.html_url}">${r.html_url}</a><br>` +
                                         '<a href="#" data-repository="' +
                                         r.name +
                                         '" data-username="' +
                                         r.owner.login +
                                         '" onclick="getCommits(this)">Get Commits</a><br>' +
                                         '<a href="#" data-repository="' +
                                         r.name +
                                         '" data-username="' +
                                         r.owner.login +
                                         '" onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList
}

function getCommits(repoJsonRep) {
  const repoUsername = repoJsonRep.dataset.username;
  const repoName = repoJsonRep.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${repoUsername}/${repoName}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' +
                                                    commit.commit.author.name +
                                                    ' (' + commit.author.login + ')' +
                                                    '</strong> - ' +
                                                    commit.commit.message +
                                                    '</li>').join('')}</ul>`;

  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(repoJsonRep) {
  const repoUsername = repoJsonRep.dataset.username;
  const repoName = repoJsonRep.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${repoUsername}/${repoName}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' +
                                                    branch.name +
                                                    '</strong></li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
