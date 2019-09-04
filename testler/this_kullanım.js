// function cart(){
//     this.ad = "rascol";
//     this.soyad= "nikov";
//     return ad +" "+ soyad;
// }

// console.log(cart());
//--------------------------------------------------
function cart(object){ //bu fonksiyon ile obje oluşturuluyor. değerler return için çağrırken new kullanımlaz.
    this.ad = "rascol";
    this.soyad= "nikov";
    
  
}

var kimlik = new cart({});
console.log(kimlik); 

//--------------------------------------------------------------

function cart(object){ //bu fonksiyon ile obje oluşturuluyor. değerler return için çağrırken new kullanımlaz.
    this.ad = "rascol";
    this.soyad= "nikov";
    
    return this.ad;
}

var kimlik = cart({});
console.log(kimlik); 