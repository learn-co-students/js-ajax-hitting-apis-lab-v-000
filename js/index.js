// your code here
// Create a form with a username field that calls a getRepositories function that loads the repositories div with a list of public repositories for that user. The displayed repositories should include the name and a link to the URL (HTML URL, not API URL).



function getRepositories(){
  const req = new XMLHttpRequest();
  let name = document.getElementById('username').value
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/'+ name + '/repos');
  req.send();
}

function displayRepositories(){
  var repos = JSON.parse(this.responseText);
  const repoList = '<ul>' + repos
  .map(
    r => {
        const username = 'data-username=" ' + r.owner.login + '"';
        const repository = 'data-repository="' + r.name + '"';

        return `
        <li>

        <h2>${r.name}</h2>
        <a href = "${r.html_url}"><${r.html_url}</a>
        <a href="#" ${repository} ${username} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${repository} ${username} onclick="getBranches(this)">Get Branches</a></li>
      </li>`;
    })
  .join('') + "</ul>";
document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {

  const name = el.dataset.repository;
  debugger
  let username = document.getElementById('username').value

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/commits');
  req.send();
}

// requests[0].url

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.author.name +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
  const name = el.dataset.repository;
  let username = document.getElementById('username').value

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + name + '/branches');
  req.send();
}
// Add a link to each repository that calls a getBranches function when clicked and, when complete, calls a displayBranches function that fills the details div with a list of names of each branch of the repository. Give the link data attributes of username and repository for use by the getBranches function.

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

// describe('displayBranches', () => {
//   it('parses and displays json values', () => {
//     var resp = { responseText: branchesData() }
//     displayBranches.call(resp)
//     el = document.getElementById("details")
//     expect(el.innerHTML).toMatch(/master/)
//   })
// })
