type Vec3 = [number, number, number]

const OX = 140
const OY = 204
const TILE = 36
const Z = 26
const W = 3
const D = 3
const FLOOR = 2.2
const TOP = FLOOR * 2

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
                    <polyline
                        className="iso-stroke"
                        points={toPoints([
                            [0, D, FLOOR],
                            [W, D, FLOOR],
                            [W, 0, FLOOR],
                        ])}
                    />
                    <FaceY x={0.35} y={D} z={0.55} w={0.9} h={0.8} className="iso-mark-fill" />
                    <FaceY x={1.55} y={D} z={0.55} w={0.9} h={0.8} className="iso-mark-fill" />
                    <FaceX x={W} y={0.95} z={0} d={1.1} h={1.55} className="iso-accent" />
                    <FaceX
                        x={W}
                        y={1.05}
                        z={FLOOR + 0.35}
                        d={0.85}
                        h={0.7}
                        className="iso-mark-fill"
                    />
                    <polyline
                        className="iso-stroke"
                        points={toPoints([
                            [W, 1.18, FLOOR + 1.05],
                            [W, 1.18, FLOOR + 1.38],
                            [W, 1.78, FLOOR + 1.38],
                            [W, 1.78, FLOOR + 1.05],
                        ])}
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
