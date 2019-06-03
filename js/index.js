// your code here
function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories)
  req.open('GET', `https://api.github.com/users/${document.getElementById("username").value}/repos`);
  req.send();
}

function getCommits(data) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits)
  req.open('GET', `https://api.github.com/repos/${data.dataset.username}/${data.dataset.repository}/commits`);
  req.send();
}

function getBranches(data) {
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches)
  req.open('GET', `https://api.github.com/repos/${data.dataset.username}/${data.dataset.repository}/branches`);
  req.send();
}

function displayRepositories() {

  var repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos.map(repo => {
        return `
        <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">Get Branches</a>
        </li>`
      }).join('')}</ul>`;

    document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);

  const commitList = `<ul>${commits.map(commit => {

        return `
        <li>
        <p>Author's Github Name: ${commit.author.login}</p><br>
        <p>Author's full Name: ${commit.commit.author.name}</p><br>
        <p>Commit Message: ${commit.commit.message}</p>
                </li>`
      }).join('')}</ul>`;

    document.getElementById('details').innerHTML = commitList;
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);

  const branchList = `<ul>${branches.map(branch => {

        return `
        <li>
        <p>Branch Name: ${branch.name}</p>
                </li>`
      }).join('')}</ul>`;

    document.getElementById('details').innerHTML = branchList;
}
