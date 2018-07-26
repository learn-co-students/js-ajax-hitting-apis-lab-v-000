document.querySelector('button[name="get-repositories"]').addEventListener('click', getRepositories);

function getRepositories() {
  const username = document.getElementById('username').value;
  const req = new XMLHttpRequest()

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  // if (this.status === 200 && this.readyState === 4) {


    const repositoryContainer = document.getElementById('repositories');
    const response = JSON.parse(this.responseText);
    const ul = document.createElement('ul');

    for (let index = 0; index < response.length; index++) {
      const repository = response[index];
      const li = document.createElement('li');

      const h2 = document.createElement('h2');
      h2.appendChild(document.createTextNode(repository.name));
      li.appendChild(h2);

      const repoLink = document.createElement('a');
      repoLink.setAttribute('href', repository.html_url);
      repoLink.appendChild(document.createTextNode(repository.html_url));
      li.appendChild(repoLink);
      li.appendChild(document.createElement('br'));

      const commitLink = document.createElement('a');
      commitLink.setAttribute('data-username', repository.owner.login);
      commitLink.setAttribute('data-repository', repository.name);
      commitLink.setAttribute('onclick', 'getCommits(this)');
      commitLink.setAttribute('href', '#');
      commitLink.innerHTML = 'Get Commits';
      li.appendChild(commitLink);
      li.appendChild(document.createElement('br'));

      const branchLink = document.createElement('a');
      branchLink.setAttribute('data-username', repository.owner.login);
      branchLink.setAttribute('data-repository', repository.name);
      branchLink.setAttribute('onclick', 'getBranches(this)');
      branchLink.setAttribute('href', '#');
      branchLink.innerHTML = 'Get Branches';
      li.appendChild(branchLink);
      li.appendChild(document.createElement('br'));

      ul.appendChild(li);
 }

     repositoryContainer.appendChild(ul);

}

function getCommits(el) {
  const owner = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/commits`);
  req.send();
}

function displayCommits(event) {
  const commits = JSON.parse(this.responseText)
  console.log(commits);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const owner = el.dataset.username;
  const repo = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${owner}/${repo}/branches`);
  req.send();
}

function displayBranches(el) {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
