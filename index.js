let myLeads = JSON.parse(localStorage.getItem("myLeads"));
if(myLeads===null){
    myLeads = []
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
}
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulList = document.getElementById("ul-el");
const dltBtn = document.getElementById("dlt-btn");
const grabTab = document.getElementById("grabtab-btn");
renderLeads();
inputBtn.addEventListener("click",save());
dltBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    ulList.textContent = "";
})
grabTab.addEventListener("click",function(){
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        inputEl.value = tabs[0].url;
        save();
    });
})
function saveLead(leedLink){
    myLeads = JSON.parse(localStorage.getItem("myLeads"))
    myLeads.push(leedLink)
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
}
function save(){
    var leadLink = inputEl.value;
    if(leadLink!==''){
        let li = document.createElement("li");
        li.innerHTML = `<a href="${leadLink}" target="_blank">${leadLink}</a>`
        ulList.append(li);
        saveLead(leadLink);
        inputEl.value = ''
    }
}
function renderLeads(){
    let listItem = "";
    for(i=0;i<myLeads.length;i++){
        listItem += `<li><a href="${myLeads[i]}" target="_blank">${myLeads[i]}</a></li>`;
    }
    ulList.innerHTML = listItem
}