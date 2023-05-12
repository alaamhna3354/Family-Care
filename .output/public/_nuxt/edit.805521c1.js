import{c as L,a as r,_ as O}from"./object.5d43951f.js";import{B as K,v as F,o as m,e as h,l as s,m as Y,k as e,C as Q,t as $,y as D,i as M,E as S,p as N,q as X,H as q,s as W,h as U,r as g,j as z,u as i,F as T,x as G,f as w,I as Z,w as P,J as ee,c as B,K as R,L as le}from"./entry.2e476155.js";import{_ as x}from"./VSelect.1c4ae724.js";import"./useTranslate.8819d20e.js";const ae={class:"form-check form-switch form-check-inline"},te=["id","type","name","value"],se=["for"],oe={__name:"VRadioInput",props:{type:{type:String,default:"text",required:!0},name:{type:String,required:!0},id:{type:String,default:"text",required:!0},label:{type:String},value:{type:String}},setup(n){return(u,_)=>{const o=F("VErrorMessage"),l=F("VField");return m(),h("div",ae,[s(l,{name:n.name,type:n.type,value:n.value},{default:Y(({field:d})=>[e("input",Q(d,{class:"form-check-input",id:n.id,type:n.type,name:n.name,value:n.value}),null,16,te),n.label?(m(),h("label",{key:0,for:n.id,class:"form-check-label"},$(n.label),9,se)):D("",!0),s(o,{name:n.name,as:"div",class:"help is-invalid"},null,8,["name"])]),_:1},8,["name","type","value"])])}}},H=K(oe,[["__scopeId","data-v-30664735"]]),j=()=>{const{apiBase:n}=M(),u=async(l,d)=>S(()=>`${l}`,{key:`${l}`,baseURL:n,method:"post",body:d,headers:{Authorization:`Bearer ${N().value}`},onRequest({request:y,options:b}){b.headers.Authorization=`Bearer ${N().value}`},onResponseError({request:y,response:b,options:v}){if(b.status==401)return o()}},"$X4i7ui3h36"),_=async(l,d)=>S(()=>`${l}`,{key:`${l}`,baseURL:n,method:"put",body:d,headers:{Authorization:`Bearer ${N().value}`},onRequest({request:y,options:b}){b.headers.Authorization=`Bearer ${N().value}`},onResponseError({request:y,response:b,options:v}){if(b.status==401)return o()}},"$ChsnHkkQLs"),o=()=>(localStorage.removeItem("token"),localStorage.removeItem("userInfo"),N().value=null,X().value.isAuthenticated=!1,q().value=null,W("/auth/login"));return{post:u,put:_}};const ne={class:"main-black-background"},ie={class:"col-lg-8 login_box_area mx-auto"},re={class:"container"},de={class:"row"},ce={class:"col-12 col-md-11 col-lg-10 col-xl-9 mx-auto"},me={class:"login_form_inner"},ue=e("h3",{class:"fs-3 mb-3 font-philosopher"},"Edit Profile",-1),he={key:0,class:"error-messages mb-3"},pe={class:"alert alert-danger text-center"},be={class:"list-unstyled mb-0"},_e={class:"col-12 col-sm-6"},ve={class:"col-12 col-sm-6"},ye={class:"col-12 col-sm-6"},$e={class:"col-12 col-sm-6"},ge={class:"col-12 col-sm-6 text-start"},fe={class:"radio-group mb-3"},Ae={class:"col-12 col-sm-6"},Ee={class:"col-12 col-sm-6"},Ne={class:"col-12 col-sm-6"},De={class:"col-12 col-sm-6"},Ie={class:"col-12 col-sm-6"},ke={class:"col-12 col-sm-6"},Fe={class:"col-md-12 form-group mt-4"},we=["disabled"],Me={key:0},Ve={key:1},Ce={__name:"EditPersonProfile",props:["nationalities","countries"],setup(n){U();const{apiBase:u,api:_}=M(),o=q().value;console.log(o);const l=g(!1),d=g(!1),y=g(""),b=g(new Date(o.birthDate).getMonth()+1<10?`0${new Date(o.birthDate).getMonth()+1}`:new Date(o.birthDate).getMonth()+1),v=async(t,a)=>{t.clientId=o.clientId,l.value=!0;const{data:p,error:c}=await j().put(_.PersonClientsApi,t);console.log("data update",p)};z({validateOnBlur:!0,validateOnChange:!0,validateOnInput:!1,validateOnModelUpdate:!0});const f=L({fullNameAr:r().required().min(3).label("Your Arabic Name"),fullNameEn:r().required().min(3).label("Your English Name"),phone:r().nullable().min(3).label("Your Phone Number"),birthDate:r().nullable().label("Your Phone Number"),addressAr:r().nullable().min(3).label("Your Address In Arabic"),addressEn:r().nullable().min(3).label("Your Address In English"),phone:r().nullable().min(3).label("Your phone"),mobile:r().nullable().min(3).label("Your phone"),email:r().required().email().label("Email Address")}),E={fullNameAr:o.fullNameAr,fullNameEn:o.fullNameEn,email:o.email,gender:o.gender,birthDate:new Date(o.birthDate).getFullYear()+"-"+b.value+"-"+new Date(o.birthDate).getDate(),addressAr:o.addressAr,addressEn:o.addressEn,phone:o.phone,mobile:o.mobile,countryId:o.countryId,nationalityId:o.nationalityId};return(t,a)=>{const p=O,c=H,A=x,V=F("VForm");return m(),h("main",ne,[e("section",ie,[e("div",re,[e("div",de,[e("div",ce,[e("div",me,[ue,s(V,{id:"loginForm",class:"row login_form px-3","validation-schema":i(f),"initial-values":E,onSubmit:v},{default:Y(({meta:I})=>[i(d)?(m(),h("div",he,[e("div",pe,[e("ul",be,[(m(!0),h(T,null,G(i(y),(k,C)=>(m(),h("li",{key:C},$(k),1))),128))])])])):D("",!0),e("div",_e,[s(p,{type:"text",name:"fullNameAr",id:"fullNameAr",label:t.$t("arabicName"),placeholder:t.$t("arabicName")},null,8,["label","placeholder"])]),e("div",ve,[s(p,{type:"text",name:"fullNameEn",id:"fullNameEn",label:t.$t("englishName"),placeholder:t.$t("englishName")},null,8,["label","placeholder"])]),e("div",ye,[s(p,{type:"email",name:"email",id:"email",label:t.$t("email"),placeholder:t.$t("email")},null,8,["label","placeholder"])]),e("div",$e,[s(p,{type:"date",name:"birthDate",format:"yyyy-MM-dd",id:"birthDate",label:t.$t("birthDate"),placeholder:t.$t("birthDate")},null,8,["label","placeholder"])]),e("div",ge,[e("label",{class:w(`form-label bright-white ${t.$i18n.locale=="ar"?"rtl":""}`)},$(t.$t("gender")),3),e("div",fe,[s(c,{type:"radio",name:"gender",id:"Male",label:"Male",value:"Male"}),s(c,{type:"radio",name:"gender",id:"Female",label:"Female",value:"Female"})])]),e("div",Ae,[s(p,{type:"text",name:"addressAr",id:"addressAr",label:t.$t("arabicAddress"),placeholder:t.$t("arabicAddress")},null,8,["label","placeholder"])]),e("div",Ee,[s(p,{type:"text",name:"addressEn",id:"addressEn",label:t.$t("englishAddress"),placeholder:t.$t("englishAddress")},null,8,["label","placeholder"])]),e("div",Ne,[s(p,{type:"number",name:"phone",id:"phone",label:t.$t("phone"),placeholder:t.$t("phone")},null,8,["label","placeholder"])]),e("div",De,[s(p,{type:"number",name:"mobile",id:"mobile",label:t.$t("mobile"),placeholder:t.$t("mobile")},null,8,["label","placeholder"])]),e("div",Ie,[s(A,{name:"countryId",id:"countryId",items:n.countries,placeholder:t.$t("select-countries")},null,8,["items","placeholder"])]),e("div",ke,[s(A,{name:"nationalityId",id:"nationalityId",items:n.nationalities,placeholder:t.$t("select-nationality")},null,8,["items","placeholder"])]),e("div",Fe,[e("button",{type:"submit",value:"Login",class:w(["btn btn-custom btn-block px-3",{"btn-primary":I.valid}]),disabled:!I.valid||i(l)},[i(l)?(m(),h("span",Ve,$(t.$t("loading...")),1)):(m(),h("span",Me,$(t.$t("save")),1))],10,we)])]),_:1},8,["validation-schema"])])])])])])])}}};const Pe={class:"main-black-background"},Ye={class:"col-lg-8 login_box_area mx-auto"},qe={class:"container"},Se={class:"row"},Be={class:"col-12 col-md-11 col-lg-10 col-xl-9 mx-auto"},Re={class:"login_form_inner"},Le=e("h3",{class:"fs-3 mb-3"},"Edit Profile",-1),Oe={key:0,class:"error-messages mb-3"},Ue={class:"alert alert-danger text-center"},ze={class:"list-unstyled mb-0"},Te={class:"col-12 col-sm-6"},Ge={class:"col-12 col-sm-6"},xe={class:"col-12 col-sm-6"},He={class:"col-12 col-sm-6"},je={class:"col-12 col-sm-6"},Je={class:"col-12 col-sm-6 text-start"},Ke={class:"radio-group mb-3"},Qe={class:"col-12 col-sm-6"},Xe={class:"col-12 col-sm-6"},We={class:"col-12 col-sm-6"},Ze={class:"col-12 col-sm-6"},el={class:"col-12 col-sm-6"},ll={class:"col-md-12 form-group mt-4"},al=["disabled"],tl={key:0},sl={key:1},ol={__name:"EditCompanyProfile",props:["nationalities"],setup(n){const{nationalities:u}=n;console.log("nationalities",u),U();const{apiBase:_,api:o}=M(),l=q().value;console.log(l);const d=g(!1),y=g(!1),b=g(""),v=g(new Date(l.birthDate).getMonth()+1<10?`0${new Date(l.birthDate).getMonth()+1}`:new Date(l.birthDate).getMonth()+1),f=async(a,p)=>{a.clientId=l.id,a.nationalityId=a.nationalities,d.value=!0;const{data:c,error:A}=await j().put(o.PersonClientsApi,a);console.log("data update",c)};z({validateOnBlur:!0,validateOnChange:!0,validateOnInput:!1,validateOnModelUpdate:!0});const E=L({enName:r().required().min(3).label("Your English Name"),phone:r().nullable().min(3).label("Your Phone Number"),birthDate:r().nullable().label("Your Phone Number"),address:r().nullable().min(3).label("Your Address In Arabic"),enAddress:r().nullable().min(3).label("Your Address In English"),phone:r().nullable().min(3).label("Your phone"),mobile:r().nullable().min(3).label("Your phone"),userName:r().required().min(3).label("Your Username"),email:r().required().email().label("Email Address")}),t={name:l.name,enName:l.enName,userName:l.userName,email:l.email,gender:l.gender,birthDate:new Date(l.birthDate).getFullYear()+"-"+v.value+"-"+new Date(l.birthDate).getDate(),address:l.address,enAddress:l.enAddress,phone:l.phone,mobile:l.mobile,nationalityId:l.nationalityId};return(a,p)=>{const c=O,A=H,V=x,I=F("VForm");return m(),h("main",Pe,[e("section",Ye,[e("div",qe,[e("div",Se,[e("div",Be,[e("div",Re,[Le,s(I,{id:"loginForm",class:"row login_form px-3","validation-schema":i(E),"initial-values":t,onSubmit:f},{default:Y(({meta:k})=>[i(y)?(m(),h("div",Oe,[e("div",Ue,[e("ul",ze,[(m(!0),h(T,null,G(i(b),(C,J)=>(m(),h("li",{key:J},$(C),1))),128))])])])):D("",!0),e("div",Te,[s(c,{type:"text",name:"name",id:"name",label:a.$t("arabicName"),placeholder:a.$t("arabicName")},null,8,["label","placeholder"])]),e("div",Ge,[s(c,{type:"text",name:"enName",id:"enName",label:a.$t("englishName"),placeholder:a.$t("englishName")},null,8,["label","placeholder"])]),e("div",xe,[s(c,{type:"text",name:"userName",id:"userName",label:a.$t("username"),placeholder:a.$t("username")},null,8,["label","placeholder"])]),e("div",He,[s(c,{type:"email",name:"email",id:"email",label:a.$t("email"),placeholder:a.$t("email")},null,8,["label","placeholder"])]),e("div",je,[s(c,{type:"date",name:"birthDate",format:"yyyy-MM-dd",id:"birthDate",label:a.$t("birthDate"),placeholder:a.$t("birthDate")},null,8,["label","placeholder"])]),e("div",Je,[e("label",{class:w(`form-label bright-white ${a.$i18n.locale=="ar"?"rtl":""}`)},$(a.$t("gender")),3),e("div",Ke,[s(A,{type:"radio",name:"gender",id:"Male",label:"Male",value:"Male"}),s(A,{type:"radio",name:"gender",id:"Female",label:"Female",value:"Female"})])]),e("div",Qe,[s(c,{type:"text",name:"address",id:"address",label:a.$t("arabicAddress"),placeholder:a.$t("arabicAddress")},null,8,["label","placeholder"])]),e("div",Xe,[s(c,{type:"text",name:"enAddress",id:"enAddress",label:a.$t("englishAddress"),placeholder:a.$t("englishAddress")},null,8,["label","placeholder"])]),e("div",We,[s(c,{type:"number",name:"phone",id:"phone",label:a.$t("phone"),placeholder:a.$t("phone")},null,8,["label","placeholder"])]),e("div",Ze,[s(c,{type:"number",name:"mobile",id:"mobile",label:a.$t("mobile"),placeholder:a.$t("mobile")},null,8,["label","placeholder"])]),e("div",el,[s(V,{name:"nationalities",id:"nationalities",items:n.nationalities,placeholder:a.$t("select-nationality")},null,8,["items","placeholder"])]),e("div",ll,[e("button",{type:"submit",value:"Login",class:w(["btn btn-custom btn-block px-3",{"btn-primary":k.valid}]),disabled:!k.valid||i(d)},[i(d)?(m(),h("span",sl,$(a.$t("loading...")),1)):(m(),h("span",tl,$(a.$t("save")),1))],10,al)])]),_:1},8,["validation-schema"])])])])])])])}}},cl={__name:"edit",async setup(n){let u,_;const{api:o}=M(),l=Z(),{data:d,error:y,execute:b}=([u,_]=P(()=>R().GetAll(`${o.NationalitiesGetAllApi}`)),u=await u,_(),u),{data:v,error:f,execute:E}=([u,_]=P(()=>R().GetAll(o.CountriesGetAllApi)),u=await u,_(),u);return(y.value&&y.value.statusCode==401||f.value&&f.value.statusCode==401)&&([u,_]=P(()=>le().reAuthorize()),await u,_()),ee(()=>{d.value||b(),v.value||E()}),(t,a)=>{const p=Ce,c=ol;return m(),h("main",null,[i(l)=="Person"&&i(d)&&i(v)?(m(),B(p,{key:0,nationalities:i(d),countries:i(v)},null,8,["nationalities","countries"])):D("",!0),i(l)=="Company"&&i(d)&&i(v)?(m(),B(c,{key:1,nationalities:i(d),countries:i(v)},null,8,["nationalities","countries"])):D("",!0)])}}};export{cl as default};