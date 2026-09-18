"use client"

import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import { ResumeSkeleton } from "@/components/resume/resume-skeleton"

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const options = {
    cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
}

export function ResumePdfViewer() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [numPages, setNumPages] = useState(0)

    useEffect(() => {
        const node = containerRef.current
        if (!node) return

        const update = () => setWidth(node.clientWidth)
        update()
        const observer = new ResizeObserver(update)
        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className="overflow-hidden rounded-3xl border border-border bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.06)]"
        >
            {width > 0 ? (
                <Document
                    file="/api/resume"
                    options={options}
                    loading={<ResumeSkeleton framed={false} />}
                    onLoadSuccess={({ numPages: nextNumPages }) =>
                        setNumPages(nextNumPages)
                    }
                >
                    {Array.from({ length: numPages }, (_, index) => (
                        <Page
                            key={index + 1}
                            pageNumber={index + 1}
                            width={width}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    ))}
                </Document>
            ) : (
                <ResumeSkeleton framed={false} />
            )}
        </div>
    )
}