let scroll = document.querySelectorAll('header a[href*="#"]');

for(s of scroll){
    if(s){
        s.addEventListener('click',function(e){
            e.preventDefault();
            sId = this.getAttribute('href');
            console.log(sId);
            document.querySelector(sId).scrollIntoView({
                behavior:'smooth', block:'start'
            })
        })
    }
}