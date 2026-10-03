"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * Mesh-drift WebGL background matched to
 * https://21st.dev/@arauzolander/components/bue-drift
 * Palette: #031C26, #1B6CA8, #449DB6, #AFC6E1 · cursor spotlight.
 * 21st install needs API_KEY_21ST; this is a zero-dep recreation.
 */
const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAG = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_colors[4];

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

vec3 palette(float t) {
  vec3 c0 = u_colors[0];
  vec3 c1 = u_colors[1];
  vec3 c2 = u_colors[2];
  vec3 c3 = u_colors[3];
  t = clamp(t, 0.0, 1.0);
  if (t < 0.33) return mix(c0, c1, t / 0.33);
  if (t < 0.66) return mix(c1, c2, (t - 0.33) / 0.33);
  return mix(c2, c3, (t - 0.66) / 0.34);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * vec2(u_resolution.x / u_resolution.y, 1.0);
  float t = u_time * 0.07;

  float v = fbm(p * 2.2 + vec2(t * 0.32, -t * 0.2));
  float w = fbm(p * 1.05 - vec2(t * 0.16, t * 0.24) + v);
  float tone = 0.5 + 0.5 * sin(v * 3.8 + w * 2.4 + t);
  vec3 col = palette(tone);
  col = mix(col, u_colors[0], 0.22);

  // Cursor spotlight (bue-drift feature)
  vec2 m = u_mouse;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 mu = vec2(m.x * aspect, m.y);
  float d = length(p - mu);
  float spot = smoothstep(0.55, 0.05, d);
  col = mix(col, u_colors[3], spot * 0.35);
  col += u_colors[2] * spot * 0.12;

  gl_FragColor = vec4(col, 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
    const h = hex.replace("#", "")
    const n = parseInt(h, 16)
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const COLORS = ["#031C26", "#1B6CA8", "#449DB6", "#AFC6E1"].map(hexToRgb)

export function BueDrift({
    className,
    static: forceStatic = false,
}: {
    className?: string
    static?: boolean
}) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })

    useEffect(() => {
        const canvas = canvasRef.current
        const wrap = wrapRef.current
        if (!canvas || !wrap) return

        const gl = canvas.getContext("webgl", {
            alpha: false,
            antialias: false,
            preserveDrawingBuffer: true,
        })
        if (!gl) return

        const reduceMotion =
            forceStatic ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches

        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type)
            if (!shader) return null
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                gl.deleteShader(shader)
                return null
            }
            return shader
        }

        const vs = compile(gl.VERTEX_SHADER, VERT)
        const fs = compile(gl.FRAGMENT_SHADER, FRAG)
        if (!vs || !fs) return

        const program = gl.createProgram()
        if (!program) return
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
        gl.useProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW,
        )

        const aPos = gl.getAttribLocation(program, "a_position")
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uResolution = gl.getUniformLocation(program, "u_resolution")
        const uTime = gl.getUniformLocation(program, "u_time")
        const uMouse = gl.getUniformLocation(program, "u_mouse")
        const uColors = gl.getUniformLocation(program, "u_colors")
        gl.uniform3fv(uColors, new Float32Array(COLORS.flat()))

        let raf = 0
        const start = performance.now()

        const onMove = (e: PointerEvent) => {
            const rect = wrap.getBoundingClientRect()
            if (rect.width <= 0 || rect.height <= 0) return
            mouseRef.current = {
                x: (e.clientX - rect.left) / rect.width,
                y: 1 - (e.clientY - rect.top) / rect.height,
            }
        }
        wrap.addEventListener("pointermove", onMove, { passive: true })

        const resize = () => {
            const w = wrap.clientWidth
            const h = wrap.clientHeight
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            const width = Math.max(1, Math.floor(w * dpr))
            const height = Math.max(1, Math.floor(h * dpr))
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
            }
            gl.viewport(0, 0, width, height)
            gl.uniform2f(uResolution, width, height)
        }

        const draw = (time: number) => {
            resize()
            gl.uniform1f(uTime, reduceMotion ? 0 : (time - start) / 1000)
            gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            if (!reduceMotion) raf = requestAnimationFrame(draw)
        }

        resize()
        draw(performance.now())

        const ro = new ResizeObserver(() => {
            if (reduceMotion) draw(performance.now())
        })
        ro.observe(wrap)

        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            wrap.removeEventListener("pointermove", onMove)
            gl.deleteBuffer(buffer)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
        }
    }, [forceStatic])

    return (
        <div
            ref={wrapRef}
            className={cn("pointer-events-auto absolute inset-0", className)}
            aria-hidden
        >
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        </div>
    )
}
