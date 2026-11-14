import{I as e}from"./vendor-three-CgwLE4H6.js";import{i as t,n,r}from"./water-DyitxQFZ.js";import{r as i,t as a}from"./noise-C-y5qu5t.js";import{i as o,n as s,r as c}from"./KitScreen-DKQC9Ap_.js";var l=`
${a}
${i}
uniform vec3 uBg;
void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y);
  vec3 col = uBg;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float y = 0.55 + 0.18 * sin(p.x * (1.2 + fi * 0.4) + uTime * (0.07 + fi * 0.03) + fi * 2.0)
              + 0.12 * fbm(vec2(p.x * 1.5 + uTime * 0.05, fi * 4.0));
    float band = exp(-pow((p.y - y) * (6.0 + fi * 2.0), 2.0));
    float curtain = 0.6 + 0.4 * fbm(vec2(p.x * 9.0 + fi, uTime * 0.2));
    vec3 tint = fi < 0.5 ? vec3(0.25, 0.84, 0.91) : (fi < 1.5 ? vec3(0.71, 1.0, 0.23) : vec3(0.96, 0.76, 0.36));
    col += tint * band * curtain * (0.34 - fi * 0.07);
  }
  vec2 m = uPointer * 0.5 + 0.5;
  col += vec3(0.25, 0.84, 0.91) * 0.12 * exp(-length((vUv - m) * vec2(aspect, 1.0)) * 3.0);
  col += (hash21(vUv * uRes + uTime) - 0.5) * 0.025;
  gl_FragColor = vec4(col, 1.0);
}
`,u=`
${a}
${i}
uniform float uSalt;
void main() {
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(vUv.x * aspect, vUv.y) * 5.0;
  vec3 v = voronoi(p + fbm(p * 0.7) * 0.4);
  float crack = smoothstep(0.08, 0.0, v.y - v.x);
  float plate = fbm(p * 2.5 + v.z * 10.0);
  vec3 clay = mix(vec3(0.36, 0.25, 0.17), vec3(0.6, 0.45, 0.3), plate);
  clay *= 0.78 + 0.22 * v.z;
  vec2 light = (uPointer * 0.5 + 0.5) * vec2(aspect, 1.0) * 5.0;
  float shade = 0.75 + 0.35 * exp(-length(p - light) * 0.22);
  vec3 col = clay * shade;
  col = mix(col, vec3(0.07, 0.04, 0.03), crack);
  float saltField = smoothstep(0.45, 0.8, fbm(p * 1.3 + 3.0)) * uSalt;
  vec2 g = p * 26.0;
  vec2 cell = floor(g);
  float r = hash21(cell);
  vec2 f = fract(g) - 0.5;
  float crystal = smoothstep(0.22, 0.0, max(abs(f.x), abs(f.y)) - 0.05 * r) * step(0.55, r);
  float glint = pow(max(0.0, sin(uTime * 2.4 + r * 31.0)), 18.0);
  col = mix(col, vec3(0.92, 0.94, 0.9), saltField * crystal * 0.85);
  col += vec3(1.0, 1.0, 0.95) * saltField * crystal * glint * 1.4;
  col = mix(col, vec3(0.86, 0.86, 0.8), saltField * 0.18 * (1.0 - crack));
  float vig = smoothstep(1.2, 0.3, length(vUv - 0.5));
  gl_FragColor = vec4(col * (0.55 + 0.45 * vig), 1.0);
}
`,d=`
${a}
${i}
${s}
void main() {
  float aspect = uRes.x / uRes.y;
  vec3 col = skyColour(vUv, aspect, uTime);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float base = 0.18 + fi * 0.09;
    float ridge = base + 0.05 * fbm(vec2(vUv.x * (3.0 + fi) + fi * 3.1, fi));
    vec3 layer = mix(uHorizon, uMid, 0.25 + fi * 0.12) * (0.55 - fi * 0.08);
    float inside = smoothstep(ridge + 0.004, ridge, vUv.y);
    col = mix(col, layer, inside * 0.92);
    float m = fbm(vec2(vUv.x * 2.0 - uTime * (0.015 + fi * 0.006), vUv.y * 6.0 + fi));
    float band = exp(-pow((vUv.y - ridge + 0.02) * 9.0, 2.0));
    col = mix(col, uHorizon + 0.08, band * m * 0.55);
  }
  gl_FragColor = vec4(col, 1.0);
}
`,f=`
${a}
${i}
float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}
float boat(vec2 p) {
  vec2 q = p;
  q.y += q.x * q.x * 1.6;
  float hull = sdBox(q, vec2(0.16, 0.018));
  float cabin = sdBox(p - vec2(-0.02, 0.035), vec2(0.06, 0.028)) - 0.01;
  float mast = sdBox(p - vec2(0.09, 0.06), vec2(0.003, 0.06));
  return min(min(hull, cabin), mast);
}
void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = vUv;
  float horizon = 0.42;
  vec2 sp = vec2(uv.x * aspect, uv.y);
  vec3 col = mix(vec3(0.02, 0.07, 0.09), vec3(0.0, 0.01, 0.03), smoothstep(horizon, 1.0, uv.y));
  float band = exp(-pow((uv.y - 0.78 + (uv.x - 0.5) * 0.4) * 5.0, 2.0));
  col += vec3(0.05, 0.12, 0.14) * band * fbm(sp * 3.0);
  vec2 sg = sp * 220.0;
  float s = hash21(floor(sg));
  float tw = 0.5 + 0.5 * sin(uTime * 1.7 + s * 60.0);
  col += vec3(step(0.997, s) * tw) * smoothstep(horizon, horizon + 0.1, uv.y);
  float treeLine = horizon + 0.03 * fbm(vec2(uv.x * 14.0, 1.0)) + 0.012 * sin(uv.x * 40.0);
  if (uv.y < treeLine && uv.y > horizon) col = vec3(0.005, 0.02, 0.025);
  vec2 bp = vec2((uv.x - 0.5 - sin(uTime * 0.05) * 0.08) * aspect, uv.y - horizon + 0.035);
  float b = boat(bp * 1.4);
  vec2 lamp = vec2(0.09, 0.075) / 1.4;
  float lampGlow = exp(-length(bp - lamp) * 26.0) * (0.85 + 0.15 * sin(uTime * 5.0));
  if (uv.y < horizon) {
    float d = (horizon - uv.y) / horizon;
    vec2 wp = vec2(uv.x * aspect * 6.0, 1.0 / (d + 0.05));
    float w = fbm(wp + vec2(uTime * 0.15, 0.0));
    vec2 ruv = vec2(uv.x + (w - 0.5) * 0.02, horizon + (horizon - uv.y));
    vec2 rsp = vec2(ruv.x * aspect, ruv.y);
    float rs = hash21(floor(rsp * 220.0));
    col = vec3(0.01, 0.04, 0.05) + vec3(step(0.997, rs)) * 0.35 * (1.0 - d);
    vec2 rb = vec2(bp.x, -(uv.y - horizon) - 0.035 + (w - 0.5) * 0.01);
    float rlamp = exp(-length(vec2(rb.x - lamp.x, (rb.y + lamp.y) * 0.35)) * 18.0);
    col += vec3(1.0, 0.72, 0.34) * rlamp * 0.7 * (0.7 + 0.3 * w);
    col += vec3(0.0, 0.08, 0.09) * smoothstep(0.4, 0.8, w) * (1.0 - d);
  } else {
    col = mix(col, vec3(0.0), smoothstep(0.004, 0.0, b));
    col += vec3(1.0, 0.72, 0.34) * lampGlow;
  }
  gl_FragColor = vec4(col, 1.0);
}
`,p=`
${a}
${i}
uniform float uRain;
uniform float uFlash;
float streaks(vec2 uv, float t, float scale, float speed, float seed) {
  vec2 p = uv * vec2(scale, scale * 0.12);
  p.x += p.y * 0.18;
  p.y += t * speed;
  vec2 cell = floor(p);
  float r = hash21(cell + seed);
  vec2 f = fract(p);
  float line = smoothstep(0.06, 0.0, abs(f.x - r)) * smoothstep(0.0, 0.3, f.y) * smoothstep(1.0, 0.6, f.y);
  return line * step(0.55, r);
}
float ripples(vec2 uv, float t) {
  vec2 p = uv * vec2(18.0, 7.0);
  vec2 cell = floor(p);
  vec2 f = fract(p) - 0.5;
  float r = hash21(cell);
  float phase = fract(t * 0.9 + r);
  float ring = abs(length(f * vec2(1.0, 1.8)) - phase * 0.45);
  return smoothstep(0.03, 0.0, ring) * (1.0 - phase) * step(0.3, r);
}
void main() {
  float aspect = uRes.x / uRes.y;
  vec2 uv = vUv;
  float horizon = 0.3;
  vec2 cp = vec2(uv.x * aspect * 1.6 + uTime * 0.03, uv.y * 2.2 + uTime * 0.01);
  float cl = fbm(cp + fbm(cp * 0.6 + uTime * 0.02));
  vec3 cloudDark = vec3(0.03, 0.06, 0.09);
  vec3 cloudLit = vec3(0.22, 0.3, 0.4);
  vec3 col = mix(cloudDark, cloudLit, smoothstep(0.35, 0.85, cl) * smoothstep(horizon, 1.0, uv.y));
  float bolt = uFlash * (0.6 + 0.4 * fbm(vec2(uv.x * 8.0, uTime * 30.0)));
  col += vec3(0.55, 0.62, 0.85) * bolt * smoothstep(0.4, 0.95, cl);
  if (uv.y < horizon) {
    float d = (horizon - uv.y) / horizon;
    vec3 paddy = mix(vec3(0.04, 0.11, 0.08), vec3(0.08, 0.2, 0.18), d);
    paddy += vec3(0.3, 0.4, 0.5) * ripples(vec2(uv.x * aspect, d * 3.0), uTime) * uRain * (1.0 - d * 0.5);
    paddy += vec3(0.55, 0.62, 0.85) * bolt * 0.25 * (1.0 - d);
    col = paddy;
  }
  float rain = streaks(uv * vec2(aspect, 1.0), uTime, 60.0, 4.0, 1.0) * 0.55
             + streaks(uv * vec2(aspect, 1.0), uTime, 110.0, 6.5, 7.0) * 0.35;
  col += vec3(0.62, 0.74, 0.86) * rain * uRain;
  float mist = exp(-abs(uv.y - horizon) * 10.0) * 0.35;
  col = mix(col, vec3(0.16, 0.22, 0.28), mist);
  gl_FragColor = vec4(col, 1.0);
}
`;function m(e){let t=e%7.3;return t>.42?0:t<.08?1:t>.2&&t<.3?.7:.15}function h(i,a,s){let h=t(o[a.sky]),{canvas:g}=a;switch(i){case`water`:return r(g,n,s,{...h,uFlow:{value:[.04,0]}});case`storm`:return r(g,p,s,{uRain:{value:1},uFlash:{value:0}},(e,t)=>{let n=t.uFlash;n&&(n.value=s.animate?m(e.time):.4)});case`mist`:return r(g,d,s,t(o.dawn));case`night-river`:return r(g,f,s);case`clay`:return r(g,u,s,{uSalt:{value:a.salt??.8}});case`aurora`:return r(g,l,s,{uBg:{value:new e(.016,.05,.066)}});default:return r(g,c,s,h)}}export{h as mountFlat};