// your code here

function getRepositories(){
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + username + '/repos')
  req.send();
}

function displayRepositories(){
  const repos = JSON.parse(this.responseText)
  console.log(repos);
  let repoList = "<ul>" + repos.map(r => {
    const dataUsername = "data-username='" + r.owner.login + "'";
    const dataRepository = "data-repository='" + r.name + "'";
    return `
    <li><strong>${r.name}</strong>
   - <a href="${r.html_url}">${r.html_url}</a>
   - <a href="#" ${dataUsername} ${dataRepository} onclick="getCommits(this)">Get Commits</a>
   - <a href="#" ${dataUsername} ${dataRepository} onclick="getBranches(this)">Get Branches</a>
   </li>`})
  .join("") +
  "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  const username = el.dataset.username
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/commits')
  req.send()
}

function displayCommits(){
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.commit.author.name + "</strong> - "
  + c.author.login + " - <em>"
  + c.commit.message + "</em></li>")
  .join("")}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const username = el.dataset.username
  const repository = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repository + '/branches')
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + "</li>")
  .join("")}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
