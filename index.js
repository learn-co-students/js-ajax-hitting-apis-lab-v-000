//import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

// function getRepositories() {
//     let username = document.getElementById('username').value
//     const req = new XMLHttpRequest()
//     //debugger
//     req.addEventListener("load", showRepositories);
//     req.open("GET", `https://api.github.com/users/${username}/repos`)
//     req.send()
//   }

function getRepositories() {
  const name = document.getElementById("username").value
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", showRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}


  function showRepositories(event, data) {
    //this is set to the XMLHttpRequest object that fired the event
    var repos = JSON.parse(this.responseText)
    console.log(repos)
    // const repoList = "<ul>" + repos.map(r => {
    //     const userData = `data-username=${r.owner.login}"`
    //     const repoData = `data-repository=${r.name}"`
    //     return(`<li>
    //      <h3> ${r.name} </h3>
    //      <a href="${r.html_url}">${r.name} url</a>
    //      <a href="#" ${userData} ${repoData} onclick="getCommits(this)">Get Commits</a>
    //      <a href="#" ${userData} ${repoData} onclick="getBranches(this)">Get Branches</a>
    //      </li>`)
    //     document.getElementById("repositories").innerHTML = repoList
  }

function showRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return(`
          <li>
            <h2>${repo.name}</h2>
            <a href="${repo.html_url}">${repo.html_url}</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
            <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
          </li>`
          )
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

  function getCommits(el) {
    const repoName = el.dataset.repository
    const uri = 'https://api.github.com' + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", showCommits)
    xhr.open("GET", uri)
    xhr.send()
  }

  function showCommits() {
    const commits = JSON.parse(this.responseText)
    console.log(commits)
    const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  }

  function getBranches(el) {
    const repoName = el.dataset.repository
    const uri = 'https://api.github.com' + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", showBranches)
    xhr.open("GET", uri)
    xhr.send()
  }

  function showBranches() {
    const branches = JSON.parse(this.responseText)
    const branchList = `<ul>${branches.map(branch => '<li> branch.name </li>').join('')}</ul>`
    document.getElementById("details").innerHTML = commitsList
  }

 const rootURL = "https://api.github.com"

// function getRepositories() {
//   const name = document.getElementById("username").value
//   const uri = rootURL + "/users/" + name + "/repos"
//   const xhr = new XMLHttpRequest()
//   xhr.addEventListener("load", displayRepositories)
//   xhr.open("GET", uri)
//   xhr.send()
//   return false;
// }
// function displayRepositories() {
//   const repos = JSON.parse(this.responseText)
//   const repoList = "<ul>" + repos.map(repo => {
//     const dataUsername = 'data-username="' + repo.owner.login + '"'
//     const dataRepoName = 'data-repository="' + repo.name + '"'
//     return(`
//           <li>
//             <h2>${repo.name}</h2>
//             <a href="${repo.html_url}">${repo.html_url}</a><br>
//             <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
//             <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
//           </li>`
//           )
//   }).join('') + "</ul>";
//   document.getElementById("repositories").innerHTML = repoList
// }
// function getCommits(el) {
//   const repoName = el.dataset.repository
//   const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/commits"
//   const xhr = new XMLHttpRequest()
//   xhr.addEventListener("load", displayCommits)
//   xhr.open("GET", uri)
//   xhr.send()
// }
// function displayCommits() {
//   const commits = JSON.parse(this.responseText)
//   const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
//   document.getElementById("details").innerHTML = commitsList
// }
// function getBranches(el) {
//   const repoName = el.dataset.repository
//   const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
//   const xhr = new XMLHttpRequest()
//   xhr.addEventListener("load", displayBranches)
//   xhr.open("GET", uri)
//   xhr.send()
// }
// function displayBranches() {
//   const branches = JSON.parse(this.responseText)
//   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
//   document.getElementById("details").innerHTML = branchesList
// }