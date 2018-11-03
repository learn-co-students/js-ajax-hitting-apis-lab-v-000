// your code here
function displayCommits(){
}
function displayBranches(){
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(r => '<li>' + r.name + '</li>')
    .join('')}</ul>`;
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

function getBranches(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/repos/:owner/:repo/branches')
  xhr.send();
}

function getCommits(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/repos/:owner/:repo/commits')
  xhr.send();
}
