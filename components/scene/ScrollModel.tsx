// components/scene/ScrollModel.tsx
"use client"

import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group } from "three"

interface ScrollModelProps {
    modelPath: string;
    scale?: number;
    position?: [number, number, number];
}

export default function ScrollModel({
                                        modelPath,
                                        scale = 2.5,
                                        position = [0, -1, 0]
                                    }: ScrollModelProps) {
    const group = useRef<Group>(null)
    // Cargamos el modelo dinámicamente según la prop modelPath
    const { animations, scene } = useGLTF(modelPath)
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        console.log(`🔥 Animaciones de ${modelPath}:`, actions)

        // Reproduce la primera animación disponible
        const firstAction = Object.values(actions)[0]
        if (firstAction) {
            firstAction.reset().fadeIn(0.5).play()
        }

        // Limpieza al desmontar o cambiar de modelo
        return () => {
            if (firstAction) firstAction.fadeOut(0.5)
        }
    }, [actions, modelPath])

    return (
        <group ref={group} dispose={null}>
            <primitive object={scene} scale={scale} position={position} />
        </group>
    )
}