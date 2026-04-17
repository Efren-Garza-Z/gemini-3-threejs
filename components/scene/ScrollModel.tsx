"use client"

import { useAnimations, useGLTF } from "@react-three/drei"
import { useEffect, useRef } from "react"
import { Group, Mesh, MeshStandardMaterial, SRGBColorSpace } from "three"
// ✅ Importa directamente desde "three" — no uses THREE.* en Next.js

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
    const { animations, scene } = useGLTF(modelPath)
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        // ✅ Corrige color space de todas las texturas del modelo
        scene.traverse((child) => {
            if ((child as Mesh).isMesh) {
                const mesh = child as Mesh
                const materials = Array.isArray(mesh.material)
                    ? mesh.material
                    : [mesh.material]

                materials.forEach((mat) => {
                    const m = mat as MeshStandardMaterial
                    if (m.map) m.map.colorSpace = SRGBColorSpace
                    if (m.emissiveMap) m.emissiveMap.colorSpace = SRGBColorSpace
                    m.needsUpdate = true
                })
            }
        })
    }, [scene])

    useEffect(() => {
        const firstAction = Object.values(actions)[0]
        if (firstAction) {
            firstAction.reset().fadeIn(0.5).play()
        }
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