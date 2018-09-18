// your code here
function getRepositories() {

  let username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList =
  //`<ul>${repos
    //.map(r =>
    //   '<li>' + r.name +
    //   ' - <a href="#" data-repo="' +
    //   r.name +
    //   '" onclick="getCommits(this)">Get Commits</a></li> ' +
    //   ' - <a href="#" data-repo="' +
    //   r.name +
    //   '" onclick="getBranches(this)">Get Branches</a></li> '
    //   )
    // .join('')}</ul>`;
    '<ul>' +
   repos
     .map(repo => {
       const dataUsername = 'data-username="' + repo.owner.login + '"';
       const dataRepoName = 'data-repository="' + repo.name + '"';
       return `
         <li>
           <h2>${repo.name}</h2>
           <a href="${repo.html_url}">${repo.html_url}</a><br>
           <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
           <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
         </li>`;
     })
     .join('') +
   '</ul>';
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
  const url = 'https://api.github.com/repos/' + el.dataset.username + '/' + repoName + '/commits'
  req.addEventListener('load', displayCommits);
  req.open('GET', url);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name  +
        ' - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li><strong>' +
        branch.name +
        '</strong></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
