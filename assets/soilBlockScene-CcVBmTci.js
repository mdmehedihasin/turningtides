import{C as e,D as t,E as n,M as r,S as i,_ as a,c as o,d as s,h as c,i as l,j as u,k as d,l as f,m as p,p as m,r as h,t as g,u as _,v,w as y,x as b,y as x}from"./vendor-three-CgwLE4H6.js";import{t as S}from"./engine-QGioku7S.js";import{r as C}from"./noise-C-y5qu5t.js";import{i as w,n as T,r as E}from"./CropScreen-BkSKnAKh.js";var D=`
varying vec3 vPos;
varying vec3 vNormal;
void main() {
  vPos = position;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,O=`
uniform vec3 uColour;
uniform float uGrain;
uniform float uWet;
varying vec3 vPos;
varying vec3 vNormal;
${C}
void main() {
  vec3 p = vPos * 9.0;
  float clod = fbm(p.xz + p.y * 1.7);
  float band = fbm(vec2(vPos.y * 14.0, vPos.x * 2.0 + vPos.z * 2.0));
  float speck = step(1.0 - uGrain * 0.22, hash21(floor(vPos.xy * 160.0) + floor(vPos.z * 160.0) * 1.37));
  vec3 c = uColour * (0.78 + clod * 0.34) * (0.92 + band * 0.12);
  c = mix(c, vec3(0.86, 0.78, 0.62), speck * 0.55);
  float top = step(0.5, vNormal.y);
  c *= mix(1.0, 0.72 - uWet * 0.12, top);
  float side = abs(vNormal.x) * 0.12;
  c *= 1.0 - side;
  gl_FragColor = vec4(c, 1.0);
}`;function k(e){let t=[],n=(e,n,r,i)=>{let a=new f(n,e,3,1,!0);a.translate(0,e/2,0),a.rotateZ(i),a.rotateY(r),t.push(a)},r=(e,n,r,i)=>{let a=new c(e,0);a.scale(1,.35,.6),a.translate(e*.9,n,0),a.rotateZ(i),a.rotateY(r),t.push(a)};if(e===`grass`||e===`cane`){let t=e===`cane`?3:7,r=e===`cane`?.62:.34;for(let e=0;e<t;e+=1)n(r*(.75+e%3*.12),.012,e/t*Math.PI*2,.18)}else if(e===`tree`){let e=new _(.018,.026,.3,6);e.translate(0,.15,0),t.push(e);let n=new c(.15,1);n.translate(0,.38,0),t.push(n)}else{let t=e===`vine`?5:e===`rosette`?7:9,i=e===`vine`?.08:e===`rosette`?.075:.065;for(let n=0;n<t;n+=1)r(i,e===`bush`?.05+n%3*.05:.02,n/t*Math.PI*2,e===`bush`?.5:.15);e===`bush`&&n(.2,.012,0,0)}let i=g(t.map(e=>e.toNonIndexed()));for(let e of t)e.dispose();return i}function A({canvas:c,model:f,animate:g,maxDpr:_,lightColour:C}){let A=S({canvas:c,maxDpr:_,animate:g,alpha:!0}),j=new u,M=new n(30,1,.1,50);M.position.set(3.4,2.2,4.3),M.lookAt(0,-.82,0),j.add(new h(16777215,.75));let N=new s(16773590,1.6);N.position.set(3,5,2),j.add(N);let P=new p;j.add(P);let F=new r({vertexShader:D,fragmentShader:O,uniforms:{uColour:{value:new o(...f.colour)},uGrain:{value:f.grain},uWet:{value:+!!f.wet}}}),I=new b(new l(1.6,.6,1.6),F);I.position.y=-.3,P.add(I);let L=new l(1.6,.5,1.6);L.translate(0,-.86,0);let R=new x(new m(L),new v({color:9345699,transparent:!0,opacity:.45}));P.add(R);let z=new o(C),B=new b(new d(1.18,1.23,96),new i({color:z,transparent:!0,opacity:.85,side:2}));if(B.rotation.x=-Math.PI/2,B.position.y=-1.12,P.add(B),f.wet){let n=new b(new t(1.6,1.6),new e({color:4183784,transparent:!0,opacity:.28,roughness:.1,metalness:.2}));n.rotation.x=-Math.PI/2,n.position.y=.025,P.add(n)}let V=w(T[f.plant],7),H=new a(k(f.plant),new e({color:6018154,roughness:.7,flatShading:!0}),V.length);P.add(H);let U=new y,W=e=>{V.forEach(([t,n],r)=>{let i=E(e*1.25-r/V.length*.25);U.position.set(t*1.6,0,n*1.6),U.rotation.y=r*2.39,U.scale.set(.4+i*.6,Math.max(.001,i),.4+i*.6),U.updateMatrix(),H.setMatrixAt(r,U.matrix)}),H.instanceMatrix.needsUpdate=!0},G=.6,K=null,q=e=>{K={x:e.clientX,turn:G},c.setPointerCapture(e.pointerId)},J=e=>{K&&(G=K.turn+(e.clientX-K.x)*.012)},Y=()=>{K=null};return c.addEventListener(`pointerdown`,q),c.addEventListener(`pointermove`,J),c.addEventListener(`pointerup`,Y),c.addEventListener(`pointercancel`,Y),A.onResize((e,t)=>{M.aspect=e/t,M.updateProjectionMatrix()}),A.start(j,M,({time:e,delta:t,pointer:n})=>{let r=g?Math.min(1,e/1.8):1;W(r);let i=g?E(e/.9):1;P.position.y=(1-i)*-.6,g&&!K&&(G+=t*.16),P.rotation.y=G+(g?n.x*.08:0),P.rotation.x=g?-n.y*.04:0,B.scale.setScalar(1+(g?Math.sin(e*1.6)*.015:0))}),()=>{c.removeEventListener(`pointerdown`,q),c.removeEventListener(`pointermove`,J),c.removeEventListener(`pointerup`,Y),c.removeEventListener(`pointercancel`,Y),j.traverse(e=>{if(!(e instanceof b||e instanceof x))return;e.geometry.dispose();let t=e.material;if(Array.isArray(t))for(let e of t)e.dispose();else t.dispose()}),L.dispose(),A.dispose()}}export{A as mountSoilBlock};