const form = document.querySelector('#searchForm');
const res = document.querySelector('#result');
const cont = document.getElementById("allContaint");
var upd;

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(upd)
    clearTimeout(upd);
    const ctype = form.elements.coinType.value;
    cont.classList.add('mainClick');
    cont.classList.remove('main');    
    fetchPrice(ctype);

});

const fetchPrice = async(ctype) =>{
    const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency=USD`);
    showPrice(r.data.coin);
    upd = setTimeout(()=>fetchPrice(ctype),10000);
}


const showPrice = (coinData)=>{
    const price = coinData.price;
    const vol = coinData.volume;
    const change = coinData.priceChange1d;
    const coin = coinData.name;
    const curr = 'USD';
    var col= "green";
    if(change<0){
        col = "red";
    }
    res.innerHTML = `<table class="p-4 col-md-7 "  style="background-color: white; font-weight: 700;border: 5px solid yellow " id="resTable">
    <tr  style="color: white; background-color:blue">
    <td>
        Property
    </td>
    <td>
        Value
    </td>
</tr>
<tr>
    <td>${coin}</td>
    <td style="color:${col};"><span style="font-size: 1.3em;">${price}</span> ${curr}</td>
</tr>
<tr>
    <td>Volume (24hrs)</td>
    <td>${vol}</td>
</tr>
<tr>
    <td>Change (24hrs)</td>
    <td style="color:${col};">${change} ${curr}</td>
</tr>
    
    </table>`;
    
};
