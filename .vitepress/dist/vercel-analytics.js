import { inject } from "@vercel/analytics"
import { injectSpeedInsights } from "@vercel/speed-insights"

if (typeof window !== "undefined") {
    inject()
    injectSpeedInsights()
}