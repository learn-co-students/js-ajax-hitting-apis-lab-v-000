// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

// function displayRepositories() {
//   var repos = JSON.parse(this.responseText);
//   console.log(repos);
//   const repoList = `<ul>${repos
//     .map(
//       r =>
//         // '<li>' +
//       //  r.name //+
//         r.username +
//         // ' - <a href="#" data-repo="' +
//         // r.name +
//         // '" onclick="getCommits(this)">Get Commits</a></li>'
//     )
//     .join('')}</ul>`;
//   document.getElementById('repositories').innerHTML = repoList;
// }
function displayRepositories() { 
  let repos = JSON.parse(this.responseText); 
  const repoList = `<ul>${repos 
    .map(r => { 
      return `
      <li><a href="${r.html_url}">${r.name}</a><li> 
      <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getCommits(this)">Get Commits</a></li> 
      <li><a href="#" data-username="${r.owner.login}" data-repository="${r.name} onclick="getBranches(this)">Get Branches</a></li>
      <br>
      ` 
      }).join('')}</ul>`
      document.getElementById('repositories').innerHTML = repoList; 
    } 

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getCommits(el){
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/repos/octocat/' + el.dataset.repository + '/commits');
  req.send();
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/repos/octocat/' + el.dataset.repository + '/branches');
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
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
