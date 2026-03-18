import { useEffect, useRef } from 'react'

export default function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0) translateX(0)'
          observer.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const initTransform =
    direction === 'up'    ? 'translateY(36px)' :
    direction === 'down'  ? 'translateY(-36px)' :
    direction === 'left'  ? 'translateX(-36px)' :
    direction === 'right' ? 'translateX(36px)'  : 'translateY(36px)'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: initTransform,
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
