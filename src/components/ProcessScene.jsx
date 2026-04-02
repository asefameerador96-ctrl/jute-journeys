import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Box, Torus, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/* Individual stage meshes */

function SeedMesh() {
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <Sphere args={[0.72, 64, 64]}>
        <MeshDistortMaterial
          color="#C9A84C"
          metalness={0.7}
          roughness={0.2}
          distort={0.25}
          speed={2}
          emissive="#3a2400"
          emissiveIntensity={0.3}
        />
      </Sphere>
      <Sphere args={[0.82, 20, 20]}>
        <meshBasicMaterial color="#C9A84C" wireframe transparent opacity={0.06} />
      </Sphere>
    </Float>
  );
}

function PlantMesh() {
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        <Cylinder args={[0.09, 0.16, 2.8, 16]}>
          <meshPhysicalMaterial color="#2A5020" metalness={0.1} roughness={0.55} emissive="#0d2008" emissiveIntensity={0.3} />
        </Cylinder>
        {[[-0.55, 0.6, 0, -0.45], [0.55, 0.1, 0, 0.45], [-0.45, -0.4, 0, 0.3]].map(([x, y, z, rz], i) => (
          <mesh key={i} position={[x, y, z]} rotation={[0, 0, rz]}>
            <sphereGeometry args={[0.48, 24, 12]} />
            <meshPhysicalMaterial color="#3D7033" metalness={0.05} roughness={0.6} emissive="#0d2008" emissiveIntensity={0.2} />
            <mesh scale={[0.5, 1, 0.22]}>
              <sphereGeometry args={[0.48, 24, 12]} />
              <meshPhysicalMaterial color="#4A7C3F" metalness={0} roughness={0.7} />
            </mesh>
          </mesh>
        ))}
        <Sphere args={[0.24, 24, 24]} position={[0, 1.5, 0]}>
          <meshPhysicalMaterial color="#2A5020" roughness={0.5} metalness={0.1} />
        </Sphere>
      </group>
    </Float>
  );
}

function CuringMesh() {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    if (groupRef.current) groupRef.current.rotation.y = clock.elapsedTime * 0.4;
  });
  return (
    <Float speed={1.5} floatIntensity={0.4}>
      <group ref={groupRef}>
        <Sphere args={[1.15, 48, 48]}>
          <meshPhysicalMaterial
            color="#88cccc" metalness={0} roughness={0.05}
            transmission={0.92} transparent opacity={0.75} ior={1.4}
          />
        </Sphere>
        {Array.from({ length: 9 }).map((_, i) => (
          <mesh key={i}
            position={[
              (Math.sin(i * 0.7) * 0.9),
              (Math.cos(i * 1.1) * 0.6),
              (Math.sin(i * 1.5) * 0.4)
            ]}
            rotation={[i * 0.4, i * 0.6, i * 0.3]}
          >
            <cylinderGeometry args={[0.04, 0.04, 1.6, 6]} />
            <meshPhysicalMaterial color="#C9A84C" metalness={0.6} roughness={0.3} emissive="#3a2400" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function BuyingMesh() {
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.5}>
      <group>
        {Array.from({ length: 14 }).map((_, i) => (
          <mesh key={i}
            position={[(Math.sin(i * 0.45) * 0.5), 0, (Math.cos(i * 0.45) * 0.28)]}
            rotation={[0, 0, (Math.random() - 0.5) * 0.3]}
          >
            <cylinderGeometry args={[0.035, 0.035, 3.2, 6]} />
            <meshPhysicalMaterial color="#C9A84C" metalness={0.55} roughness={0.35} emissive="#3a2400" emissiveIntensity={0.25} />
          </mesh>
        ))}
        <Torus args={[0.55, 0.09, 14, 36]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0]}>
          <meshPhysicalMaterial color="#8B6914" metalness={0.7} roughness={0.3} emissive="#1a0e00" emissiveIntensity={0.3} />
        </Torus>
        <Torus args={[0.55, 0.09, 14, 36]} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
          <meshPhysicalMaterial color="#8B6914" metalness={0.7} roughness={0.3} emissive="#1a0e00" emissiveIntensity={0.3} />
        </Torus>
      </group>
    </Float>
  );
}

function ManufacturingMesh() {
  const spoolRef = useRef();
  useFrame(({ clock }) => {
    if (spoolRef.current) spoolRef.current.rotation.z = clock.elapsedTime * 0.8;
  });
  return (
    <Float speed={1.4} floatIntensity={0.35}>
      <group ref={spoolRef}>
        <Cylinder args={[0.9, 0.9, 0.55, 36]}>
          <meshPhysicalMaterial color="#C9A84C" metalness={0.75} roughness={0.2} emissive="#3a2400" emissiveIntensity={0.2} />
        </Cylinder>
        <Cylinder args={[0.28, 0.28, 0.85, 20]}>
          <meshPhysicalMaterial color="#1C3A16" metalness={0.15} roughness={0.6} />
        </Cylinder>
        {[0.35, 0.55, 0.75].map((r, i) => (
          <Torus key={i} args={[r, 0.04, 10, 36]} rotation={[Math.PI / 2, 0, 0]} position={[0, i * 0.1 - 0.1, 0]}>
            <meshPhysicalMaterial color="#E8C96A" metalness={0.8} roughness={0.15} />
          </Torus>
        ))}
      </group>
    </Float>
  );
}

function PackingMesh() {
  return (
    <Float speed={1.3} rotationIntensity={0.35} floatIntensity={0.4}>
      <group>
        <Box args={[2.0, 1.3, 1.3]}>
          <meshPhysicalMaterial color="#8B6914" metalness={0.3} roughness={0.65} emissive="#2a1e00" emissiveIntensity={0.2} />
        </Box>
        {[-0.4, 0, 0.4].map((y, i) => (
          <Box key={i} args={[2.05, 0.05, 0.05]} position={[0, y, 0]}>
            <meshPhysicalMaterial color="#C9A84C" metalness={0.8} roughness={0.1} emissive="#3a2400" emissiveIntensity={0.3} />
          </Box>
        ))}
        {[-0.4, 0, 0.4].map((z, i) => (
          <Box key={i} args={[2.05, 0.05, 0.05]} position={[0, 0, z]}>
            <meshPhysicalMaterial color="#C9A84C" metalness={0.8} roughness={0.1} />
          </Box>
        ))}
        <Box args={[0.05, 1.35, 0.05]} position={[0.3, 0, 0.65]}>
          <meshPhysicalMaterial color="#fff" metalness={0.9} roughness={0.05} />
        </Box>
      </group>
    </Float>
  );
}

const STAGE_COMPONENTS = [SeedMesh, PlantMesh, CuringMesh, BuyingMesh, ManufacturingMesh, PackingMesh];

function Particles() {
  const pointsRef = useRef();
  const count = 220;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.04;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.02) * 0.1;
    }
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#C9A84C" size={0.035} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

function Lights() {
  const light1Ref = useRef();
  useFrame(({ clock }) => {
    if (light1Ref.current) light1Ref.current.intensity = 3.5 + Math.sin(clock.elapsedTime * 1.3) * 0.6;
  });
  return (
    <>
      <ambientLight intensity={0.4} color="#ffeedd" />
      <pointLight ref={light1Ref} position={[3, 3, 3]} color="#c9a84c" intensity={3.5} />
      <pointLight position={[-3, -2, 2]} color="#3d7033" intensity={2.5} />
      <directionalLight position={[0, 5, -5]} intensity={0.5} />
    </>
  );
}

function CameraMouseTrack() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 1.4;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * -0.9;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    current.current.x += (mouse.current.x - current.current.x) * 0.06;
    current.current.y += (mouse.current.y - current.current.y) * 0.06;
    camera.position.x = current.current.x * 0.5;
    camera.position.y = current.current.y * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ProcessScene({ activeStage }) {
  const StageComponent = STAGE_COMPONENTS[activeStage] || STAGE_COMPONENTS[0];

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <CameraMouseTrack />
      <Particles />
      <StageComponent key={activeStage} />
    </Canvas>
  );
}
