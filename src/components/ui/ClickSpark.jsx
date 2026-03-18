import { useRef, useEffect, useCallback } from 'react'

const ClickSpark = ({
  sparkColor = '#60a5fa',
  sparkSize = 14,
  sparkRadius = 22,
  sparkCount = 10,
  duration = 550,
  easing = 'ease-out',
  extraScale = 1.1,
  children,
}) => {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    let resizeTimeout

    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect()
      if (canvas.width !== Math.round(width) || canvas.height !== Math.round(height)) {
        canvas.width = Math.round(width)
        canvas.height = Math.round(height)
      }
    }

    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 80)
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)
    resizeCanvas()

    return () => {
      ro.disconnect()
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeFunc = useCallback(
    (t) => {
      switch (easing) {
        case 'linear': return t
        case 'ease-in': return t * t
        case 'ease-in-out': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
        default: return t * (2 - t)
      }
    },
    [easing]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime
        if (elapsed >= duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)
        const distance = eased * sparkRadius * extraScale
        const lineLength = sparkSize * (1 - eased)

        const x1 = spark.x + distance * Math.cos(spark.angle)
        const y1 = spark.y + distance * Math.sin(spark.angle)
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle)
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle)

        // Fade out near end
        const alpha = 1 - eased
        ctx.globalAlpha = alpha
        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.globalAlpha = 1

        return true
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animationId)
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration, easeFunc, extraScale])

  const handleClick = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const now = performance.now()

    const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / sparkCount,
      startTime: now,
    }))

    sparksRef.current.push(...newSparks)
  }

  return (
    <div className="relative w-full min-h-screen" onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        style={{ zIndex: 9999 }}
      />
      {children}
    </div>
  )
}

export default ClickSpark
