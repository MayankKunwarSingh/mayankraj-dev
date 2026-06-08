"use client";

import {
  ContactShadows,
  Float,
  MeshTransmissionMaterial,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const themeColors = {
  background: "#02040a",
  cyan: "#38bdf8",
  indigo: "#818cf8",
  violet: "#c084fc",
  emerald: "#34d399",
  white: "#f8fafc",
};

function createSeededRandom(seed = 42) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function PremiumCore({ reduceQuality }: { reduceQuality: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.cos(t / 4) * 0.28;
      meshRef.current.rotation.y = Math.sin(t / 5) * 0.42 + t * 0.08;
      meshRef.current.rotation.z = t * 0.12;
      meshRef.current.position.y = Math.sin(t / 2) * 0.25;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.22;
      innerRef.current.scale.setScalar(0.78 + Math.sin(t * 2) * 0.035);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.24} floatIntensity={0.45}>
      <mesh ref={meshRef} scale={1.55}>
        <torusKnotGeometry args={[1, 0.3, reduceQuality ? 100 : 200, reduceQuality ? 16 : 32]} />
        <MeshTransmissionMaterial 
          backside={!reduceQuality}
          backsideThickness={1.5}
          thickness={1.35}
          roughness={0.15}
          transmission={1}
          ior={1.42}
          chromaticAberration={0.06}
          anisotropy={0.18}
          color={themeColors.white}
          attenuationColor={themeColors.cyan}
          attenuationDistance={1.25}
          resolution={reduceQuality ? 256 : 512}
        />
      </mesh>
      
      <mesh ref={innerRef} scale={0.72}>
        <icosahedronGeometry args={[1, reduceQuality ? 1 : 2]} />
        <meshBasicMaterial color={themeColors.cyan} transparent opacity={0.34} />
        <pointLight intensity={2.2} color={themeColors.cyan} distance={6} />
      </mesh>
    </Float>
  );
}

function OrbitRings({ reduceQuality }: { reduceQuality: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = -0.35 + Math.sin(t * 0.2) * 0.04;
    groupRef.current.rotation.y = t * 0.08;
    groupRef.current.rotation.z = Math.sin(t * 0.18) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {[2.8, 3.45, 4.15].map((radius, index) => (
        <mesh
          key={radius}
          rotation={[
            Math.PI / 2 + index * 0.28,
            index % 2 ? 0.32 : -0.18,
            index * 0.5,
          ]}
        >
          <torusGeometry args={[radius, 0.008, reduceQuality ? 8 : 12, reduceQuality ? 64 : 128]} />
          <meshBasicMaterial
            color={[themeColors.cyan, themeColors.indigo, themeColors.violet][index]}
            transparent
            opacity={0.36 - index * 0.06}
          />
        </mesh>
      ))}
    </group>
  );
}

function DataPanels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, index) => {
      child.position.y += Math.sin(t * 0.8 + index) * 0.0008;
      child.rotation.y = Math.sin(t * 0.3 + index) * 0.12;
    });
  });

  return (
    <group ref={groupRef}>
      {[
        [-3.1, 1.35, -1.2, themeColors.cyan],
        [3.4, -1.1, -0.4, themeColors.indigo],
        [2.6, 1.85, -2.4, themeColors.emerald],
      ].map(([x, y, z, color], index) => (
        <mesh key={`${x}-${y}`} position={[x as number, y as number, z as number]} rotation={[0.18, index ? -0.35 : 0.4, 0]}>
          <boxGeometry args={[1.2, 0.58, 0.03]} />
          <meshBasicMaterial color={color as string} transparent opacity={0.16} />
        </mesh>
      ))}
    </group>
  );
}

function CinematicParticles({ count = 150, reduceQuality = false }: { count?: number, reduceQuality?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const actualCount = reduceQuality ? Math.floor(count / 2.5) : count;
  
  const particles = useMemo(() => {
    const random = createSeededRandom(124);
    const temp = [];
    for (let i = 0; i < actualCount; i++) {
      const t = random() * 100;
      const factor = 8 + random() * 36;
      const speed = 0.0025 + random() / 700;
      const xFactor = -18 + random() * 36;
      const yFactor = -14 + random() * 28;
      const zFactor = -18 + random() * 36;
      const colors = [themeColors.white, themeColors.cyan, themeColors.indigo, themeColors.violet];
      const color = colors[Math.floor(random() * colors.length)];
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0, color });
    }
    return temp;
  }, [actualCount]);

  const colorArray = useMemo(() => {
    const arr = new Float32Array(actualCount * 3);
    const c = new THREE.Color();
    particles.forEach((p, i) => {
      c.set(p.color);
      c.toArray(arr, i * 3);
    });
    return arr;
  }, [particles, actualCount]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { t } = particle;
      const { factor, speed, xFactor, yFactor, zFactor } = particle;
      
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t) * 0.5 + 0.5;

      // Smooth mouse follow
      particle.mx += (state.pointer.x * viewport.width * 0.5 - particle.mx) * 0.05;
      particle.my += (state.pointer.y * viewport.height * 0.5 - particle.my) * 0.05;

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
    <instancedMesh ref={mesh} args={[undefined, undefined, actualCount]}>
      <sphereGeometry args={[0.04, reduceQuality ? 8 : 16, reduceQuality ? 8 : 16]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </sphereGeometry>
      <meshStandardMaterial 
        vertexColors 
        transparent 
        opacity={0.72}
        emissive={themeColors.cyan}
        emissiveIntensity={0.45}
        roughness={0.2}
      />
    </instancedMesh>
  );
}

// Lighting Setup for Premium Reflections
function LightingSetup({ reduceQuality }: { reduceQuality: boolean }) {
  const { pointer } = useThree();
  const mouseLight = useRef<THREE.PointLight>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (mouseLight.current && !reduceQuality) {
      target.set(pointer.x * 8, pointer.y * 7, 5);
      mouseLight.current.position.lerp(target, 0.08);
    }
  });

  return (
    <>
      <ambientLight intensity={0.28} />
      <directionalLight position={[10, 20, 10]} intensity={1.35} color={themeColors.white} />
      {!reduceQuality && (
        <pointLight ref={mouseLight} intensity={2.5} color={themeColors.cyan} distance={15} />
      )}
      <spotLight position={[-8, -6, -8]} intensity={1.7} color={themeColors.violet} />
      <rectAreaLight
        position={[7, 4, 5]}
        rotation={[0, -0.7, 0]}
        intensity={3}
        width={8}
        height={5}
        color={themeColors.cyan}
      />
      <rectAreaLight
        position={[-6, 6, -4]}
        rotation={[0.4, 0.8, 0]}
        intensity={2}
        width={5}
        height={5}
        color={themeColors.violet}
      />
    </>
  );
}

function HeroRig({ reduceQuality }: { reduceQuality: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const desktopOffset = viewport.width > 9 ? 2.4 : 0;

    groupRef.current.position.x += (desktopOffset + pointer.x * 0.24 - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y += (pointer.y * 0.18 - groupRef.current.position.y) * 0.05;
    groupRef.current.rotation.y += (pointer.x * 0.12 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (pointer.y * -0.08 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.position.z = Math.sin(t * 0.28) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <OrbitRings reduceQuality={reduceQuality} />
      <PremiumCore reduceQuality={reduceQuality} />
      <DataPanels />
    </group>
  );
}

export function Hero3DScene() {
  const [reduceQuality, setReduceQuality] = useState(false);

  useEffect(() => {
    const checkQuality = () => {
      const isMobile = window.innerWidth < 768;
      const isLowPerf = (navigator.hardwareConcurrency || 4) <= 4;
      setReduceQuality(isMobile || isLowPerf);
    };
    checkQuality();
    window.addEventListener("resize", checkQuality, { passive: true });
    return () => window.removeEventListener("resize", checkQuality);
  }, []);

  return (
    <div className="hero-3d-scene absolute inset-0 z-0 pointer-events-none opacity-95" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 36 }}
        dpr={[1, reduceQuality ? 1.2 : 1.75]}
        gl={{ alpha: true, antialias: !reduceQuality, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[themeColors.background]} />
        <LightingSetup reduceQuality={reduceQuality} />
        
        <HeroRig reduceQuality={reduceQuality} />
        
        <CinematicParticles count={180} reduceQuality={reduceQuality} />
        
        <Stars radius={45} depth={36} count={reduceQuality ? 800 : 2000} factor={reduceQuality ? 3 : 2.6} saturation={0.6} fade speed={reduceQuality ? 0.2 : 0.6} />
        
        {!reduceQuality && (
          <ContactShadows 
            position={[0, -3, 0]} 
            opacity={0.28} 
            scale={16} 
            blur={2.5} 
            far={4} 
            resolution={256}
            frames={1}
          />
        )}
        
        <EffectComposer multisampling={reduceQuality ? 0 : 2}>
          <Bloom
            luminanceThreshold={0.4}
            mipmapBlur
            luminanceSmoothing={0.3}
            intensity={0.7}
          />
          <Vignette
            eskil={false}
            offset={0.18}
            darkness={reduceQuality ? 0 : 0.95}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
