// your code here
function getRepositories() {
  const name =  document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load',displayRepositories);
  req.open('GET', `https://api.github.com/users/${name}/repos`);
  req.send();
}

function displayRepositories() {

  var repos = JSON.parse(this.responseText);
  //console.log(repos);
  const name =  document.getElementById("username").value
  const repoList = `<ul>${repos
    .map(
      r =>
    //     '<li>' +
    //     r.html_url +
      //   ' - <a href="#" data-repo="' +
    //     r.name +
    //     '" onclick="getCommits(this)">Get Commits</a></li>'
    // )

      '<li>' +
      r.html_url +
      '<a href="#" data-repository="' + r.name +
      '" onclick="getCommits(this)">Display Commits</a></li>'
   )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {

  const user = document.getElementById("username").value
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/` + name + `/commits`);
  req.send();
}


function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit =>
       '<li><strong>' +
       commit.commit.author.name + commit.url +
      '</strong> - ' +
       commit.commit.message +
       '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const user = document.getElementById("username").value
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/` + name + `/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
   const commitsList = `<ul>${branches.map(branch =>
       '<li><strong>' +
       branch.name +
      '</strong>' +
    //   commit.commit.message +
       '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
