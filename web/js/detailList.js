// let data ={'barcode':4443543669,'serialno':659,'price':484,'dis':6,'disa':684,'tax':18,'total':66545};
async function update_gst() {
    let gstno =document.getElementById('gstno').value;
    let tax =document.getElementById("tax").value;
    let data ={"gstno":gstno,"tax":tax}
    let up = await eel.update_gst(data)();
    let res = await up;
    alert("GST NO and TAX updated successfully!!!");
}
async function get_gst() {
    let get =await eel.get_gst()();
    let res =await get;
    document.getElementById("gstno").value= res.gstno;
    document.getElementById("tax").value =res.tax;
    document.getElementById("gst").innerText= res.gstno;
    let d= new Date();
    document.getElementById("date_in").innerText += d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();

}
function delete_item(id){
document.getElementById(id).remove()
    let tbody =document.getElementsByTagName('tr');
    let len = tbody.length -1;
    for(let i =1;i<len;i++){
        let tr=tbody.item(i);
        tr.id=i;
        tr.cells[0].id=i;
    }
    calc_grand_total();
}
function calc_grand_total(){
    let rows =document.getElementsByClassName("total");
    let len =rows.length;
    console.log(rows);
    let sum=0;
    for(let i=1;i<len;i++){
        let t =rows.item(i).innerText;
        sum+= parseInt(t);
    }
    document.getElementById("grand_total").innerText=sum;
}

async function addItem() {
    let tax=document.getElementById('tax').value;
    let barcode =document.getElementById("barcode").value;
    if(barcode.length===18){
        let getdata = await eel.get_data_from_inventory(barcode)();
        let data = await getdata;
        let price =data.price;
        tax=tax*parseInt(price)/100;
        let dis =data.dis;
        let disa =parseInt(dis)*parseInt(price)/100;
        price=parseInt(price);
        dis=parseInt(dis);
        disa =parseInt(disa);
        let total=parseInt(price)-parseInt(disa)+tax;
        data ={'barcode':barcode,'price':price,'dis':dis,'disa':disa,'tax':tax,'total':total};
        await addItemList(data);
        calc_grand_total();
        clearbar();
    }
    else {
        alert("BARCODE MUST BE OF 18 DIGIT");
    }
}
function addItemList(data) {
    let id=document.getElementById("tableBody");
    id =id.getElementsByTagName('tr');
    id =id.length + 1;
    let tablebody =document.getElementById("tableBody");
    let trStart =document.createElement('tr');
    trStart.id=id;
    console.log(id);
    let index =document.createElement("td");
    index.id =id;
    index.className ="no btn-danger";
    index.innerText="#";
    index.onclick =function () {
        delete_item(this.id);
    };
    trStart.appendChild(index);
    let barcode =document.createElement('td');
    barcode.className ="desc";
    barcode.innerText=data.barcode;
    trStart.appendChild(barcode);
    let price =document.createElement('td');
    price.className ="unit";
    price.innerText=data.price;
    trStart.appendChild(price);
    let tax =document.createElement('td');
    tax.className="qty";
    tax.innerText=data.tax+'('+(document.getElementById("tax").value)+'%'+')';
    trStart.appendChild(tax);
    let disa =document.createElement('td');
    disa.className="qty";
    disa.innerText=data.disa+'('+data.dis+'%'+')';
    trStart.appendChild(disa);
    let total =document.createElement('td');
    total.className="total";
    total.innerText=data.total;
    trStart.appendChild(total);
    tablebody.appendChild(trStart);


}
function clearbar() {
    document.getElementById('barcode').value= '';
}
async function on_print() {
    let rows =document.getElementsByClassName("desc");
    let len =rows.length;
    console.log(rows);
    let barcodes=[];
    for(let i=1;i<len;i++){
        let t =rows.item(i).innerText;
        barcodes.push(t);
    }
    console.log(barcodes);
    eel.on_print_invoice(barcodes);
    await print_bill();
    document.getElementById("tableBody").innerHTML="";
    document.getElementById("grand_total").innerText="";
    let date =new Date();
    let year = date.getFullYear().toString().split("").reverse().join("").substr(0,2).split("").reverse().join("");
    let month ="0".repeat(2-(date.getMonth()+1).toString().length)+(date.getMonth()+1).toString();
    let day ="0".repeat(2-(date.getDate()).toString().length)+(date.getDate()).toString();
    date =""+year+month;
    eel.update_month_table({"date":date,"month":(parseInt(month)-1).toString(),"count":len-1});
    date =""+year+month+day;
    let d =new Date();
    eel.update_week_table({"date":date,"day":(d.getDay()-1).toString(),"count":len-1});
}

function print_bill() {
    let divContents = document.getElementById("bill").cloneNode(true);
    console.log(divContents);
    var a = window.open('', '', '');
    a.document.write('<html>\n<head>\n <link rel=\"stylesheet\" type=\"text/css\" href=\"invoice/style.css\">\n</head>');
    a.document.write('<body >');
    a.document.write(divContents.innerHTML);
    a.document.write('</body></html>');
    a.document.close();
    a.onload =()=>{
        a.focus();
        a.print();
        a.close();
    }
}
