// Aurora behind the hero, drawn with WebGPU by the Shaders library (shaders.com, MIT).
// Without WebGPU nothing is added and the hero keeps its plain slate background.
// With reduced motion the first frame is shown and the animation stops.
import { createShader } from 'shaders/js';
import { componentDefinition as SolidColor } from 'S/SolidColor/index.js';
import { componentDefinition as Aurora } from 'S/Aurora/index.js';
import { componentDefinition as FilmGrain } from 'S/FilmGrain/index.js';

const SLATE = '#262936', CORAL = '#df5c65', PEACH = '#e8ab92';

const layers = [
  { type: 'SolidColor', props: { color: SLATE } },
  { type: 'Aurora', props: { colorA: CORAL, colorB: PEACH, colorC: '#7a4f8c', intensity: 38, curtainCount: 3, speed: 2, waviness: 40, height: 90, center: { x: 0.7, y: 0.1 }, opacity: 0.75, seed: 2 } },
  { type: 'FilmGrain', props: { strength: 0.06 } },
];

const hero = document.querySelector('.hero');
if (hero && 'gpu' in navigator) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-shader';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let shader;
  createShader(canvas, { components: layers }, {
    components: [SolidColor, Aurora, FilmGrain],
    disableTelemetry: true,
    onReady: () => { canvas.classList.add('is-on'); if (still) setTimeout(() => shader?.pause(), 100); },
    onError: () => canvas.remove(),
  }).then((s) => { shader = s; }, () => canvas.remove());
}
