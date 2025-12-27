// components/Scene.tsx
"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Center, Environment } from "@react-three/drei"
import { Suspense } from "react"
import Model from "./Model"

export default function Scene({ isTyping }: { isTyping: boolean }) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={1} />
            <Environment preset="sunset" />
            <Suspense fallback={null}>
                <Center>
                    <Model isTyping={isTyping} />
                </Center>
            </Suspense>
            {/* Deshabilitamos interacción para mantenerlo estable */}
            <OrbitControls enableRotate={false} enableZoom={false} enablePan={false} />
        </Canvas>
    )
}