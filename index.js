function getRepositories() {
  const name = document.getElementById("username").value
  const uri = rootURL + "/users/" + name + "/repos"
  const xhr = new XMLHttpRequest()

  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", uri)
  xhr.send()
  return false;
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
    const dataUsername = 'data-username="' + repo.owner.login + '"'
    const dataRepoName = 'data-repository="' + repo.name + '"'
    return (`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a><br>
    `)
  })
}
