import{B as x,r as g,J as r,o as l,e as h,f as u,u as n,O as C,c as I,y as d,F as _}from"./entry.2e476155.js";const V={__name:"VPlaceLoad",props:["width","height","classes","light"],setup(e){const{width:t,height:s,classes:m,light:o}=e,c=g("loads");return r(()=>{c.value=o?"loads-light":"loads"}),(f,w)=>(l(),h("div",{class:u(`${n(c)} ${e.classes}`),style:C({width:e.width,height:e.height,"max-width":"100%"})},null,6))}},k=x(V,[["__scopeId","data-v-b62404ca"]]),B=(e,t)=>{const s=new Image;s.src=e,s.complete?t(!0):(s.onload=()=>t(!0),s.onerror=()=>t(!1))},L=["id","width","height","src","alt","sytle"],F={__name:"Image",props:["src","id","classes","style","width","height","loadClasses","light","alt"],setup(e){const{src:t,width:s,height:m,id:o,classes:c,style:f,loadClasses:w,light:P,alt:E="Image"}=e,a=g(!1),y=i=>{console.log("error loading image"),a.value=!1};return r(()=>{B(t,i=>{i?a.value=!0:a.value=!1})}),(i,$)=>{const v=k;return l(),h(_,null,[n(a)?d("",!0):(l(),I(v,{key:0,width:e.width,height:e.height,classes:e.loadClasses,light:e.light},null,8,["width","height","classes","light"])),n(a)?(l(),h("img",{key:1,id:e.id,class:u(e.classes),width:e.width,height:e.height,src:e.src,alt:e.alt,onError:y,sytle:e.style},null,42,L)):d("",!0)],64)}}};export{F as _};
