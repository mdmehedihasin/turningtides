import{D as e,F as t,I as n,M as r,T as i,j as a,x as o}from"./vendor-three-CgwLE4H6.js";import{t as s}from"./engine-QGioku7S.js";import{n as c,r as l,t as u}from"./noise-C-y5qu5t.js";import{n as d}from"./KitScreen-DKQC9Ap_.js";function f(e){return{uTop:{value:new n(...e.top)},uMid:{value:new n(...e.mid)},uHorizon:{value:new n(...e.horizon)},uSun:{value:new n(...e.sun)},uSunPos:{value:new t(...e.sunPos)},uStars:{value:e.stars},uClouds:{value:e.clouds},uMist:{value:e.mist}}}function p(n,l,u,d={},f){let p=s({canvas:n,...u}),m={value:0},h=new t(1,1),g=new t(0,0),_={uTime:m,uRes:{value:h},uPointer:{value:g},...d},v=new r({vertexShader:c,fragmentShader:l,uniforms:_}),y=new e(2,2),b=new a;b.add(new o(y,v));let x=new i(-1,1,1,-1,0,1),S=new t;return p.start(b,x,e=>{m.value=e.time+3,h.set(e.width,e.height),g.lerp(S.set(e.pointer.x,e.pointer.y),.06),f?.(e,_)}),()=>{y.dispose(),v.dispose(),p.dispose()}}var m=`
float waterHeight(vec2 p, float t, vec2 flow) {
  vec2 q = p + flow * t;
  float h = fbm(q * 3.0 + vec2(fbm(q * 1.3 + t * 0.05), fbm(q * 1.7 - t * 0.04)));
  h += 0.35 * sin(p.x * 22.0 + t * 1.4 + fbm(p * 4.0) * 6.0) * 0.12;
  return h;
}
vec3 waterNormal(vec2 p, float t, vec2 flow) {
  float e = 0.004;
  float h = waterHeight(p, t, flow);
  float hx = waterHeight(p + vec2(e, 0.0), t, flow) - h;
  float hy = waterHeight(p + vec2(0.0, e), t, flow) - h;
  return normalize(vec3(-hx * 14.0, -hy * 14.0, 1.0));
}
`,h=`
${u}
${l}
${d}
${m}
uniform vec2 uFlow;
void main() {
  float aspect = uRes.x / uRes.y;
  float horizon = 0.56;
  if (vUv.y > horizon) {
    vec2 suv = vec2(vUv.x, (vUv.y - horizon) / (1.0 - horizon));
    gl_FragColor = vec4(skyColour(suv, aspect, uTime), 1.0);
    return;
  }
  float depth = (horizon - vUv.y) / horizon;
  float persp = 1.0 / (depth + 0.06);
  vec2 p = vec2((vUv.x - 0.5) * aspect * persp * 0.35, persp * 0.6);
  vec3 n = waterNormal(p, uTime, uFlow);
  vec2 refl = vec2(vUv.x + n.x * 0.06, clamp(0.12 + (0.5 - depth) * 0.3 + n.y * 0.08, 0.02, 0.98));
  vec3 sky = skyColour(refl, aspect, uTime);
  float fres = pow(1.0 - clamp(depth, 0.0, 1.0), 3.0) * 0.6 + 0.25;
  vec3 deep = vec3(0.01, 0.07, 0.09);
  vec3 col = mix(deep, sky, fres);
  vec2 sunDir = vec2((uSunPos.x - vUv.x) * aspect, 0.0);
  float glint = pow(max(0.0, 1.0 - length(sunDir) * 1.4), 6.0) * pow(max(0.0, n.y + 0.4), 24.0);
  col += uSun * glint * 2.4;
  float sparkle = step(0.985, hash21(floor(p * 90.0) + floor(uTime * 6.0))) * pow(max(0.0, n.x + n.y), 4.0);
  col += uSun * sparkle * 0.6 * (1.0 - depth);
  col = mix(col, uHorizon, exp(-depth * 12.0) * 0.55);
  gl_FragColor = vec4(col, 1.0);
}
`;export{f as i,h as n,p as r,m as t};