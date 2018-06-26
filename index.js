

function getRepositories() {
  const req = new XMLHttpRequest();
 
  const username = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/'+ username +'/repos');
  req.send();
}

function displayRepositories() {

  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById('repositories').innerHTML = repoList
}


// function displayCommits() {
//   const commits = JSON.parse(this.responseText)
//   const commitsList = `<ul>${commits.map(commit => '<li><strong>' + )} `
// }