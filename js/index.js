// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  const user = document.getElementById("username").value
  req.addEventListener('load', displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + user + '/repos')
  req.send();
}



function displayRepositories(){
  const repos = JSON.parse(this.responseText);
  const repoList =
  '<ul>' +
  repos
    .map(repo => {
    const dataUsername= 'data-username="' + repo.owner.login + '"';
    const dataRepoName = 'data-repository="' + repo.name + '"';
    return `
      <li>
        <h2>${repo.name}</h2>
        <a href="#" "${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a><br>
      </li>`;
  })
      .join('') +
      '</ul>';
  document.getElementById("repositories").innerHTML = repoList;
  }

function getCommits(el) {
  const name = el.dataset.repository
  const user = el.dataset.username
  const req = new XMLHttpRequest();
   req.addEventListener('load', displayCommits);
   req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/commits');
   req.send();
 }

 function displayCommits() {
   const repoCommits = JSON.parse(this.responseText)
   const repoCommitsList =
   `<ul>${repoCommits.map(commit => '<li><strong>' +
      commit.author.login +
      '</strong> -' +
      commit.commit.author.name +
      '-' +
      commit.commit.message +
      '</li>'
    ).join('')}</ul>`
    document.getElementById('details').innerHTML = repoCommitsList

 }

function getBranches(el) {
  const req = new XMLHttpRequest();
  const user = el.dataset.username
  const name = el.dataset.repository
  const repoName = document.getElementById('')
  req.addEventListener('load', displayBranches)
  req.open("GET", 'https://api.github.com/repos/' + user + '/' + name + '/branches')
  req.send()
}

function displayBranches() {
  const repoBranch= JSON.parse(this.responseText)
  const repoBranchList = `<ul>${repoBranch.map(branch => '<li>' +
        branch.name +
        '</li>'
      ).join('')}</ul>`;
      document.getElementById('details').innerHTML = repoBranchList
}
