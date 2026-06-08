"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  Stars, 
  MeshTransmissionMaterial,
  ContactShadows,
  Lightformer
} from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Noise, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// Premium Glass/Crystal Object
function PremiumTorus() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = t / 5;
      meshRef.current.position.y = Math.sin(t / 2) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.8}>
        {/* Complex geometry for better light refraction */}
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshTransmissionMaterial 
          backside
          backsideThickness={5}
          thickness={2}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          color="#ffffff"
          attenuationColor="#38bdf8"
          attenuationDistance={1}
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" />
        <pointLight intensity={2} color="#38bdf8" distance={5} />
      </mesh>
    </Float>
  );
}

// Cinematic Ambient Particles
function CinematicParticles({ count = 150 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 50;
      const speed = 0.005 + Math.random() / 500;
      const xFactor = -20 + Math.random() * 40;
      const yFactor = -20 + Math.random() * 40;
      const zFactor = -20 + Math.random() * 40;
      // Assign random color to each particle (white, light blue, purple)
      const colors = ['#ffffff', '#38bdf8', '#c084fc'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [count]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const c = new THREE.Color();
    particles.forEach((p, i) => {
      c.set(p.color);
      c.toArray(arr, i * 3);
    });
    return arr;
  }, [particles, count]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.5 + 0.5;

      // Smooth mouse follow
      particle.mx += (state.pointer.x * viewport.width * 0.5 - particle.mx) * 0.02;
      particle.my += (state.pointer.y * viewport.height * 0.5 - particle.my) * 0.02;

      dummy.position.set(
        (particle.mx / 5) + a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 5) + b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 5) + b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      if (mesh.current) {
        mesh.current.setMatrixAt(i, dummy.matrix);
      }
    });
    if (mesh.current) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.04, 16, 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshStandardMaterial 
        vertexColors 
        transparent 
        opacity={0.8}
        emissiveIntensity={2}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// Lighting Setup for Premium Reflections
function LightingSetup() {
  const { pointer } = useThree();
  const mouseLight = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (mouseLight.current) {
      // Lerp mouse light for smoothness
      mouseLight.current.position.lerp(
        new THREE.Vector3(pointer.x * 10, pointer.y * 10, 5),
        0.1
      );
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} color="#ffffff" />
      <pointLight ref={mouseLight} intensity={3} color="#38bdf8" distance={15} />
      <spotLight position={[-10, -10, -10]} intensity={2} color="#c084fc" />
      
      {/* Lightformers for realistic glass reflections */}
      <Environment preset="city" resolution={256}>
        <Lightformer form="rect" intensity={2} position={[10, 5, 5]} scale={[10, 20, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={1.5} position={[-10, 10, -5]} scale={[5, 5, 1]} target={[0, 0, 0]} />
      </Environment>
    </>
  );
}

export function Hero3DScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-90" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 10], fov: 35 }} dpr={[1, 2]}>
        <color attach="background" args={["#02040a"]} />
        <LightingSetup />
        
        <PremiumTorus />
        
        <CinematicParticles count={250} />
        
        {/* Parallax Stars */}
        <Stars radius={50} depth={50} count={5000} factor={3} saturation={1} fade speed={1.5} />
        
        <ContactShadows 
          position={[0, -3, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2.5} 
          far={4} 
        />
        
        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.5} mipmapBlur luminanceSmoothing={0.3} intensity={1.2} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} height={480} />
          <Noise opacity={0.03} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}