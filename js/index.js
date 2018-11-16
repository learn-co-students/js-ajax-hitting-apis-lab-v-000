// your code here
// describe('displayCommits', () => {
//       it('parses and displays json values', () => {
//         var resp = { responseText: commitsData() }
//         displayCommits.call(resp)
//         el = document.getElementById("details")
//         expect(el.innerHTML).toMatch(/Monalisa Octocat/)
//         expect(el.innerHTML).toMatch(/octocat/)
//         expect(el.innerHTML).toMatch(/Fix all the bugs/)
//       })
//     })



function displayCommits(){
  let response = JSON.parse(this.responseText)
  
  let details = ""
  document.querySelector("#details").innerHTML = ""
  document.querySelector("#details").innerHTML += "<h3>Commit Messages</h3><ul>"
  for(const itr of response){
      details = `<li>${itr.commit.message}</li><ul><li>${itr.commit.author.name}</li><li>${itr.committer.login}</li></ul>`
      document.querySelector("#details").innerHTML += details
  }
  document.querySelector("#details").innerHTML += "</ul>"
}
  // describe('displayBranches', () => {
  //     it('parses and displays json values', () => {
  //       var resp = { responseText: branchesData() }
  //       displayBranches.call(resp)
  //       el = document.getElementById("details")
  //       expect(el.innerHTML).toMatch(/master/)
  //     })
  //   })
  function displayBranches(){
    let branchData = JSON.parse( this.responseText )
    let output = "<ul>"
    branchData.map( (itr) => { 
      output += `<li>${itr.name}</li>`
      
    })
    output += "</ul>"
    document.querySelector("#details").innerHTML = output
  }
  // describe('displayRepositories', () => {
  //     it('parses and displays json values', () => {
  //       var resp = { responseText: reposData() }
  //       displayRepositories.call(resp)
  //       el = document.getElementById("repositories")
  //       expect(el.innerHTML).toMatch(/Hello-World/)
  //       expect(el.innerHTML).toMatch(/octocat/)
  //       expect(el.innerHTML).toMatch(/https:\/\/github.com\/octocat\/Hello-World/)
  //     })
  //   })
function displayRepositories(){
 let response = JSON.parse(this.responseText)
  let code = "<ul>"
  document.querySelector("#repositories").innerHTML = ""
  for(const itr of response){
    document.querySelector("#repositories").innerHTML += `${itr.html_url}/`
  }
  code += "</ul>"
}

// describe('getCommits', () => {
//       it('calls out to Github', () => {
//         getCommits(el)
//         expect(requests.length).toBe(1)
//         expect(requests[0].url).toBe('https://api.github.com/repos/octocat/Spoon-Knife/commits')
//       })
//     })
function getCommits(repo_url, repo_name){ 
  const commit_req = new XMLHttpRequest()
  commit_req.addEventListener("load", displayCommits)
  commit_req.open("GET", repo_url)
  commit_req.send(); 
}
// describe('getBranches', () => {
//       it('calls out to Github', () => {
//         getBranches(el)
//         expect(requests.length).toBe(1)
//         expect(requests[0].url).toBe('https://api.github.com/repos/octocat/Spoon-Knife/branches')
//       })
function getBranches(branch_url){
  const branch_req = new XMLHttpRequest()
  branch_req.addEventListener("load", displayBranches)
  branch_req.open("GET", branch_url)
  branch_req.send(); 
}
function checkData(){
  let response = JSON.parse(this.responseText)
  let code = "<ul>"
  document.querySelector("#repositories").innerHTML = ""
  for(const itr of response){
    document.querySelector("#repositories").innerHTML += `${itr.name}<ul><li><a style="text-decoration:underline;color:blue;cursor:pointer" onclick='getCommits("${itr.url}/commits", "${itr.name}"); return true;'>View Repository</a></li><li>View Branches</li></ul>`
  }
  code += "</ul>"
}

function getRepositories(){
  let username = document.querySelector("input").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", checkData)
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}