"use strict";(self.webpackChunkstock_analysis=self.webpackChunkstock_analysis||[]).push([[592],{7826:(S,u,a)=>{a.d(u,{$:()=>g});var l=a(8966),t=a(5e3),_=a(7423);let g=(()=>{class c{constructor(n,e){this.dialogRef=n,this.data=e,this.title=e.title,this.message=e.message}onConfirm(){this.dialogRef.close(!0)}onDismiss(){this.dialogRef.close(!1)}}return c.\u0275fac=function(n){return new(n||c)(t.Y36(l.so),t.Y36(l.WI))},c.\u0275cmp=t.Xpm({type:c,selectors:[["app-name"]],decls:10,vars:2,consts:[["mat-dialog-title",""],["mat-dialog-content",""],["mat-dialog-actions",""],["mat-button","",3,"click"],["mat-raised-button","","color","primary",3,"click"]],template:function(n,e){1&n&&(t.TgZ(0,"h1",0),t._uU(1),t.qZA(),t.TgZ(2,"div",1)(3,"p"),t._uU(4),t.qZA()(),t.TgZ(5,"div",2)(6,"button",3),t.NdJ("click",function(){return e.onDismiss()}),t._uU(7,"No"),t.qZA(),t.TgZ(8,"button",4),t.NdJ("click",function(){return e.onConfirm()}),t._uU(9,"Yes"),t.qZA()()),2&n&&(t.xp6(1),t.hij(" ",e.title,"\n"),t.xp6(3),t.Oqu(e.message))},directives:[l.uh,l.xY,l.H8,_.lW],styles:[""]}),c})()},4087:(S,u,a)=>{a.d(u,{K:()=>c});var l=a(1135),t=a(4437),_=a(5e3),g=a(4073);let c=(()=>{class o{constructor(e){this.ls=e,this.analysis$=new l.X([]),this.initLS(),this.emit()}set(e){this.ls.set(t.P.ANALYSIS,e),this.emit()}add(e){const s=this.get();s.unshift(e),this.set(s)}update(e){const s=this.get(),d=s.findIndex(f=>f.id===e.id);s[d]=e,this.set(s)}deleteParameter(e,s){const d=this.get(),f=d.findIndex(i=>i.id===e.id),h=d[f].parameters.findIndex(i=>i.id===s);d[f].parameters.splice(h,1),this.set(d)}getById(e){return this.analysis$.value.find(s=>s.id===e)}getByStrategyId(e){return this.analysis$.value.filter(s=>s.strategyId===e)}delete(e){const s=this.get(),d=s.findIndex(f=>f.id===e.id);d>-1&&s.splice(d,1),this.set(s)}get(){return this.ls.get(t.P.ANALYSIS)}initLS(){this.ls.get(t.P.ANALYSIS)||this.ls.set(t.P.ANALYSIS,[])}emit(){this.analysis$.next(this.ls.get(t.P.ANALYSIS))}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(g.n))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},4073:(S,u,a)=>{a.d(u,{n:()=>t});var l=a(5e3);let t=(()=>{class _{get(c){return JSON.parse(localStorage.getItem(c))}set(c,o){return localStorage.setItem(c,JSON.stringify(o))}}return _.\u0275fac=function(c){return new(c||_)},_.\u0275prov=l.Yz7({token:_,factory:_.\u0275fac,providedIn:"root"}),_})()},7264:(S,u,a)=>{a.d(u,{D:()=>c});var l=a(1135),t=a(4437),_=a(5e3),g=a(4073);let c=(()=>{class o{constructor(e){this.ls=e,this.strategies$=new l.X([]),this.initLS(),this.emit()}set(e){this.ls.set(t.P.STRATEGIES,e),this.emit()}setDefaultStrategy(e){this.ls.set(t.P.DEFAULT_STRATEGY,e)}getDefaultStrategyId(){return this.ls.get(t.P.DEFAULT_STRATEGY)}add(e){const s=this.get();s.unshift(e),this.set(s)}getById(e){return this.strategies$.value.find(s=>s.id===e)}delete(e){const s=this.get(),d=s.findIndex(f=>f.id===e.id);d>-1&&s.splice(d,1),this.set(s)}get(){return this.ls.get(t.P.STRATEGIES)}initLS(){this.ls.get(t.P.STRATEGIES)||this.ls.set(t.P.STRATEGIES,[])}emit(){this.strategies$.next(this.ls.get(t.P.STRATEGIES))}}return o.\u0275fac=function(e){return new(e||o)(_.LFG(g.n))},o.\u0275prov=_.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},4437:(S,u,a)=>{a.d(u,{P:()=>_});const t=g=>"stock_analysis_app_"+g,_={STRATEGIES:t("strategies"),ANALYSIS:t("analysis"),SECURITIES:t("securities"),PARAMETERS:t("parameters"),INCLUDED_IN_ANALYSIS:t("securities_included_in_analysis"),DEFAULT_STRATEGY:t("default_strategy"),BALANCE:t("balance")}},1042:(S,u,a)=>{a.d(u,{Z:()=>h});var l,t=new Uint8Array(16);function _(){if(!l&&!(l="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(t)}const g=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,o=function c(i){return"string"==typeof i&&g.test(i)};for(var n=[],e=0;e<256;++e)n.push((e+256).toString(16).substr(1));const h=function f(i,r,m){var E=(i=i||{}).random||(i.rng||_)();if(E[6]=15&E[6]|64,E[8]=63&E[8]|128,r){m=m||0;for(var p=0;p<16;++p)r[m+p]=E[p];return r}return function s(i){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,m=(n[i[r+0]]+n[i[r+1]]+n[i[r+2]]+n[i[r+3]]+"-"+n[i[r+4]]+n[i[r+5]]+"-"+n[i[r+6]]+n[i[r+7]]+"-"+n[i[r+8]]+n[i[r+9]]+"-"+n[i[r+10]]+n[i[r+11]]+n[i[r+12]]+n[i[r+13]]+n[i[r+14]]+n[i[r+15]]).toLowerCase();if(!o(m))throw TypeError("Stringified UUID is invalid");return m}(E)}}}]);