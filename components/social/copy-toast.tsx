"use client"

import { cn } from "@/lib/utils"

interface CopyToastProps {
    message: string
    visible: boolean
}

export function CopyToast({ message, visible }: CopyToastProps) {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={cn(
                "copy-toast pointer-events-none fixed bottom-6 left-1/2 z-50 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm print:hidden",
                visible && "copy-toast-visible"
            )}
        >
            {message}
        </div>
    )
}
