// components/Model.tsx
"use client"

import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"

useGLTF.preload("/jake_talk.glb")

interface ModelProps {
  isTyping: boolean
}

export default function Model({ isTyping }: ModelProps) {
  const group = useRef<Group>(null)
  const { animations, scene } = useGLTF("/jake_talk.glb")
  const { actions } = useAnimations(animations, scene)

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

  return (
      <group ref={group} dispose={null}>
        {/* Escalamos el modelo ligeramente si queda muy pequeño */}
        <primitive object={scene} scale={3} />
      </group>
  )
}