// your code here
function getRepositories() {
  const newReq = new XMLHttpRequest();
  const name = document.getElementById('username').value
  const address = 'https://api.github.com/users/' + name + '/repos'
  addEventListener('load', displayRepositories);
  newReq.open('GET', address);
  newReq.send();
  return false
}


function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repzLizt = 
    '<ul>' + 
    repos
      .map(repo => {
        const dataUser = 'data-username="' + repo.owner.login + '"'
        const dataRepo = 'data-repository="' + repo.name + '"'
        return `
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepo} ${dataUser} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepo} ${dataUser} onclick="getBranches(this)">Get Branches</a></li>
          </li>`;
    }).join('') + '</ul>';
  document.getElementById('repositories').innerHTML = repzLizt;
}

function getCommits(x) {
  const newReq = new XMLHttpRequest();
  const repoName = x.dataset.repository
  const address = 'https://api.github.com/repos/' + x.dataset.username + '/' + repoName + '/commits'
  addEventListener('load', displayCommits)
  newReq.open('GET', address)
  newReq.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
    const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><h3>' +
        commit.commit.author.name +
        ' (' +
        commit.author.login +
        ')</h3>' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(x) {
  const newReq = new XMLHttpRequest();
  const repoName = x.dataset.repository
  const address = 'https://api.github.com/repos/' + x.dataset.username + '/' + repoName + '/branches'
  addEventListener('load', displayBranches)
  newReq.open('GET', address)
  newReq.send()
}

function displayBranches(x) {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches
    .map(branch => '<li>' + branch.name + '</li>')
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList
}