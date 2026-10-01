"use client"

import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

type Point = { x: number; y: number }
type Edge = { a: number; b: number }
type Pulse = { edge: number; t: number; speed: number }

function buildGraph(w: number, h: number, spacing: number) {
    // Edge-aligned grid with half-cell inset so pads don't clip
    const inset = spacing / 2
    const cols = Math.max(2, Math.floor((w - inset * 2) / spacing) + 1)
    const rows = Math.max(2, Math.floor((h - inset * 2) / spacing) + 1)
    const gridW = (cols - 1) * spacing
    const gridH = (rows - 1) * spacing
    const ox = (w - gridW) / 2
    const oy = (h - gridH) / 2

    const nodes: Point[] = []
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            nodes.push({ x: ox + c * spacing, y: oy + r * spacing })
        }
    }

    const edges: Edge[] = []
    const idx = (r: number, c: number) => r * cols + c
    const chance = (p: number) => Math.random() < p

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (c + 1 < cols && chance(0.58)) {
                edges.push({ a: idx(r, c), b: idx(r, c + 1) })
            }
            if (r + 1 < rows && chance(0.58)) {
                edges.push({ a: idx(r, c), b: idx(r + 1, c) })
            }
            if (c + 1 < cols && r + 1 < rows && chance(0.18)) {
                edges.push({ a: idx(r, c), b: idx(r, c + 1) })
                edges.push({ a: idx(r, c + 1), b: idx(r + 1, c + 1) })
            }
        }
    }

    return { nodes, edges }
}

export function HeroBgCircuit() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useTheme()
    const reduceMotion = usePrefersReducedMotion()

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dark = resolvedTheme === "dark"
        const trace = dark ? "rgba(180, 200, 255, 0.22)" : "rgba(40, 70, 140, 0.28)"
        const pad = dark ? "rgba(200, 215, 255, 0.35)" : "rgba(30, 60, 120, 0.4)"
        const pulseColor = dark ? "rgba(120, 180, 255, 0.85)" : "rgba(47, 111, 237, 0.75)"

        let nodes: Point[] = []
        let edges: Edge[] = []
        let pulses: Pulse[] = []
        let raf = 0
        let disposed = false
        let cssW = 0
        let cssH = 0
        let pulseSpeedScale = 1

        const resize = () => {
            const parent = canvas.parentElement
            if (!parent) return
            cssW = parent.clientWidth
            cssH = parent.clientHeight
            if (cssW < 2 || cssH < 2) return

            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.max(1, Math.floor(cssW * dpr))
            canvas.height = Math.max(1, Math.floor(cssH * dpr))
            canvas.style.width = "100%"
            canvas.style.height = "100%"
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

            const spacing =
                cssW < 768 ? 48 : cssW < 1024 ? 52 : cssW < 1280 ? 56 : 64
            const pulseCount = cssW < 768 ? 4 : cssW < 1024 ? 8 : 12
            pulseSpeedScale = cssW < 768 ? 0.55 : cssW < 1024 ? 0.75 : 1

            const graph = buildGraph(cssW, cssH, spacing)
            nodes = graph.nodes
            edges = graph.edges
            pulses = Array.from({ length: pulseCount }, () => ({
                edge: Math.floor(Math.random() * Math.max(1, edges.length)),
                t: Math.random(),
                speed: (0.18 + Math.random() * 0.28) * pulseSpeedScale,
            }))
        }

        const drawStatic = () => {
            ctx.clearRect(0, 0, cssW, cssH)
            ctx.lineWidth = 1
            ctx.strokeStyle = trace
            ctx.beginPath()
            for (const e of edges) {
                const a = nodes[e.a]
                const b = nodes[e.b]
                if (!a || !b) continue
                ctx.moveTo(a.x, a.y)
                ctx.lineTo(b.x, b.y)
            }
            ctx.stroke()

            ctx.fillStyle = pad
            for (const n of nodes) {
                ctx.beginPath()
                ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        const drawFrame = (dt: number) => {
            drawStatic()
            if (edges.length === 0) return

            for (const p of pulses) {
                p.t += p.speed * dt
                if (p.t >= 1) {
                    p.t = 0
                    p.edge = Math.floor(Math.random() * edges.length)
                    p.speed = (0.18 + Math.random() * 0.28) * pulseSpeedScale
                }
                const e = edges[p.edge]
                if (!e) continue
                const a = nodes[e.a]
                const b = nodes[e.b]
                if (!a || !b) continue
                const x = a.x + (b.x - a.x) * p.t
                const y = a.y + (b.y - a.y) * p.t
                const grad = ctx.createRadialGradient(x, y, 0, x, y, 6)
                grad.addColorStop(0, pulseColor)
                grad.addColorStop(1, "transparent")
                ctx.fillStyle = grad
                ctx.beginPath()
                ctx.arc(x, y, 6, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        resize()
        const ro = new ResizeObserver(() => {
            resize()
            if (reduceMotion) drawStatic()
        })
        if (canvas.parentElement) ro.observe(canvas.parentElement)

        if (reduceMotion) {
            drawStatic()
            return () => {
                disposed = true
                ro.disconnect()
            }
        }

        let last = performance.now()
        const loop = (now: number) => {
            if (disposed) return
            const dt = Math.min(0.05, (now - last) / 1000)
            last = now
            drawFrame(dt)
            raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)

        return () => {
            disposed = true
            cancelAnimationFrame(raf)
            ro.disconnect()
        }
    }, [resolvedTheme, reduceMotion])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 size-full"
            aria-hidden="true"
        />
    )
}
