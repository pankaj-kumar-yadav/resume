type Vec3 = [number, number, number]

const OX = 140
const OY = 204
const TILE = 36
const Z = 21
const W = 3
const D = 3
const FLOOR = 2.2
const F2 = FLOOR * 2
const F3 = FLOOR * 3
const TOP = FLOOR * 4
const IN = 0.4
const LH = FLOOR - IN * 2
const LX = 0.4
const LW = 2.2
const RY = 0.7
const RD = 1.6

function iso(x: number, y: number, z: number) {
    return {
        x: OX + (x - y) * TILE,
        y: OY + (x + y) * (TILE / 2) - z * Z,
    }
}

function toPoints(pts: Vec3[]) {
    return pts
        .map(([x, y, z]) => {
            const p = iso(x, y, z)
            return `${p.x.toFixed(1)},${p.y.toFixed(1)}`
        })
        .join(" ")
}

function Poly({ pts, className }: { pts: Vec3[]; className: string }) {
    return <polygon points={toPoints(pts)} className={className} />
}

/** Camera-facing left wall (+y). */
function FaceY({
    x,
    y,
    z,
    w,
    h,
    className,
}: {
    x: number
    y: number
    z: number
    w: number
    h: number
    className: string
}) {
    return (
        <Poly
            className={className}
            pts={[
                [x, y, z],
                [x + w, y, z],
                [x + w, y, z + h],
                [x, y, z + h],
            ]}
        />
    )
}

/** Camera-facing right wall (+x). */
function FaceX({
    x,
    y,
    z,
    d,
    h,
    className,
}: {
    x: number
    y: number
    z: number
    d: number
    h: number
    className: string
}) {
    return (
        <Poly
            className={className}
            pts={[
                [x, y, z],
                [x, y + d, z],
                [x, y + d, z + h],
                [x, y, z + h],
            ]}
        />
    )
}

function Stroke({ pts }: { pts: Vec3[] }) {
    return <polyline className="iso-stroke" points={toPoints(pts)} />
}

function FrameY({
    x,
    y,
    z,
    w,
    h,
}: {
    x: number
    y: number
    z: number
    w: number
    h: number
}) {
    return (
        <Stroke
            pts={[
                [x, y, z],
                [x + w, y, z],
                [x + w, y, z + h],
                [x, y, z + h],
                [x, y, z],
            ]}
        />
    )
}

function FrameX({
    x,
    y,
    z,
    d,
    h,
}: {
    x: number
    y: number
    z: number
    d: number
    h: number
}) {
    return (
        <Stroke
            pts={[
                [x, y, z],
                [x, y + d, z],
                [x, y + d, z + h],
                [x, y, z + h],
                [x, y, z],
            ]}
        />
    )
}

function coinPts(r: number): Vec3[] {
    const cy = RY + RD / 2
    const cz = F2 + IN + LH / 2
    const k = 0.71
    return [
        [W, cy + r, cz],
        [W, cy + r * k, cz + r * k],
        [W, cy, cz + r],
        [W, cy - r * k, cz + r * k],
        [W, cy - r, cz],
        [W, cy - r * k, cz - r * k],
        [W, cy, cz - r],
        [W, cy + r * k, cz - r * k],
        [W, cy + r, cz],
    ]
}

export function HeroIsometric() {
    return (
        <div className="hero-iso hidden lg:block print:hidden" aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 280 320"
                width={280}
                height={320}
                fill="none"
            >
                <ellipse
                    cx={140}
                    cy={304}
                    rx={92}
                    ry={16}
                    className="iso-shadow"
                    pointerEvents="none"
                />
                <g className="hero-iso-shape">
                    <FaceY x={0} y={D} z={0} w={W} h={TOP} className="iso-left" />
                    <FaceX x={W} y={0} z={0} d={D} h={TOP} className="iso-right" />
                    <Poly
                        className="iso-top"
                        pts={[
                            [0, 0, TOP],
                            [W, 0, TOP],
                            [W, D, TOP],
                            [0, D, TOP],
                        ]}
                    />
                    <Stroke pts={[[0, D, FLOOR], [W, D, FLOOR], [W, 0, FLOOR]]} />
                    <Stroke pts={[[0, D, F2], [W, D, F2], [W, 0, F2]]} />
                    <Stroke pts={[[0, D, F3], [W, D, F3], [W, 0, F3]]} />
                    <FaceY x={LX} y={D} z={0.5} w={1} h={1} className="iso-mark-fill" />
                    <FrameY x={LX} y={D} z={0.5} w={1} h={1} />
                    <FrameY x={LX + 0.1} y={D} z={0.6} w={0.8} h={0.8} />
                    <Stroke pts={[[LX + 0.5, D, 0.5], [LX + 0.5, D, 1.5]]} />
                    <Stroke pts={[[LX, D, 1], [LX + 1, D, 1]]} />
                    <FaceY x={LX + 1.2} y={D} z={0.5} w={1} h={1} className="iso-mark-fill" />
                    <FrameY x={LX + 1.2} y={D} z={0.5} w={1} h={1} />
                    <FrameY x={LX + 1.3} y={D} z={0.6} w={0.8} h={0.8} />
                    <Stroke pts={[[LX + 1.7, D, 0.5], [LX + 1.7, D, 1.5]]} />
                    <Stroke pts={[[LX + 1.2, D, 1], [LX + 2.2, D, 1]]} />
                    <FaceX x={W} y={0.9} z={0} d={1.2} h={1.55} className="iso-accent" />
                    <FrameX x={W} y={0.9} z={0} d={1.2} h={1.55} />
                    <FrameX x={W} y={1.05} z={0.18} d={0.9} h={1.2} />
                    <FaceX x={W} y={1.88} z={0.55} d={0.08} h={0.34} className="iso-mark-fill" />
                    <FaceX x={W} y={1.64} z={0.7} d={0.32} h={0.12} className="iso-mark-fill" />
                    <FaceY x={LX} y={D} z={FLOOR + IN} w={LW} h={LH} className="iso-mark-fill" />
                    <FrameY x={LX} y={D} z={FLOOR + IN} w={LW} h={LH} />
                    <FaceY
                        x={LX + 0.14}
                        y={D}
                        z={FLOOR + IN + LH - 0.3}
                        w={LW - 0.28}
                        h={0.18}
                        className="iso-left"
                    />
                    <FrameY
                        x={LX + 0.14}
                        y={D}
                        z={FLOOR + IN + LH - 0.3}
                        w={LW - 0.28}
                        h={0.18}
                    />
                    {([0, 1, 2] as const).map((row) =>
                        ([0, 1, 2] as const).map((col) => (
                            <FrameY
                                key={`pad-${row}-${col}`}
                                x={LX + 0.14 + col * 0.64}
                                y={D}
                                z={FLOOR + IN + 0.12 + row * 0.32}
                                w={0.52}
                                h={0.24}
                            />
                        )),
                    )}
                    <FaceX
                        x={W}
                        y={1.0}
                        z={FLOOR + IN + 0.18}
                        d={1.0}
                        h={0.88}
                        className="iso-mark-fill"
                    />
                    <FrameX x={W} y={1.0} z={FLOOR + IN + 0.18} d={1.0} h={0.88} />
                    <FaceX
                        x={W}
                        y={1.4}
                        z={FLOOR + IN + 0.58}
                        d={0.2}
                        h={0.16}
                        className="iso-right"
                    />
                    <FaceX
                        x={W}
                        y={1.44}
                        z={FLOOR + IN + 0.36}
                        d={0.12}
                        h={0.24}
                        className="iso-right"
                    />
                    <Stroke
                        pts={[
                            [W, 1.14, FLOOR + IN + 1.06],
                            [W, 1.14, FLOOR + IN + 1.32],
                            [W, 1.86, FLOOR + IN + 1.32],
                            [W, 1.86, FLOOR + IN + 1.06],
                        ]}
                    />
                    <Stroke
                        pts={[
                            [W, 1.26, FLOOR + IN + 1.06],
                            [W, 1.26, FLOOR + IN + 1.22],
                            [W, 1.74, FLOOR + IN + 1.22],
                            [W, 1.74, FLOOR + IN + 1.06],
                        ]}
                    />
                    <FaceY x={LX} y={D} z={F2 + IN} w={LW} h={LH} className="iso-mark-fill" />
                    <FrameY x={LX} y={D} z={F2 + IN} w={LW} h={LH} />
                    <Stroke
                        pts={[
                            [LX, D, F2 + IN + LH - 0.32],
                            [LX + LW, D, F2 + IN + LH - 0.32],
                        ]}
                    />
                    <FaceY
                        x={LX + 0.16}
                        y={D}
                        z={F2 + IN + 0.16}
                        w={0.42}
                        h={0.3}
                        className="iso-left"
                    />
                    <FrameY x={LX + 0.16} y={D} z={F2 + IN + 0.16} w={0.42} h={0.3} />
                    <Stroke
                        pts={[
                            [LX + 0.76, D, F2 + IN + 0.22],
                            [LX + LW - 0.16, D, F2 + IN + 0.22],
                        ]}
                    />
                    <Stroke
                        pts={[
                            [LX + 0.76, D, F2 + IN + 0.4],
                            [LX + LW - 0.32, D, F2 + IN + 0.4],
                        ]}
                    />
                    <Stroke
                        pts={[
                            [LX + 0.76, D, F2 + IN + 0.58],
                            [LX + LW - 0.22, D, F2 + IN + 0.58],
                        ]}
                    />
                    <Poly className="iso-mark-fill" pts={coinPts(0.5)} />
                    <Stroke pts={coinPts(0.5)} />
                    <Stroke pts={coinPts(0.32)} />
                    <Stroke
                        pts={[
                            [W, RY + RD / 2 - 0.12, F2 + IN + LH / 2],
                            [W, RY + RD / 2 + 0.12, F2 + IN + LH / 2],
                        ]}
                    />
                    <Stroke
                        pts={[
                            [W, RY + RD / 2, F2 + IN + LH / 2 - 0.12],
                            [W, RY + RD / 2, F2 + IN + LH / 2 + 0.12],
                        ]}
                    />
                    <FaceY x={LX} y={D} z={F3 + IN} w={LW} h={LH} className="iso-mark-fill" />
                    <FrameY x={LX} y={D} z={F3 + IN} w={LW} h={LH} />
                    <Stroke
                        pts={[
                            [LX + 0.14, D, F3 + IN + 0.14],
                            [LX + LW - 0.14, D, F3 + IN + 0.14],
                        ]}
                    />
                    {([0.42, 0.78, 0.56, 1.02] as const).map((h, i) => (
                        <FaceY
                            key={`bar-${i}`}
                            x={LX + 0.18 + i * 0.5}
                            y={D}
                            z={F3 + IN + 0.14}
                            w={0.36}
                            h={h}
                            className="iso-left"
                        />
                    ))}
                    <FaceX x={W} y={RY} z={F3 + IN} d={RD} h={LH} className="iso-mark-fill" />
                    <FrameX x={W} y={RY} z={F3 + IN} d={RD} h={LH} />
                    <FaceX
                        x={W}
                        y={RY + 0.12}
                        z={F3 + IN + LH - 0.28}
                        d={RD - 0.24}
                        h={0.16}
                        className="iso-right"
                    />
                    <Stroke
                        pts={[
                            [W, RY + 0.22, F3 + IN + 0.28],
                            [W, RY + 0.52, F3 + IN + 0.78],
                            [W, RY + 0.82, F3 + IN + 0.48],
                            [W, RY + 1.12, F3 + IN + 0.92],
                            [W, RY + 1.38, F3 + IN + 0.62],
                        ]}
                    />
                    <polyline
                        className="iso-stroke"
                        points={toPoints([
                            [0, D, 0],
                            [0, D, TOP],
                            [0, 0, TOP],
                            [W, 0, TOP],
                            [W, 0, 0],
                            [W, D, 0],
                            [0, D, 0],
                        ])}
                    />
                </g>
            </svg>
        </div>
    )
}
