// components/home/ModelFeatureSection.tsx
"use client"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei"
import ScrollModel from "@/components/scene/ScrollModel";

interface Props {
    title: string
    description: string
    reverse?: boolean
    modelPath: string; // Nueva prop obligatoria
    modelScale?: number; // Opcional por si un modelo es más grande que otro
}

export default function ModelFeatureSection({ title, description, reverse, modelPath, modelScale }: Props) {
    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-between min-h-[60vh] px-12 py-20 gap-10`}>

            <motion.div
                initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 space-y-4"
            >
                <h2 className="text-5xl font-black text-zinc-900 leading-tight">{title}</h2>
                <p className="text-xl text-zinc-600">{description}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2 h-[400px] cursor-grab active:cursor-grabbing bg-white/5 rounded-[40px] border border-white/20 shadow-xl"
            >
                <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
                    <ambientLight intensity={2} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <Environment preset="city" />
                    <Suspense fallback={null}>
                        {/* Pasamos la ruta del modelo aquí */}
                        <ScrollModel modelPath={modelPath} scale={modelScale} />
                    </Suspense>
                    <ContactShadows position={[0, -1.5, 0]} opacity={0.2} scale={10} blur={2} far={4.5} />
                    <OrbitControls enableZoom={false} />
                </Canvas>
            </motion.div>
        </div>
    )
}