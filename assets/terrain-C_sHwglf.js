import{r as e}from"./noise-C-y5qu5t.js";import{n as t}from"./KitScreen-DKQC9Ap_.js";import{t as n}from"./water-DyitxQFZ.js";var r=`
uniform sampler2D uHeight;
uniform sampler2D uWater;
uniform float uRelief;
varying vec2 vUv;
varying vec3 vWorld;
void main() {
  vUv = uv;
  float h = texture2D(uHeight, uv).r;
  float w = texture2D(uWater, uv).r;
  vec3 p = position;
  p.y += (h - 0.5) * uRelief - w * uRelief * 0.5;
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,i=`
uniform float uTime;
uniform sampler2D uColour;
uniform sampler2D uWater;
uniform sampler2D uHeight;
uniform vec2 uTexel;
uniform float uFogFar;
varying vec2 vUv;
varying vec3 vWorld;
${e}
${t}
${n}
vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }
void main() {
  vec3 base = toLinear(texture2D(uColour, vUv).rgb);
  float w = smoothstep(0.35, 0.65, texture2D(uWater, vUv).r);
  float hl = texture2D(uHeight, vUv - vec2(uTexel.x, 0.0)).r;
  float hr = texture2D(uHeight, vUv + vec2(uTexel.x, 0.0)).r;
  float hd = texture2D(uHeight, vUv - vec2(0.0, uTexel.y)).r;
  float hu = texture2D(uHeight, vUv + vec2(0.0, uTexel.y)).r;
  vec3 nLand = normalize(vec3((hl - hr) * 2.0, 1.0, (hd - hu) * 2.0));
  vec3 sunDir = normalize(vec3(uSunPos.x - 0.5, 0.35 + uSunPos.y, -0.6));
  float diffuse = clamp(dot(nLand, sunDir), 0.0, 1.0);
  vec3 sunLin = toLinear(uSun);
  vec3 land = base * (0.72 + 0.4 * diffuse) * mix(vec3(1.0), sunLin * 1.2, 0.22);
  vec3 viewDir = normalize(cameraPosition - vWorld);
  vec2 wp = vWorld.xz * 0.9;
  vec3 wn = waterNormal(wp, uTime * 0.6, vec2(0.05, 0.02));
  vec3 n = normalize(vec3(wn.x * 0.4, 1.0, wn.y * 0.4));
  vec3 r = reflect(-viewDir, n);
  vec2 skyUv = vec2(atan(r.x, -r.z) / 6.2831 + 0.5, clamp(r.y * 1.4, 0.0, 1.0));
  vec3 sky = toLinear(skyColour(skyUv, 2.0, uTime));
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(viewDir, n), 0.0), 5.0);
  vec3 waterCol = mix(base * 0.45 + vec3(0.0, 0.012, 0.018), sky * 0.8, clamp(fres * 1.1, 0.0, 0.85));
  float spec = pow(max(dot(reflect(-sunDir, n), viewDir), 0.0), 220.0);
  waterCol += sunLin * spec * 3.5;
  float shimmer = step(0.992, hash21(floor(vWorld.xz * 60.0) + floor(uTime * 5.0)));
  waterCol += sunLin * shimmer * 0.5 * w;
  vec3 col = mix(land, waterCol, w);
  float dist = length(cameraPosition - vWorld);
  float fog = smoothstep(uFogFar * 0.25, uFogFar, dist);
  vec3 haze = toLinear(uHorizon) * 0.9;
  col = mix(col, haze, fog * 0.8);
  float edge = smoothstep(0.0, 0.1, vUv.x) * smoothstep(1.0, 0.9, vUv.x) * smoothstep(0.0, 0.1, vUv.y) * smoothstep(1.0, 0.9, vUv.y);
  col = mix(haze, col, edge);
  gl_FragColor = vec4(pow(col, vec3(1.0 / 2.2)), 1.0);
}
`,a=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,o=`
uniform float uTime;
varying vec3 vDir;
${e}
${t}
void main() {
  vec2 uv = vec2(atan(vDir.x, -vDir.z) / 6.2831 + 0.5, clamp(vDir.y * 2.4, 0.0, 1.0));
  gl_FragColor = vec4(skyColour(uv, 2.0, uTime), 1.0);
}
`,s=`
uniform float uTime;
uniform float uSize;
attribute float aSeed;
varying float vAlpha;
void main() {
  vec3 p = position;
  p.x += sin(uTime * 0.4 + aSeed * 12.0) * 0.03;
  p.y += 0.02 + 0.02 * sin(uTime * 0.9 + aSeed * 30.0);
  p.z += cos(uTime * 0.3 + aSeed * 9.0) * 0.03;
  vAlpha = 0.35 + 0.65 * pow(0.5 + 0.5 * sin(uTime * 2.2 + aSeed * 50.0), 3.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_PointSize = uSize / -mv.z;
  gl_Position = projectionMatrix * mv;
}
`,c=`
uniform vec3 uColour;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColour * (a * a) * 1.6, a * vAlpha);
}
`;export{i as a,a as i,s as n,r as o,o as r,c as t};