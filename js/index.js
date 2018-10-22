// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(repo => {
      return `<li><a href="${repo.html_url}">${repo.name}</a>
      - <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name} onclick="getCommits(this)">Get Commits</a>
      - <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name} onclick="getBranches(this)">Get Branches</a>
      </li>`
    }).join('')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/commits`);
  req.send();
}

function displayCommits() {
  let commits = JSON.parse(this.responseText);
  let commitList = `<ul>${commits.map(commit => {
    return `<li>${commit.author.login} (${commit.commit.author.name}) - ${commit.commit.message}</li>`
  }).join('')}
  </ul>`

  document.getElementById('details').innerHTML = commitList;
}

function getBranches(el) {
  const repoName = el.dataset.repository;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/branches`)
  req.send();
}

function displayBranches() {
  let branches = JSON.parse(this.responseText);
  let branchesList = `<ul>${branches.map(branch => {
    return `<li>${branch.name}</li>`
  }).join('')}
  </ul>`

  document.getElementById('details').innerHTML = branchesList;
}
