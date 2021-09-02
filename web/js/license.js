async function resetSoftware() {
    let alert =document.getElementById("alert");
    let node =document.createElement('div');
    node.className="alert alert-success";
    node.role ="alert";
    node.innerText="Reset successfull!!!";
    let reset =await eel.reset_database()();
    let response= await reset;
    alert.appendChild(node);
}
