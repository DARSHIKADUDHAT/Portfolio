import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    // V3 Ethereal Glass Dark Blue background
    renderer.setClearColor(0x020617, 1) 
    
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020617, 0.0025)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position.set(0, 100, 300)
    camera.lookAt(0, 0, 0)

    // Highly tessellated plane for liquid wave displacement
    const geo = new THREE.PlaneGeometry(1600, 1600, 80, 80)
    geo.rotateX(-Math.PI / 2) // Lay flat to form the floor

    // Save original vertices for wave calculation
    const positions = geo.attributes.position.array
    const originalY = new Float32Array(positions.length / 3)
    for (let i = 0; i < positions.length; i += 3) {
      originalY[i/3] = positions[i + 1]
    }

    // Material 1: Solid glossy dark fluid
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Slate 900
      roughness: 0.2, // Highly glossy
      metalness: 0.8, // Metallic properties
      wireframe: false,
    })

    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    // Material 2: Bioluminescent overlay grid
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
    const wireMesh = new THREE.Mesh(geo, wireMat)
    // Offset slightly to prevent z-fighting
    wireMesh.position.y = 0.2
    scene.add(wireMesh)

    // ===================================
    // Cinematic Studio Lighting
    // ===================================
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)

    const spotBlue = new THREE.SpotLight(0x3b82f6, 80000) // Electric Blue
    spotBlue.position.set(-400, 300, 0)
    spotBlue.angle = Math.PI / 3
    spotBlue.penumbra = 0.8
    spotBlue.distance = 1500
    scene.add(spotBlue)

    const spotViolet = new THREE.SpotLight(0x8b5cf6, 80000) // Deep Violet
    spotViolet.position.set(400, 300, 0)
    spotViolet.angle = Math.PI / 3
    spotViolet.penumbra = 0.8
    spotViolet.distance = 1500
    scene.add(spotViolet)

    // Dynamic mouse light interaction
    const mouseLight = new THREE.PointLight(0xffffff, 0, 400) // Start off/faded
    scene.add(mouseLight)

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Raycaster for translating 2D cursor to 3D terrain
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2(-10, -10)
    let isHovering = false

    function onMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
      isHovering = true
    }
    window.addEventListener('mousemove', onMouseMove)

    const clock = new THREE.Clock()

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Wave animation Engine
      const pos = geo.attributes.position.array
      for (let i = 0; i < pos.length; i += 3) {
        const x = pos[i]
        const z = pos[i + 2]
        
        // Multi-layered sine wave for organic liquid feel
        const wave1 = Math.sin(x * 0.005 + t) * Math.cos(z * 0.005 + t) * 30
        const wave2 = Math.sin(x * 0.01 - t * 1.5) * 15
        const wave3 = Math.cos(z * 0.015 + t * 0.8) * 10
        
        pos[i + 1] = originalY[i/3] + wave1 + wave2 + wave3
      }
      
      geo.attributes.position.needsUpdate = true
      // Recalculate normals so the physical lighting drastically shifts with the waves
      geo.computeVertexNormals()

      // Mouse Light physics
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObject(mesh)
      
      if (intersects.length > 0 && isHovering) {
         mouseLight.intensity += (40000 - mouseLight.intensity) * 0.1 // Ease in light
         mouseLight.position.x += (intersects[0].point.x - mouseLight.position.x) * 0.1
         mouseLight.position.z += (intersects[0].point.z - mouseLight.position.z) * 0.1
         mouseLight.position.y = intersects[0].point.y + 40 // Float above surface
      } else {
         mouseLight.intensity += (0 - mouseLight.intensity) * 0.05 // Ease out
      }

      // Gentle camera sway
      camera.position.x = Math.sin(t * 0.2) * 50
      camera.lookAt(0,0,0)

      renderer.render(scene, camera)
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      geo.dispose()
      mat.dispose()
      wireMat.dispose()
      renderer.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className="three-canvas" />
}
