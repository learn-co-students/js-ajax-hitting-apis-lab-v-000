// your code here
function displayCommits(){
  let commits = JSON.parse(this.responseText);
  let commitsList = `<ul>${commits
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
  document.getElementById('details').innerHTML = commitsList;
}
function displayBranches(el){
  let branches = JSON.parse(this.responseText);
  let branchesList = `<ul>${branches
  .map(branch => '<li>' + branch.name + '</li>')
  .join('')}</ul>`;
document.getElementById('details').innerHTML = branchesList;
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  const repoList =
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

function getRepositories(){
  //Getting the user from the form
  let username = document.getElementById('username').value
  //Creating the XHR Object
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.github.com/users/${username}/repos`)
  xhr.send();
}

function getBranches(el){
  let xhr = new XMLHttpRequest();
  //What does this mean?
  let repoName = el.dataset.repository
  let username = document.getElementById('username').value
  xhr.open('GET', `https://api.github.com/repos/${username}/${repoName}/branches`)
  xhr.send();
}

function getCommits(el){
  let xhr = new XMLHttpRequest();
  //What does this mean?
  let repoName = el.dataset.repository
  let username = document.getElementById('username').value
  xhr.open('GET', `https://api.github.com/repos/${username}/${repoName}/commits`)
  xhr.send();
}
