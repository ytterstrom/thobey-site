import { createShader } from 'shaders/js';
import { componentDefinition as MeshGradient } from 'S/MeshGradient/index.js';
import { componentDefinition as FilmGrain } from 'S/FilmGrain/index.js';
import { componentDefinition as SolidColor } from 'S/SolidColor/index.js';
import { componentDefinition as DotGrid } from 'S/DotGrid/index.js';
import { componentDefinition as CursorRipples } from 'S/CursorRipples/index.js';
import { componentDefinition as Aurora } from 'S/Aurora/index.js';
const defs = [MeshGradient, FilmGrain, SolidColor, DotGrid, CursorRipples, Aurora];

const SLATE = '#262936', CORAL = '#df5c65', PEACH = '#e8ab92';

const variants = {
  glow: [
    { type: 'SolidColor', props: { color: SLATE } },
    { type: 'MeshGradient', props: { opacity: 0.55,
      stops: [
        { color: SLATE, position: 0 }, { color: '#2e3142', position: 0.45 },
        { color: '#5a3a4a', position: 0.72 }, { color: CORAL, position: 0.9 }, { color: PEACH, position: 1 },
      ],
      colorSpace: 'oklab', count: 5, smoothness: 2.4, swirl: 0.25, drift: 0.45, speed: 0.35, seed: 3 } },
    { type: 'FilmGrain', props: { strength: 0.06 } },
  ],
  dots: [
    { type: 'SolidColor', props: { color: SLATE } },
    { type: 'DotGrid', props: { color: PEACH, density: 46, dotSize: 0.18, twinkle: 0.5, speed: 0.4, opacity: 0.45 } },
    { type: 'CursorRipples', props: { intensity: 14, decay: 6, radius: 0.6, chromaticSplit: 0 } },
  ],
  aurora: [
    { type: 'SolidColor', props: { color: SLATE } },
    { type: 'Aurora', props: { colorA: CORAL, colorB: PEACH, colorC: '#7a4f8c', intensity: 38, curtainCount: 3, speed: 2, waviness: 40, height: 90, center: { x: 0.7, y: 0.1 }, opacity: 0.75, seed: 2 } },
    { type: 'FilmGrain', props: { strength: 0.06 } },
  ],
};

const hero = document.querySelector('.hero');
const v = new URLSearchParams(location.search).get('v') || 'glow';
if (hero && variants[v] && 'gpu' in navigator) {
  const canvas = document.createElement('canvas');
  canvas.className = 'hero-shader';
  canvas.setAttribute('aria-hidden', 'true');
  hero.prepend(canvas);
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  createShader(canvas, { components: variants[v] }, {
    disableTelemetry: true,
    components: defs,
    onReady: () => { canvas.classList.add('is-on'); if (still) setTimeout(() => inst?.pause(), 100); },
    onError: (reason) => { console.warn('hero shader off:', reason); canvas.remove(); },
  }).then((s) => { inst = s; });
  var inst;
}
