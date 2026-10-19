// Aurora behind the hero, and a faint echo of it in the contact section, drawn with WebGPU
// by the Shaders library (shaders.com, MIT). Both canvases share one GPU device.
// Without WebGPU nothing is added and the sections keep their plain backgrounds.
// With reduced motion the first frame is shown and the animation stops.
import { createShader } from 'shaders/js';
import { componentDefinition as SolidColor } from 'S/SolidColor/index.js';
import { componentDefinition as Aurora } from 'S/Aurora/index.js';
import { componentDefinition as FilmGrain } from 'S/FilmGrain/index.js';

const SLATE = '#262936', PAPER = '#f4f5f8', CORAL = '#df5c65', PEACH = '#e8ab92', PLUM = '#7a4f8c';

const invert = (hex) => '#' + (0xffffff ^ parseInt(hex.slice(1), 16)).toString(16).padStart(6, '0');

const scenes = [
  ['.hero', [
    { type: 'SolidColor', props: { color: SLATE } },
    { type: 'Aurora', props: { colorA: CORAL, colorB: PEACH, colorC: PLUM, intensity: 38, curtainCount: 3, speed: 2, waviness: 40, height: 90, center: { x: 0.7, y: 0.1 }, opacity: 0.75, seed: 2 } },
    { type: 'FilmGrain', props: { strength: 0.06 } },
  ]],
  // The aurora is a glow made for dark backgrounds. On the light contact section it is drawn
  // in inverted colours and flipped back with CSS (filter: invert), so paper stays paper and the
  // curtains come out as coral and peach tints instead of grey.
  ['.contact', [
    { type: 'SolidColor', props: { color: invert(PAPER) } },
    { type: 'Aurora', props: { colorA: invert(CORAL), colorB: invert(PEACH), colorC: invert(PLUM), intensity: 45, curtainCount: 3, speed: 1.5, waviness: 40, height: 90, center: { x: 0.75, y: 0.05 }, opacity: 0.6, seed: 5 } },
  ], 'is-inverted'],
];

const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

function mount(section, layers, extraClass) {
  const canvas = document.createElement('canvas');
  canvas.className = 'section-shader' + (extraClass ? ' ' + extraClass : '');
  canvas.setAttribute('aria-hidden', 'true');
  // Inline 100% sizes stop the library from pinning the canvas to its first pixel size, so it follows resizes
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  section.prepend(canvas);
  let shader;
  createShader(canvas, { components: layers }, {
    components: [SolidColor, Aurora, FilmGrain],
    disableTelemetry: true,
    onReady: () => { canvas.classList.add('is-on'); if (still) setTimeout(() => shader?.pause(), 100); },
    onError: (reason) => off(reason),
  }).then((s) => { shader = s; }, (err) => off(err?.message || err));
  // Leaves a note in the browser console so a missing aurora can be explained
  function off(reason) { console.info('Aurora not shown:', reason); canvas.remove(); }
}

if (!('gpu' in navigator)) {
  console.info('Aurora not shown: this browser has no WebGPU');
} else {
  for (const [selector, layers, extraClass] of scenes) {
    const section = document.querySelector(selector);
    if (section) mount(section, layers, extraClass);
  }
}
