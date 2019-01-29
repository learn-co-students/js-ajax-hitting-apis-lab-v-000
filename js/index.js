// your code here
function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  username = document.getElementById("username").value
  userURL = "https://api.github.com/users/" + username + "/repos"
  req.open("GET", userURL)
  req.send()
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText)
  console.log(repos[0].owner)
  let repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
    '<a href="https://github.com/' + r.owner.login + "/" + r.name + '">"' +
    r.name + '</a>' +
    ' - <a href="#" data-repository="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a> / <a href="#" data-repository="' +
            r.name +
            '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;

  document.getElementById("repositories").innerHTML=repoList;
  }

  function getCommits(el) {
  let name = el.dataset.repository;
  console.log(name)
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  console.log(Object.keys(el.dataset))
  let username = el.dataset.username
  let repository = el.dataset.repository
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

  function displayCommits(){
  let commits = JSON.parse(this.responseText);
  console.log(Object.keys(commits[0].commit))
  let commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + commit.commit.author.name + ' - <a href="https://github.com/' + commit.author.login + '" data-username="' + commit.author.login + '" data-repository="' + commit.commit.name+ '">' +
        commit.author.login + " " +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
let name = el.dataset.repository;
console.log(name)
let req = new XMLHttpRequest();
req.addEventListener('load', displayBranches);
console.log(Object.keys(el.dataset))
let username = el.dataset.username
let repository = el.dataset.repository
req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/branches');
req.send();
}

function displayBranches(){
let branches = JSON.parse(this.responseText);
console.log(Object.keys(branches[0]))
let branchesList = `<ul>${branches
  .map(
    branch =>
      '<li><strong>' + branch.name +  '</strong> </li>'
  )
  .join('')}</ul>`;
document.getElementById('details').innerHTML = branchesList;
}
