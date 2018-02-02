function getRepositories() {
   const username = document.getElementById('username').value
   if (username) {
     let arrOfRepos = []
     for (var i = 1, j = 1; j > 0; i++) {
       var req = new XMLHttpRequest();
       // must be sunchronus or else, j is assigned below, before the response is received from send(). while send() is going on, j is assigned the value of the empy responseText. and the loop doesn't continue.
       req.open('GET', `https://api.github.com/users/${username}/repos?page=${i}`, false)
       req.send()
       arrOfRepos = arrOfRepos.concat(JSON.parse(req.responseText))
       var j = JSON.parse(req.responseText).length
     }
     displayRepositories(arrOfRepos)
   }
 }
 function displayRepositories(arrOfRepos) {
    if (arrOfRepos == undefined) {
       arrOfRepos = JSON.parse(this.responseText)
    };
    let repoList = '<ul>'

    for (var i = 0; i < arrOfRepos.length; i++) {
      repoList += `<li><a href="${arrOfRepos[i].html_url}">See at GitHub</a> - - ${arrOfRepos[i].name} - <a href="#" data-repository="${arrOfRepos[i].name}" onclick="getCommits(this)">Get Commits</a> - - <a href="#" data-repo="${arrOfRepos[i].name}" data-username="${arrOfRepos[i].owner.login}" onclick="getBranches(this)">Get Branches</a></li>`;
    }

    repoList += '</ul>'

    document.getElementById('repositories').innerHTML = repoList
  }

  function getCommits(linkEl) {
    const repo = linkEl.dataset.repository
    const username = linkEl.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener("load", displayCommits)
    req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
    req.send()
  }

  function displayCommits() {
    const commits = JSON.parse(this.responseText)
    let html = `<ul>`

    for (var i = 0; i < commits.length; i++) {
      if (commits[i].author) {
        html += `<li> - - ${commits[i].commit.author.name} - - ${commits[i].author.login} - ${commits[i].commit.message}</li>`
      } else {
        html += `<li>--- Unknown - ${commits[i].commit.message}</li>`
      }
    }

    html += `</ul>`

    document.getElementById('details').innerHTML = html
  }

  function getBranches(linkEl) {

    const repo = linkEl.dataset.repository
    const username = linkEl.dataset.username
    const req = new XMLHttpRequest()
    req.addEventListener('load', displayBranches)
    req.open('GET', `https://api.github.com/repos/${username}/${repo}/branches`)
    req.send()
  }

  function displayBranches() {
    const arrOfBranches = JSON.parse(this.responseText)
    let html = `<ul>`
    for (var i = 0; i < arrOfBranches.length; i++) {
      html += `<li> - - ${arrOfBranches[i].name}</li>`
    }
    html += `</ul>`
    document.getElementById('details').innerHTML = html
  }
