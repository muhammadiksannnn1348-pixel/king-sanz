'use client'

import React, { useEffect, useLayoutEffect, useRef } from "react"

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const AnimatedBackground = () => {
	const canvasRef = useRef(null)

	useIsomorphicLayoutEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")
		let animationId
		let stars = []
		let shootingStars = []
		let lastSpawnTime = 0
		let isTabVisible = true

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}
		resize()
		window.addEventListener("resize", resize)

		// Pause saat pindah tab (mencegah spam)
		const handleVisibility = () => {
			isTabVisible = !document.hidden
			if (document.hidden) {
				shootingStars = []
			}
		}
		document.addEventListener("visibilitychange", handleVisibility)

		// Buat bintang biasa
		const createStars = (count) => {
			stars = []
			for (let i = 0; i < count; i++) {
				stars.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					radius: Math.random() * 1.5 + 0.4,
					opacity: Math.random() * 0.8 + 0.2,
					twinkleSpeed: Math.random() * 0.02 + 0.004,
					twinkleDirection: Math.random() > 0.5 ? 1 : -1,
				})
			}
		}

		// Buat bintang jatuh
		const createShootingStar = () => {
			if (shootingStars.length >= 3) return

			const startX = Math.random() * canvas.width * 0.9
			const startY = Math.random() * (canvas.height * 0.3)

			shootingStars.push({
				x: startX,
				y: startY,
				length: Math.random() * 70 + 40,
				speed: Math.random() * 6 + 5,
				opacity: 1,
				angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
				fadeSpeed: 0.008 + Math.random() * 0.006,
			})
		}

		createStars(180)

		const animate = (timestamp) => {
			if (!isTabVisible) {
				animationId = requestAnimationFrame(animate)
				return
			}

			ctx.fillStyle = "#030014"
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			// Bintang berkedip
			stars.forEach((star) => {
				star.opacity += star.twinkleSpeed * star.twinkleDirection
				if (star.opacity <= 0.2 || star.opacity >= 1) {
					star.twinkleDirection *= -1
				}

				ctx.beginPath()
				ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
				ctx.fill()
			})

			// Spawn lebih sering (1.2s - 2.5s)
			if (timestamp - lastSpawnTime > 1200 + Math.random() * 1300) {
				if (Math.random() > 0.35) {
					createShootingStar()
				}
				lastSpawnTime = timestamp
			}

			// Update & gambar bintang jatuh
			for (let i = shootingStars.length - 1; i >= 0; i--) {
				const s = shootingStars[i]

				const endX = s.x - Math.cos(s.angle) * s.length
				const endY = s.y - Math.sin(s.angle) * s.length

				const gradient = ctx.createLinearGradient(s.x, s.y, endX, endY)
				gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity})`)
				gradient.addColorStop(0.5, `rgba(180, 210, 255, ${s.opacity * 0.5})`)
				gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

				ctx.beginPath()
				ctx.moveTo(s.x, s.y)
				ctx.lineTo(endX, endY)
				ctx.strokeStyle = gradient
				ctx.lineWidth = 2
				ctx.lineCap = "round"
				ctx.stroke()

				ctx.beginPath()
				ctx.arc(s.x, s.y, 2.2, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`
				ctx.fill()

				s.x += Math.cos(s.angle) * s.speed
				s.y += Math.sin(s.angle) * s.speed
				s.opacity -= s.fadeSpeed

				if (
					s.opacity <= 0 ||
					s.x > canvas.width + 100 ||
					s.y > canvas.height + 100
				) {
					shootingStars.splice(i, 1)
				}
			}

			animationId = requestAnimationFrame(animate)
		}

		animationId = requestAnimationFrame(animate)

		return () => {
			cancelAnimationFrame(animationId)
			window.removeEventListener("resize", resize)
			document.removeEventListener("visibilitychange", handleVisibility)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className="fixed inset-0 w-full h-full pointer-events-none"
			style={{
				zIndex: 0,
				background: "transparent",
			}}
		/>
	)
}

export default AnimatedBackground