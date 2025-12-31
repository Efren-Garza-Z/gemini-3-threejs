// components/Model.tsx
"use client"

import { useAnimations, useGLTF } from "@react-three/drei"
import {useEffect, useRef, useState} from "react"
import { Group } from "three"

useGLTF.preload("/jake_talk.glb")

interface ModelProps {
  isTyping: boolean
}

export default function Model({ isTyping }: ModelProps) {
  const group = useRef<Group>(null)
  const { animations, scene } = useGLTF("/jake_talk.glb")
  const { actions } = useAnimations(animations, scene)
  const [scale, setScale] = useState(1.5)

  useEffect(() => {
    // Usamos "Chat3" que es la animación que mencionaste anteriormente
    const action = actions["Chat2"]

    if (action) {
      if (isTyping) {
        action.reset().fadeIn(0.2).play()
        action.timeScale = 2.0 // Animación 2 veces más rápida
      } else {
        action.fadeOut(0.5)
      }
    }
  }, [isTyping, actions])

  useEffect(() => {
    const handleResize = () => {
      // Si la pantalla es pequeña (móvil), reducimos un poco la escala
      setScale(window.innerWidth < 768 ? 1.5 : 1.5)
    }
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
      <group ref={group} dispose={null}>
        {/* Escalamos el modelo ligeramente si queda muy pequeño */}
        <primitive object={scene} scale={scale} />
      </group>
  )
}