let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('Discount');
let total = document.getElementById('total');
let count = document.getElementById('Count');
let category = document.getElementById('Category');
let btncreate = document.getElementById('btncreate');
// console.log(title , price , taxes , ads , discount , total , count , category , btncreate )

let mood = 'Create';
let tbl ;

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////get total //////////////////////////////////////////////////

function gettotal(){ 

        if(price.value !=''){
            let result = (+price.value + +taxes.value + +ads.value )- +discount.value;
            total.innerHTML= result;
            total.style.background = 'blueviolet';
        }else{
            total.innerHTML = '';
            total.style.background= 'red';
        }
}

//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Create product////////////////////////////////////////////////

 let dataproduct ;

    if (localStorage.Product != null){

        dataproduct=  JSON.parse(localStorage.Product);
    }
    else{
        dataproduct=[];
    }


btncreate.onclick = function(){
 newproduct= {
        Title : title.value.toLowerCase(),
        Price : price.value ,
        Taxes : taxes.value ,
        Ads : ads.value ,
        Discount : discount.value ,
        Total : total.innerHTML ,
        Count : count.value,
        Category : category.value.toLowerCase() 
                                   }
     
if(title.value !=''&& price.value !='' && taxes.value !='' && ads.value !='' 
&& count.value!='' && category.value!='' && newproduct.Count < 100){
if(mood==='Create'){
    if(newproduct.Count> 1){
        for(let c = 0;c<newproduct.Count ; c++ ){
            dataproduct.push(newproduct);
        }
      }
      else{
        dataproduct.push(newproduct);
      }
    } 
}
else{
        dataproduct[tbl]= newproduct ;
        btncreate.innerHTML = 'Create';
        mood = 'Create';
        count .style .display= 'block';
}
ClearData();
     
localStorage.setItem(  'Product' , JSON.stringify(dataproduct) )  ;
       ClearData ();
       ShowData();
}

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////Clear Data //////////////////////////////////////////////////////

function ClearData (){
     title.value = '';
     price.value = '';
     taxes.value = '';
     ads.value = '';
     discount.value = '';
     total.innerHTML = '';
     count.value = '';   
     category .value = '';
}

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////Show Data ///////////////////////////////////////////////////

  ShowData =() =>{
 gettotal();
let table = '';
        for(let x = 0 ; x< dataproduct.length; x++ ){
            table += `<tr>
            <td>${x+1}</td>
            <td>${dataproduct[x].Title} </td>
            <td>${dataproduct[x].Price} </td>
            <td> ${dataproduct[x].Taxes}</td>
            <td>${dataproduct[x].Ads}</td>
            <td>${dataproduct[x].Discount}</td>
            <td>${dataproduct[x].Total} </td>
            <td>${dataproduct[x].Category}</td>
            <td> <button onclick="UpdateData(${x})" id="btnupdate" >Update</button>   </td>
        <td>  <button  onclick="DeleteData(${x})"  id="btndelete" >Delete</button> </td>
        </tr>`;
 }
document.getElementById('tobody').innerHTML = table ; 

let btndeleteall = document.getElementById('Deleteall');
   if(dataproduct.length>0){
        btndeleteall.innerHTML = `
  <button onclick="DeleteALL()" > Delete All (${dataproduct.length} ) </button>
  `
        }
        else{
            btndeleteall.innerHTML = '';
        }

  }
ShowData();

//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////Delete Data //////////////////////////////////////////////

function DeleteData(x){

    dataproduct.splice(x,1);
    localStorage.Product = JSON.stringify(dataproduct);
    ShowData();

}
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Delete ALL/////////////////////////////////////////////////

function DeleteALL(){

        localStorage.clear();
        dataproduct.splice(0);
        ShowData();
}

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////UpdateData ////////////////////////////////////////

function UpdateData(x) {
        title.value = dataproduct[x].Title;
        price.value = dataproduct[x].Price ;
        taxes.value = dataproduct[x].Taxes;
        ads.value = dataproduct[x].Ads;
        discount.value = dataproduct[x].Discount ;
        gettotal();
        count.style.display = 'none';
        category.value = dataproduct[x].Category ;
        btncreate.innerHTML = "Update";
        tbl = x ;
        mood = 'Update';
        scroll({
            top :0,
        behavior:'smooth'
        })
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////search data ////////////////////////////////////////////////////////

let moodsearch = 'title';

function searchtype(id){
    let search = document.getElementById('txtsearch');
        if(id  ==' btnsearchtitle'){
            moodsearch= 'title';
            search.placeholder = "search by title";
        }
        else{
            moodsearch= 'Category';
            search.placeholder='search by category';
        }
   
                search.focus();
                search.value='';
                ShowData();
}

function searchdata(value){
 
    let table = '';
    if(moodsearch=='title'){

        for(let i =0 ; i <dataproduct.length ; i++){

          if(dataproduct[i].Title.includes(value.toLowerCase())){
                 
            table += `<tr>
                        <td>${i}</td>
                        <td>${dataproduct[i].Title} </td>
                        <td>${dataproduct[i].Price} </td>
                        <td> ${dataproduct[i].Taxes}</td>
                        <td>${dataproduct[i].Ads}</td>
                        <td>${dataproduct[i].Discount}</td>
                        <td>${dataproduct[i].Total} </td>
                        <td>${dataproduct[i].Category}</td>
                        <td> <button onclick="UpdateData(${i})" id="btnupdate" >Update</button>   </td>
                    <td>  <button  onclick="DeleteData(${i})"  id="btndelete" >Delete</button> </td>
                    </tr>`;
           }

 }
   }else{

        for(let i =0 ; i <dataproduct.length ; i++){

            if(dataproduct[i].Category.includes(value.toLowerCase())){
                  
             table += `<tr>
                    <td>${i}</td>
                    <td>${dataproduct[i].Title} </td>
                    <td>${dataproduct[i].Price} </td>
                    <td> ${dataproduct[i].Taxes}</td>
                    <td>${dataproduct[i].Ads}</td>
                    <td>${dataproduct[i].Discount}</td>
                    <td>${dataproduct[i].Total} </td>
                    <td>${dataproduct[i].Category}</td>
                    <td> <button onclick="UpdateData(${i})" id="btnupdate" >Update</button>   </td>
                <td>  <button  onclick="DeleteData(${i})"  id="btndelete" >Delete</button> </td>
                </tr>`;
    }
  }
}
    document.getElementById('tobody').innerHTML = table ; 

}