/* ===================================================
   GLOBAL HELPERS
=================================================== */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function show(el){ if(el) el.classList.remove("hidden"); }
function hide(el){ if(el) el.classList.add("hidden"); }


/* ===================================================
   BLOG POSTS LOADER (IMPROVED)
=================================================== */
async function loadBlogPosts(){
try{
    const res = await fetch("posts.json");
    if(!res.ok) throw new Error("Fetch failed");

    const data = await res.json();
    const target = $("#blogPosts");

    if(!target) return;

    target.innerHTML = data.map(post => `
        <div class="card glass fade-up">
            <h3><a href="${post.link}">${post.title}</a></h3>
            <p>${post.desc}</p>
        </div>
    `).join("");

}catch(err){
    console.log("Blog posts not loaded:", err.message);
}
}
loadBlogPosts();


/* ===================================================
   CONTACT FORM HANDLER (IMPROVED)
=================================================== */
const form = $("#contactForm");

if(form){

form.addEventListener("submit", async function(e){
    e.preventDefault();

    const successBox = $("#successMsg");
    const formData = new FormData(this);

    successBox.innerText="⏳ Sending message...";

    try{
        const res = await fetch(
        "https://formsubmit.co/ajax/tukarammarde@gmail.com",
        { method:"POST", body:formData }
        );

        if(!res.ok) throw new Error();

        successBox.innerText =
        "✅ Message sent successfully! I will contact you soon.";

        form.reset();

    }catch{
        successBox.innerText =
        "❌ Failed to send message. Please try again.";
    }
});
}


/* ===================================================
   DARK MODE TOGGLE
=================================================== */
const darkToggle=$("#darkToggle");

if(darkToggle){
darkToggle.onclick=()=>{
    document.body.classList.toggle("light");
    localStorage.setItem(
        "theme",
        document.body.classList.contains("light")?"light":"dark"
    );
};
}

// load saved theme
if(localStorage.getItem("theme")==="light"){
document.body.classList.add("light");
}


/* ===================================================
   FAQ ACCORDION
=================================================== */
$$(".faq-question").forEach(btn=>{
btn.addEventListener("click",()=>{
    const ans = btn.nextElementSibling;
    ans.style.display =
        ans.style.display==="block"?"none":"block";
});
});


/* ===================================================
   BACK TO TOP BUTTON
=================================================== */
const topBtn=$("#backToTop");

window.addEventListener("scroll",()=>{
    if(!topBtn) return;

    if(window.scrollY>500)
        topBtn.style.display="block";
    else
        topBtn.style.display="none";
});

if(topBtn){
topBtn.onclick=()=>window.scrollTo({
    top:0,
    behavior:"smooth"
});
}


/* ===================================================
   PROJECT FILTER SYSTEM
=================================================== */
$$(".project-filters button").forEach(btn=>{
btn.addEventListener("click",()=>{

    const filter=btn.dataset.filter;

    $$(".project-filters button")
        .forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    $$(".project-card,.project-grid .card")
    .forEach(card=>{

        if(filter==="all"){
            card.style.display="block";
            return;
        }

        const cat = card.dataset.category || "";

        card.style.display =
            cat.includes(filter)?"block":"none";
    });

});
});


/* ===================================================
   SCROLL REVEAL ANIMATION ENGINE
=================================================== */
const reveals=$$(".fade-up");

function revealOnScroll(){
const trigger=window.innerHeight*0.85;

reveals.forEach(el=>{
    const top=el.getBoundingClientRect().top;
    if(top<trigger) el.classList.add("show");
});
}
window.addEventListener("scroll",revealOnScroll);
revealOnScroll();


/* ===================================================
   STATS COUNTER ANIMATION
=================================================== */
const counters=$$(".counter");

function animateCounters(){
counters.forEach(c=>{
    const rect=c.getBoundingClientRect();
    if(rect.top<window.innerHeight-50 && !c.started){

        c.started=true;
        let start=0;
        const end=parseInt(c.dataset.count);

        const step=()=>{
            start+=Math.ceil(end/60);
            if(start>=end){
                c.textContent=end;
            }else{
                c.textContent=start;
                requestAnimationFrame(step);
            }
        };
        step();
    }
});
}
window.addEventListener("scroll",animateCounters);
animateCounters();


/* ===================================================
   NAVBAR SHADOW ON SCROLL
=================================================== */
const nav=$(".nav");

window.addEventListener("scroll",()=>{
if(!nav) return;
nav.style.boxShadow =
window.scrollY>20 ?
"0 6px 20px rgba(0,0,0,.3)" :
"none";
});


/* ===================================================
   MODAL SYSTEM
=================================================== */
const modal=$("#modal");
const modalClose=$("#modalClose");

function openModal(title,text){
    if(!modal) return;
    $("#modalTitle").innerText=title;
    $("#modalText").innerText=text;
    show(modal);
}

if(modalClose){
modalClose.onclick=()=>hide(modal);
}

window.addEventListener("click",e=>{
if(e.target===modal) hide(modal);
});


/* ===================================================
   COOKIE NOTICE
=================================================== */
const cookie=$("#cookieNotice");

if(cookie && !localStorage.getItem("cookieAccepted")){
    cookie.style.display="flex";
}

$("#acceptCookies")?.addEventListener("click",()=>{
    localStorage.setItem("cookieAccepted","yes");
    cookie.style.display="none";
});


/* ===================================================
   ACCESSIBILITY STATUS HELPER
=================================================== */
function announce(msg){
const live=$("#ariaStatus");
if(live){
    live.textContent="";
    setTimeout(()=>live.textContent=msg,100);
}
}
/* ================= FAQ TOGGLE ================= */
document.querySelectorAll(".faq-question").forEach(btn=>{
btn.addEventListener("click",()=>{

    const answer = btn.nextElementSibling;

    // close other open items
    document.querySelectorAll(".faq-answer").forEach(a=>{
        if(a!==answer) a.style.display="none";
    });

    // toggle current
    answer.style.display =
        answer.style.display==="block" ? "none" : "block";
});
});