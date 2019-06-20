function showRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  console.log(this.responseText);
}

function displayRepositories() {
  var repos = JSON.parse(this.responseText);
  console.log(repos);
  const moreRepos = `<ul>${repos.map(rep => {
       return `
       <li>
       <h2>${rep.name}</h2>
       <a href="${rep.html_url}">${rep.html_url}</a><br>
       <a href="#" data-username="${rep.owner.login}" data-repository="${rep.name}" onclick="getCommits(this)">Get Commits</a><br>
       <a href="#" data-username="${rep.owner.login}" data-repository="${rep.name}" onclick="getBranches(this)">Get Branches</a>
       </li>`
     }).join('')}</ul>`;

    document.getElementById('repositories').innerHTML = moreRepos;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/users/octocat/repos');
  req.send();
}

function getBranches() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = "<ul>" + branches.map(branch => {
      return(`<li>${branch.name}</li>`)
    }).join('') + "</ul>"
  document.getElementById('details').innerHTML = branchesList;
}

function getCommits() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.committer.name +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
