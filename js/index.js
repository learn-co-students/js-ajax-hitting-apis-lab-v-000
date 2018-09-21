// your code here

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList =
    '<ul>' +
    repos
      .map(r => {
        return `
          <li>
            ${r.name}
            <a href="${r.html_url}">${r.html_url}</a><br>
            <a href="#" data-repository=${r.name} data-username=${r.owner.login} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" data-repository=${r.name} data-username=${r.owner.login} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
      })
      .join('') +
    '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username.value}/repos`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username.value}/` + name + '/commits');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  debugger
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username.value}/` + name + '/branches');
  req.send();
}
