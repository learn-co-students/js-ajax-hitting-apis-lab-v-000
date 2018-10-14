function displayRepositories() {
   // tell JavaScript that it's working with JSON
  const repos = JSON.parse(this.responseText);

  // parsing the text into an array of objects
  const repoList = "<ul>" + repos.map(repo => {

    const userName = 'data-username="' + repo.owner.login + '"';
    const repoName = 'data-repository="' + repo.name + '"';

    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          );
  }).join('') + "</ul>";

  //data attribute to hold the repo name
  document.getElementById("repositories").innerHTML = repoList;
}



function getRepositories() {
  // creating a new instance of an XMLHttpRequest
  // initiate XHR request
  const req = new XMLHttpRequest();
  const username = document.getElementById("username").value;

  const url = "https://api.github.com/users/" + username + "/repos";
  // add event listener to our req object, this will be our req object inside our callback function.
  req.addEventListener("load", displayRepositories);
  // call open with the HTTP verb GET and the URI for request.
  req.open("GET", url);
  req.send();
}



function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`;

  document.getElementById("details").innerHTML = commitsList;
}



function getCommits(el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  const uri = 'https://api.github.com/repos/' + username + '/' + repoName  + '/commits';
  req.addEventListener("load", displayCommits);
  req.open("load", uri);
  req.send();
}



function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><h3>' + branch.name + '</li>').join('')}</ul>`;

  document.getElementById("details").innerHTML = branchesList;
}



function getBranches(el) {
  const req = new XMLHttpRequest();

  const repoName = el.dataset.repository;
  const username = el.dataset.username;

  const uri = 'https://api.github.com/repos/' + username + '/' + repoName  + '/branches';

  req.addEventListener("load", displayBranches);
  req.open("load", uri);
  req.send();
}
