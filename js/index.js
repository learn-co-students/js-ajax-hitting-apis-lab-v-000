// your code here
function displayRepositories() {
  // debugger
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      r => {
        return `
        <li>
        <a href="${r.html_url}">${r.name}</a>  <a href="#" data-repo="  ${ r.full_name} +" onclick="getCommits(this)">  Get Commits</a></li>`
    })
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

// r.full_name => "octocat/Hello-World"
// r.name =>"Hello-World"

//Error: Expected '<ul><li><strong>Monalisa Octocat</strong> - Fix all the bugs</li></ul>' to match /octocat/

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
  .map(
    commit =>
      '<li><strong>' +
      commit.commit.author.name +
      '</strong> - ' +
      commit.commit.message +" - " +
        commit.author.login +
      '</li>'
  )
  .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches
  .map( branch => branch.name)
  .join('')}</ul>`;
  document.getElementById('details').innerHTML += branchList;

}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  const username = document.getElementById("username").value
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function getCommits(el) {
  const repoName = el.dataset.repository;
  const req = new XMLHttpRequest();
   req.addEventListener('onclick', displayCommits);
   req.open('GET', `https://api.github.com/repos/${el.dataset.username}/${repoName}/commits`);
   req.send();
}

function getBranches(el) {
  const branch = el.dataset;
  const req = new XMLHttpRequest();
  req.addEventListener('onclick', displayBranches);
  req.open('GET', `https://api.github.com/repos/${branch.username}/${branch.repository}/branches`);
}
