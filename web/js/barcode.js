var inventory;
var c=0;
function print_barcode() {
    // console.log(sv.innerText);
    let end =document.getElementById("end").value;
    var divContents = document.getElementById("final").outerHTML;
    var a = window.open('', '', '');
    a.document.write('<html>');
    a.document.write('<body >');
    a.document.write(divContents);
    a.document.write('</body></html>');
    a.document.close();
    a.print();
    a.close();
    eel.update_end_qr(end);
    eel.update_inventory(inventory);

}
async function gen() {
    document.getElementById('final').innerHTML="";
    let price =document.getElementById('price').value;
    let disc =document.getElementById('disc').value;
    let noofqr =document.getElementById('noofqr').value;
    let costprice =document.getElementById("costprice").value;
    let date =new Date();
    let description =document.getElementById('description').value;
    let selIndex =document.getElementById('inputGroupSelect04');
    let vendor = selIndex.options[selIndex.selectedIndex].value;
    document.getElementById("loading").style.visibility="visible";
    let year = date.getFullYear().toString().split("").reverse().join("").substr(0,2).split("").reverse().join("");
    let month ="0".repeat(2-(date.getMonth()+1).toString().length)+(date.getMonth()+1).toString();
    let day ="0".repeat(2-(date.getDate()).toString().length)+(date.getDate()).toString();
    date =""+year+month+day;
    let st =await eel.get_qr(date)();
    let start =await st;
        let end = start +parseInt(noofqr);
        let totalBarcode = [];
        let v={"price":price,"disc":disc,"noofqr":noofqr,"costprice":costprice,"selectedind":vendor}
        let isvalid= validate_entry(v);
        if(isvalid){
            //let start =parseInt(start);
            for (let i=start+1; i<=end;i++){
                let serialno = "0".repeat(5-i.toString().length)+i.toString();
                let barcode = date+price+serialno+disc;
                JsBarcode("#barcode", barcode,{width:2,height:50});
                let pre=document.getElementById('barcode');
                let newsvg = pre.cloneNode(true);
                let id =+(c+1).toString();
                newsvg.id= id;
                let sv =document.getElementById('final');
                sv.appendChild(newsvg);
                totalBarcode.push({"barcode":barcode,"serialno":serialno,"price":price,"dis":disc,"vendor":vendor,"description":description,"costprice":costprice});
            }
        }
        document.getElementById('barcode').style.visibility="hidden";
        document.getElementById("end").value=end;
        document.getElementById("loading").style.visibility="hidden";
        console.log(totalBarcode);
        inventory = totalBarcode;
}
function validate_entry(v) {
    if(v.price.length===5)
    {
        if(v.disc.length===2){
            if(parseInt(v.noofqr)<=500 && parseInt(v.noofqr)>=1){
                if(parseInt(v.costprice)>1){
                    if(parseInt(v.selectedind)>0){
                        return true;
                    }
                    else {
                        alert("Select Vendor");
                        return false;
                    }
                }
                else {
                    alert("cost price must not be empty");
                    return false;
                }
            }
            else {
                alert("no of must be in range 1-500");
                return false;
            }
        }
        else {
            alert("Discount must be in 2 digits");
            return false;
        }
    }
    else {
        alert(" Price must contain 5 digits");
        return false;
    }
}
function gen_img() {
    let sv =document.getElementById('final');
    var svgString = new XMLSerializer().serializeToString(sv);
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
    var url = DOMURL.createObjectURL(svg);
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        var png = canvas.toDataURL("image/png");
        document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';
        DOMURL.revokeObjectURL(png);
    };
    img.src = url;
}
async function get_vendor_list() {
    let response = await eel.return_vendor_list()();
    let list =await response;//.then(res=>{return res});
    let select = document.getElementById('inputGroupSelect04');
    for (let i =0;i<list.length;i++)
    {
        let vendor = list[i];
        let option = document.createElement('option');
        option.innerText = vendor[1];
        option.value = vendor[0];
        select.appendChild(option);
    }
}
