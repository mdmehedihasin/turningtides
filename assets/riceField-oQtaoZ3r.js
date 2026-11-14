import{D as e,E as t,M as n,N as r,_ as i,c as a,f as o,g as s,j as c,w as l,x as u}from"./vendor-three-CgwLE4H6.js";import{t as d}from"./engine-QGioku7S.js";import{i as f}from"./water-DyitxQFZ.js";import{p}from"./main-DgH5ZSUw.js";import{r as m}from"./noise-C-y5qu5t.js";import{i as h}from"./KitScreen-DKQC9Ap_.js";import{i as g,r as _}from"./terrain-C_sHwglf.js";var v=`
uniform float uTime;
attribute float aPhase;
attribute float aTone;
varying float vH;
varying float vTone;
varying float vDepth;
${m}
void main() {
  vec3 p = position;
  vH = uv.y;
  vTone = aTone;
  vec4 world = instanceMatrix * vec4(p, 1.0);
  float gust = fbm(world.xz * 0.12 + vec2(uTime * 0.25, 0.0));
  float bend = (0.35 + gust * 0.9) * vH * vH;
  world.x += sin(uTime * 1.6 + aPhase) * 0.08 * bend + bend * 0.22;
  world.z += cos(uTime * 1.2 + aPhase) * 0.04 * bend;
  world.y -= bend * 0.08;
  vec4 view = viewMatrix * modelMatrix * world;
  vDepth = -view.z;
  gl_Position = projectionMatrix * view;
}
`,y=`
uniform vec3 uBase;
uniform vec3 uTip;
uniform vec3 uSun;
uniform vec3 uHaze;
varying float vH;
varying float vTone;
varying float vDepth;
void main() {
  vec3 col = mix(uBase, uTip, smoothstep(0.1, 1.0, vH));
  col *= 0.65 + 0.45 * vTone;
  col += uSun * pow(vH, 5.0) * 0.55;
  col = mix(col, uHaze, smoothstep(3.0, 19.0, vDepth));
  gl_FragColor = vec4(col, 1.0);
}
`;function b(){let t=new e(.035,.9,1,4);t.translate(0,.45,0);let n=t.getAttribute(`position`);for(let e=0;e<n.count;e+=1){let t=n.getY(e);n.setX(e,n.getX(e)*(1-t/.95))}return t}function x(m,x){let S=d({canvas:m,maxDpr:x.maxDpr,animate:x.animate,preserve:x.preserve??!1}),C=new c,w=new t(38,1,.05,200),T=h[x.sky],E={value:0},D=new r(90,48,24),O=new n({vertexShader:g,fragmentShader:_,uniforms:{...f(T),uTime:E},side:1,depthWrite:!1});C.add(new u(D,O));let k=new e(200,200);k.rotateX(-Math.PI/2);let A=new n({vertexShader:`varying float vDepth; void main(){ vec4 v = modelViewMatrix * vec4(position, 1.0); vDepth = -v.z; gl_Position = projectionMatrix * v; }`,fragmentShader:`uniform vec3 uGround; uniform vec3 uHaze; varying float vDepth; void main(){ gl_FragColor = vec4(mix(uGround, uHaze, smoothstep(3.0, 19.0, vDepth)), 1.0); }`,uniforms:{uGround:{value:new a(x.ripe?`#2a1e08`:`#08140a`)},uHaze:{value:new a(...T.horizon).multiplyScalar(.85)}}});C.add(new u(k,A));let j=b(),M=new n({vertexShader:v,fragmentShader:y,uniforms:{uTime:E,uBase:{value:new a(x.ripe?`#3d4a12`:`#123d1a`)},uTip:{value:new a(x.ripe?`#f2c14e`:`#7fd35a`)},uSun:{value:new a(...T.sun)},uHaze:{value:new a(...T.horizon).multiplyScalar(.85)}}}),N=new i(j,M,x.count);N.instanceMatrix.setUsage(o);let P=p(1988),F=new l,I=new Float32Array(x.count),L=new Float32Array(x.count);for(let e=0;e<x.count;e+=1){let t=Math.floor(P()*64);F.position.set((P()-.5)*26,0,-t*.32-P()*.18+2),F.rotation.set(0,P()*Math.PI,(P()-.5)*.3),F.scale.setScalar(.7+P()*.6),F.updateMatrix(),N.setMatrixAt(e,F.matrix),I[e]=P()*Math.PI*2,L[e]=P()}return j.setAttribute(`aPhase`,new s(I,1)),j.setAttribute(`aTone`,new s(L,1)),C.add(N),S.onResize((e,t)=>{w.aspect=e/t,w.updateProjectionMatrix()}),S.start(C,w,e=>{E.value=e.time+2;let t=Math.sin(e.time*.05)*.6;w.position.set(t+e.pointer.x*.3,1.05+e.pointer.y*.12,3.4),w.lookAt(t*.6,.7,-6)}),()=>{for(let e of[D,O,k,A,j,M])e.dispose();N.dispose(),S.dispose()}}export{x as mountRice};