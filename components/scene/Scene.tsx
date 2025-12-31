// components/Scene.tsx
"use client"
import { Canvas } from "@react-three/fiber"
import {OrbitControls, Center, Environment, ContactShadows} from "@react-three/drei"
import { Suspense } from "react"
import Model from "./Model"

export default function Scene({ isTyping }: { isTyping: boolean }) {
    return (
        <Canvas
            shadows
            // fov: 35 para acercar, position: [0, 0, 5] para centrar el eje de la cámara
            camera={{ position: [0, 0, 5], fov: 35 }}
            className="w-full h-full"
        >
            <ambientLight intensity={1.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <Environment preset="city" />
            <Suspense fallback={null}>
                <Center top position={[0, -0.5, 0]}>
                    <Model isTyping={isTyping} />
                </Center>
            </Suspense>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={8} blur={2.5} />
            {/* Deshabilitamos interacción para mantenerlo estable */}
            <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                makeDefault
            />
        </Canvas>
    )
}