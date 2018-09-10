function getRepositories() {
  const username = document.getElementById('username').value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', `https://api.github.com/users/${username}/repos`);
  xhr.send();
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  const repoList = `<ul>${repos
    .map(
      r =>
      `<li><h2>${r.name}</h2>
           <a href="${r.html_url}">${r.html_url}</a>
           <br><br>
         - <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a>
         - <a href="#" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a>
        </li>`
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repo_name = el.dataset.repo;
  const username = document.getElementById('username').value
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', `https://api.github.com/repos/${username}/${repo_name}/commits`);
  xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const repo_name = el.dataset.repo;
  const username = document.getElementById('username').value
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayBranches);
  xhr.open('GET', `https://api.github.com/repos/${username}/${repo_name}/branches`);
  xhr.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchesList = `<ul>${branches
    .map(
      branch =>
        `<li><strong>${branch.name}</strong></li>`
    )
    .join('')}</ul>`;
  document.getElementById('branches').innerHTML = branchesList;
}
