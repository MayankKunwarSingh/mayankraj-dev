"use client";

import {
  Float,
  Stars,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
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
    <Float speed={reduceQuality ? 0.8 : 1.05} rotationIntensity={0.12} floatIntensity={0.22}>
      <mesh ref={meshRef} scale={1.32}>
        <torusKnotGeometry args={[1, 0.28, reduceQuality ? 48 : 72, reduceQuality ? 8 : 12]} />
        <meshPhysicalMaterial
          color={themeColors.white}
          roughness={0.18}
          metalness={0.08}
          clearcoat={0.85}
          clearcoatRoughness={0.22}
          transmission={reduceQuality ? 0.18 : 0.34}
          thickness={0.45}
          ior={1.35}
          emissive={themeColors.cyan}
          emissiveIntensity={0.08}
        />
      </mesh>
      
      <mesh ref={innerRef} scale={0.72}>
        <icosahedronGeometry args={[1, reduceQuality ? 1 : 2]} />
        <meshBasicMaterial color={themeColors.cyan} transparent opacity={0.34} />
        {!reduceQuality && <pointLight intensity={0.75} color={themeColors.cyan} distance={4.5} />}
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
          <torusGeometry args={[radius, 0.008, 8, reduceQuality ? 40 : 56]} />
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

function DataPanels({ reduceQuality }: { reduceQuality: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    if (reduceQuality) return;
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

function CinematicParticles({ reduceQuality = false }: { reduceQuality?: boolean }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const actualCount = reduceQuality ? 20 : 54;
  
  const particles = useMemo(() => {
    const random = createSeededRandom(124);
    const temp = [];
    for (let i = 0; i < actualCount; i++) {
      const t = random() * 100;
      const factor = 6 + random() * 20;
      const speed = 0.0018 + random() / 900;
      const xFactor = -18 + random() * 36;
      const yFactor = -14 + random() * 28;
      const zFactor = -18 + random() * 36;
      const colors = [themeColors.white, themeColors.cyan, themeColors.indigo, themeColors.violet];
      const color = colors[Math.floor(random() * colors.length)];
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, color });
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

      const pointerX = reduceQuality ? 0 : state.pointer.x * viewport.width * 0.08;
      const pointerY = reduceQuality ? 0 : state.pointer.y * viewport.height * 0.08;

      dummy.position.set(
        pointerX + a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t) * factor) / 14,
        pointerY + b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 14,
        b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 14
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
      <sphereGeometry args={[0.035, 8, 8]}>
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

function LightingSetup({ reduceQuality }: { reduceQuality: boolean }) {
  return (
    <>
      <ambientLight intensity={reduceQuality ? 0.58 : 0.42} />
      <directionalLight position={[8, 12, 8]} intensity={reduceQuality ? 1.15 : 1.45} color={themeColors.white} />
      <directionalLight position={[-7, -4, 6]} intensity={0.55} color={themeColors.violet} />
      {!reduceQuality && <pointLight position={[4.5, 2.5, 5]} intensity={0.8} color={themeColors.cyan} distance={10} />}
    </>
  );
}

function HeroRig({ reduceQuality }: { reduceQuality: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer, viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const desktopOffset = viewport.width > 9 ? 3.25 : 0.7;

    const pointerScale = reduceQuality ? 0 : 1;
    groupRef.current.position.x += (desktopOffset + pointer.x * 0.1 * pointerScale - groupRef.current.position.x) * 0.035;
    groupRef.current.position.y += (pointer.y * 0.08 * pointerScale - groupRef.current.position.y) * 0.035;
    groupRef.current.rotation.y += (pointer.x * 0.045 * pointerScale - groupRef.current.rotation.y) * 0.035;
    groupRef.current.rotation.x += (pointer.y * -0.035 * pointerScale - groupRef.current.rotation.x) * 0.035;
    groupRef.current.position.z = Math.sin(t * 0.28) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <OrbitRings reduceQuality={reduceQuality} />
      <PremiumCore reduceQuality={reduceQuality} />
      <DataPanels reduceQuality={reduceQuality} />
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
    <div className="hero-3d-scene absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 36 }}
        frameloop="always"
        performance={{ min: 0.35 }}
        dpr={reduceQuality ? [0.8, 1] : [1, 1.35]}
        gl={{ alpha: true, antialias: !reduceQuality, powerPreference: "high-performance" }}
      >
        <color attach="background" args={[themeColors.background]} />
        <LightingSetup reduceQuality={reduceQuality} />
        
        <HeroRig reduceQuality={reduceQuality} />
        
        <CinematicParticles reduceQuality={reduceQuality} />
        
        <Stars radius={42} depth={30} count={reduceQuality ? 200 : 500} factor={reduceQuality ? 2.4 : 2.2} saturation={0.45} fade speed={reduceQuality ? 0.08 : 0.18} />
        
        {!reduceQuality && (
          <EffectComposer multisampling={0}>
            <Bloom
              luminanceThreshold={0.55}
              mipmapBlur
              luminanceSmoothing={0.28}
              intensity={0.32}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
