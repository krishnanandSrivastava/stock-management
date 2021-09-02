function clearbar() {
    document.getElementById('vendor').value= '';
}
async function insert_data() {
    let tax=18;
    let barcode =document.getElementById("barcode").value;
    barcode =barcode.toString()
    if(barcode.length === 18)
    {
        let serialno=barcode.slice(0,10);
        let price= barcode.slice(10,16);
        let dis = barcode.slice(16,19);
        let disa =parseInt(dis)*parseInt(price)/100;
        tax=tax*parseInt(price)/100;
        barcode=parseInt(barcode);
        serialno=parseInt(serialno);
        price=parseInt(price);
        dis=parseInt(dis);
        disa =parseInt(disa);
        let total=parseInt(price)-parseInt(disa)+tax;
        let data ={'barcode':barcode,'serialno':serialno,'price':price,'dis':dis,'disa':disa,'tax':tax,'totalV':total};
        let n =await eel.insert_data(data)();
        if(n===1)
        {
            let alert =document.createElement('div');
            alert.role='alert';
            alert.className='alert alert-primary';
            let msg =document.createTextNode(data.barcode+" added successfully!!!");
            alert.appendChild(msg);
            document.getElementById('alert').replaceChild(alert,document.getElementById('alert').childNodes[0]);
            clearbar();
            document.getElementById('barcode').focus();
        }
        else {
            let alert =document.createElement('div');
            alert.role='alert';
            alert.className='alert alert-danger';
            let msg =document.createTextNode("error occurred !!!");
            alert.appendChild(msg);
            clearbar();
            document.getElementById('alert').replaceChild(alert,document.getElementById('alert').childNodes[0]);
        }
        console.log(n);
    }

}
async function add_vendor() {
    let data =document.getElementById("vendor").value;
    let n =await eel.add_vendor('"'+data.toString()+'"')();
    if(n===1)
    {
        let alert =document.createElement('div');
        alert.role='alert';
        alert.className='alert alert-primary';
        let msg =document.createTextNode(data+" added successfully!!!");
        alert.appendChild(msg);
        document.getElementById('alert').replaceChild(alert,document.getElementById('alert').childNodes[0]);
        clearbar();
        document.getElementById('barcode').focus();
    }
    else {
        let alert =document.createElement('div');
        alert.role='alert';
        alert.className='alert alert-danger';
        let msg =document.createTextNode("error occurred !!!");
        alert.appendChild(msg);
        document.getElementById('alert').replaceChild(alert,document.getElementById('alert').childNodes[0]);
    }
}
async function get_vendor_list() {
    let response = await eel.return_vendor_list()();
    let list =await response;//.then(res=>{return res});
    for (let i =0;i<list.length;i++)
    {
        let vendor = list[i];
        console.log(vendor);
    }
}
eel.expose(show_inventory)
function show_inventory(data,vendorList) {
    let ol = document.getElementById("inventory_db");
    ol.innerHTML="";
    let vl = document.getElementById("vendor_list");
    vl.innerHTML="";
    console.log(data)
    for(let i=0;i<data.length;i++)
    {
        let li =document.createElement('li');
        li.className="list-group-item"
        let row=data[i]
        li.innerText="Barcode : "+row[0]+"  SerialNo : "+row[1]+"   SellingPrice : "+row[2]+"   Discount% : "+row[3]+"  VendorID : "+row[4]+"   Description : "+row[5]+"    CostPrice : "+row[6];
        ol.appendChild(li);
    }
    for(let i=0;i<vendorList.length;i++)
    {
        let li =document.createElement('li');
        li.className="list-group-item"
        let row=vendorList[i]
        li.innerText="VendorID : "+row[0]+"  VendorName : "+row[1];
        vl.appendChild(li);
    }

}
function show() {
    eel.fetch_all_inventory();
}
async function on_return() {
let barcodes=[]
    let barcode =document.getElementById("return_item").value;
    barcodes.push(barcode);
    let update = await eel.on_return(barcodes)();
    let updated =await update;
    alert("Item Returmed!!!");
}
